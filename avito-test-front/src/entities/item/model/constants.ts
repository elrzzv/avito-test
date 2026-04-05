export const ITEM_CATEGORIES = {
  AUTO: 'auto',
  REAL_ESTATE: 'real_estate',
  ELECTRONICS: 'electronics',
} as const;

export const TRANSLATIONS = {
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
  color: 'Цвет',
  phone: 'Телефон',
  laptop: 'Ноутбук',
  misc: 'Разное',
  new: 'Новый',
  used: 'Б/У',
  automatic: 'Автомат',
  manual: 'Механика',
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната'
} as const;

export const ALL_PARAMS_FIELDS = {
  auto: ['brand', 'model', 'yearOfManufacture', 'transmission', 'mileage', 'enginePower'] as const,
  real_estate: ['type', 'address', 'area', 'floor'] as const,
  electronics: ['type', 'brand', 'model', 'condition', 'color'] as const
} as const;

export const DEFAULT_PARAMS_VALUES = {
  auto: {
    brand: '',
    model: '',
    yearOfManufacture: null,
    transmission: undefined,
    mileage: null,
    enginePower: null
  },
  real_estate: {
    type: undefined,
    address: '',
    area: null,
    floor: null
  },
  electronics: {
    type: undefined,
    brand: '',
    model: '',
    condition: undefined,
    color: ''
  }
} as const;