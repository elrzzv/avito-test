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

export async function improveDescription(
  item: Item,
  currentDescription?: string
): Promise<string> {
  try {
    const response = await fetch('/api/improve-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: {
          title: item.title,
          category: item.category,
          description: currentDescription || '',
          params: item.params,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to improve description');
    }

    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error('Improve description error:', error);
    throw error;
  }
}