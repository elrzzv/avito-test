import { type Item } from "../types/types";

export async function getMarketPrice(item: Item): Promise<string> {
  try {
    const response = await fetch('/api/market-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get market price');
    }

    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error('Market price error:', error);
    throw error;
  }
}