export const PRODUCT_COLORS = {
  '#6B7280': {
    name: 'Gray',
    bgColor: 'bg-gray-500',
    ringColor: 'ring-gray-500',
  },
  '#000000': {
    name: 'Black',
    bgColor: 'bg-black',
    ringColor: 'ring-black',
  },
  '#1E3A8A': {
    name: 'Purple',
    bgColor: 'bg-blue-900',
    ringColor: 'ring-blue-900',
  },
  '#14B8A6': {
    name: 'Green',
    bgColor: 'bg-teal-500',
    ringColor: 'ring-teal-500',
  },
  '#FFFFFF': {
    name: 'White',
    bgColor: 'bg-white',
    ringColor: 'ring-white',
  },
  '#DC2626': {
    name: 'Red',
    bgColor: 'bg-red-600',
    ringColor: 'ring-red-600',
  },
  '#B45309': {
    name: 'Orange',
    bgColor: 'bg-yellow-700',
    ringColor: 'ring-yellow-700',
  },
  '#1D4ED8': {
    name: 'Blue',
    bgColor: 'bg-blue-700',
    ringColor: 'ring-blue-700',
  },
  '#7DD3FC': {
    name: 'Sky',
    bgColor: 'bg-sky-300',
    ringColor: 'ring-sky-300',
  },
}

export const PRODUCT_QUANTITY_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
]

export const SUBS_FREQUENCIES = [
  {
    value: 'Week',
    label: 'Week',
    title: 'Week',
    description: 'This product will be delivered weekly.',
    current: true,
  },
  {
    value: 'Two Weeks',
    label: 'Two Weeks',
    title: 'Two Weeks',
    description: 'This product will be delivered every two weeks.',
    current: false,
  },
  {
    value: 'Month',
    label: 'Month',
    title: 'Month',
    description: 'This product will be delivered monthly.',
    current: false,
  },
  {
    value: 'Two Months',
    label: 'Two Months',
    title: 'Two Months',
    description: 'This product will be delivered every two months.',
    current: false,
  },
  {
    value: 'Year',
    label: 'Year',
    title: 'Year',
    description: 'This product will be delivered annually.',
    current: false,
  },
]

export const QUANTITY_SUBS_CONFIG = {
  required: {
    value: true,
    message: 'The quantity is required to subscribe.',
  },
  min: {
    value: 10,
    message: 'The minimum quantity to subscribe is 10',
  },
  max: {
    value: 30,
    message: 'The maximum quantity to subscribe is 30',
  },
}
