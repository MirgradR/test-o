export const formatPrice = (price: number, currency: string = 'RUB') => {
  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: currency,
  }).replace(/\u00A0/g, ' ');
};

export const calculateDiscount = (price: number, discount: number) => {
  if (discount < 0 || discount > 100) {
    throw new Error('Discount must be between 0 and 100');
  }
  
  return price - (price * discount) / 100;
};
