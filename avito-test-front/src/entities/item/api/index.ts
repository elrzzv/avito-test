import { type Item, type TItemsListResponseItem, type ItemSortColumn, type SortDirection } from '../model';

export async function getItems(options?: {
  q?: string;
  limit?: number;
  skip?: number;
  categories?: string[];
  needsRevision?: boolean;
  sortColumn?: ItemSortColumn;
  sortDirection?: SortDirection;
}): Promise<{ items: TItemsListResponseItem[]; total: number }> {
  const params = new URLSearchParams();
  
  if (options?.q) params.set('q', options.q);
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.skip) params.set('skip', String(options.skip));
  if (options?.categories?.length) params.set('categories', options.categories.join(','));
  if (options?.needsRevision) params.set('needsRevision', 'true');
  if (options?.sortColumn) params.set('sortColumn', options.sortColumn);
  if (options?.sortDirection) params.set('sortDirection', options.sortDirection);

  const response = await fetch(`/items?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  return response.json();
}

export async function getItem(id: number): Promise<Item & { needsRevision: boolean }> {
  const response = await fetch(`/items/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }

  return response.json();
}

export async function updateItem(id: number, data: Partial<Item>): Promise<{ success: boolean }> {
  const response = await fetch(`/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update item');
  }

  return response.json();
}