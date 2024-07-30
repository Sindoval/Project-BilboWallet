import { ExchangeRate } from './types';

const fetchAllCoins = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data: ExchangeRate = await response.json();

  return data;
};

export default fetchAllCoins;
