export function formatCategory(category: string) {
  if (category === 'auto') return 'Авто';
  if (category === 'real_estate') return 'Недвижимость';
  if (category === 'electronics') return 'Электроника';
  return category;
}