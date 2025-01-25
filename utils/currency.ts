
const exchangeRates = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.79
};

export const formatCurrency = (amount: number, currency: string) => {
  const converted = amount * exchangeRates[currency as keyof typeof exchangeRates];
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(converted);
};