export function formatCategory(category: 'auto' | 'real_estate' | 'electronics'){
  if (category === 'auto') return 'Авто';
  if (category === 'real_estate') return 'Недвижимость';
  if (category === 'electronics') return 'Электроника';
}