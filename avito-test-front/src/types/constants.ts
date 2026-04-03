export const ITEM_CATEGORIES = {
  AUTO: 'auto',
  REAL_ESTATE: 'real_estate',
  ELECTRONICS: 'electronics',
} as const;

export const PATHS = {
  Ads: '/ads',
  NotFound: '*'
} as const

export const PARAM_NAME = {
  brand: 'Бренд',
  model: 'Модель',
  yearOfManufacture: 'Год производства',
  transmission: 'Тип трансмиссии',
  mileage: 'Пробег',
  enginePower: 'Мощность двигателя',
  type: 'Тип',
  address: 'Адрес',
  area: 'Площадь',  
  floor: 'Этаж',
  condition: 'Состояние',
  color: 'Цвет'
} as const

export const TRANSLATIONS = {
  // для electronics
  phone: 'Телефон',
  laptop: 'Ноутбук', 
  misc: 'Разное',
  new: 'Новый',
  used: 'Б/У',
  
  // для auto
  automatic: 'Автомат',
  manual: 'Механика',
  
  // для real_estate
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната'
} as const;

export const ALL_PARAMS_FIELDS = {
  auto: ['brand', 'model', 'yearOfManufacture', 'transmission', 'mileage', 'enginePower'] as const,
  real_estate: ['type', 'address', 'area', 'floor'] as const,
  electronics: ['type', 'brand', 'model', 'condition', 'color'] as const
} as const;