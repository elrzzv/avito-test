import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json());

// кэш для токена
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getGigaChatToken(): Promise<string> {
  // проверяем кэш
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const clientId = process.env.GIGACHAT_CLIENT_ID;
  const clientSecret = process.env.GIGACHAT_CLIENT_SECRET;
  const scope = process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS';

  if (!clientId || !clientSecret) {
    throw new Error('GigaChat credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Basic ${auth}`,
      'RqUID': crypto.randomUUID(),
    },
    body: new URLSearchParams({ scope }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.statusText}`);
  }

  const data = (await response.json()) as any;
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.token;
}

// Интерфейс для тела запроса
interface MarketPriceRequest {
  item: {
    title: string;
    category: string;
    description?: string;
    params?: any;
  };
}

// эндпоинт для получения рыночной цены
app.post('/api/market-price', async (req: Request<{}, {}, MarketPriceRequest>, res: Response) => {
  try {
    const { item } = req.body;
    
    if (!item) {
      return res.status(400).json({ error: 'Item data is required' });
    }

    console.log('Processing item:', item.title);

    // получаем токен
    const token = await getGigaChatToken();
    console.log('Token obtained');

    // формируем промпт
    const prompt = `Оцени рыночную стоимость для товара: ${item}. Ответь только числом в рублях, без пояснений и без пробелов.`;

    // запрос к GigaChat
    const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'GigaChat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GigaChat API error:', response.status, errorText);
      throw new Error(`GigaChat API error: ${response.status}`);
    }

    const data = (await response.json()) as any;
    const rawAnswer = data.choices?.[0]?.message?.content || '';
    console.log('Raw answer:', rawAnswer);
    
    // Извлекаем число
    const priceMatch = rawAnswer.match(/\d+/);
    if (priceMatch) {
      const price = priceMatch[0];
      console.log('Extracted price:', price);
      return res.json({ price });
    }
    
    throw new Error('Could not extract price from response');
  } catch (error) {
    console.error('Market price error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
  }
});

interface ImproveDescriptionRequest {
  item: {
    title: string;
    category: string;
    description?: string;
    params?: any;
  };
}

app.post('/api/improve-description', async (req: Request<{}, {}, ImproveDescriptionRequest>, res: Response) => {
  try {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({ error: 'Item data is required' });
    }

    console.log('Improving description for item:', item.title);

    const token = await getGigaChatToken();
    console.log('Token obtained');

    const hasExistingDescription = item.description && item.description.trim().length > 0;

    let prompt: string;
    if (hasExistingDescription) {
      prompt = `Улучши описание для товара. Товар: "${item.title}". Категория: "${item.category}". Текущее описание: "${item.description}". Вся информация товара: ${item}.Сделай описание более привлекательным, подробным и продающим. Сохрани все ключевые характеристики. Ответь только текстом описания, без пояснений и кавычек.`;
    } else {
      prompt = `Придумай привлекательное описание для товара. Товар: "${item.title}". Категория: "${item.category}". Вся информация товара: ${item}. Напиши подробное, продающее описание, которое подчеркивает преимущества товара. Ответь только текстом описания, без пояснений и кавычек.`;
    }

    const response = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'GigaChat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GigaChat API error:', response.status, errorText);
      throw new Error(`GigaChat API error: ${response.status}`);
    }

    const data = (await response.json()) as any;
    const description = data.choices?.[0]?.message?.content || '';
    console.log('Generated description length:', description.length);

    if (!description) {
      throw new Error('Empty response from GigaChat');
    }

    return res.json({ description });
  } catch (error) {
    console.error('Improve description error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
  }
});

// Добавим тестовый эндпоинт для проверки
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});