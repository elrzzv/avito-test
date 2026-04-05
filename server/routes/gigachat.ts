//отключает проверку SSL
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { FastifyInstance } from 'fastify';
import fetch from 'node-fetch';

interface TokenResponse {
  access_token: string;
  expires_at: number;
}

let cachedToken: TokenResponse | null = null;

async function getGigaChatToken(): Promise<string> {
  if (cachedToken && cachedToken.expires_at > Date.now() + 5 * 60 * 1000) {
    return cachedToken.access_token;
  }

  const clientId = process.env.GIGACHAT_CLIENT_ID;
  const clientSecret = process.env.GIGACHAT_CLIENT_SECRET;
  const scope = process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS';

  if (!clientId || !clientSecret) {
    throw new Error('GigaChat credentials not configured in .env');
  }

  const auth = clientSecret;

  console.log('Getting token from GigaChat...');
  console.log('Auth header length:', auth.length);

  const response = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Basic ${auth}`,
      'RqUID': crypto.randomUUID(),
    },
    body: new URLSearchParams({
      scope: scope,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Token error:', response.status, errorText);
    throw new Error(`Failed to get token: ${response.status} - ${errorText}`);
  }

  const data = await response.json() as any;
  console.log('Token obtained successfully');
  
  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.access_token;
}

export async function gigachatRoutes(fastify: FastifyInstance) {
  
  // Тестовый эндпоинт для проверки подключения
  fastify.get('/test-gigachat-connection', async () => {
    try {
      const token = await getGigaChatToken();
      return { 
        success: true, 
        message: 'Successfully connected to GigaChat API',
        hasToken: !!token,
        tokenPrefix: token?.substring(0, 20) + '...'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  });

  // Основной эндпоинт для получения цены
  fastify.post('/market-price', async (request, reply) => {
    try {
      const { item } = request.body as { item: any };
      
      if (!item) {
        return reply.status(400).send({ error: 'Item data is required' });
      }

      console.log('\n=== Getting market price for ===');
      console.log('Title:', item.title);
      console.log('Category:', item.category);
      
      const token = await getGigaChatToken();
      console.log('Token obtained');

      // Формируем промпт
      const prompt = `Оцени рыночную стоимость для товара: "${item}". Ответь только числом в рублях, без пояснений.`;

      const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'GigaChat',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 30,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GigaChat API error:', response.status, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as any;
      const rawAnswer = data.choices?.[0]?.message?.content || '';
      console.log('Raw answer:', rawAnswer);
      
      const priceMatch = rawAnswer.match(/\d+/);
      if (priceMatch) {
        const price = priceMatch[0];
        console.log('Extracted price:', price);
        return reply.send({ price });
      }
      
      throw new Error('Could not extract price from response');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      return reply.status(500).send({ error: errorMessage });
    }
  });
}