import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ExchangeRate = {
  code: string;
  name: string;
  ask: string;
  bid: string;
  codein: string;
  create_date: string;
  high: string;
  low: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
};

type ExchangeRates = {
  USD: ExchangeRate;
  CAD: ExchangeRate;
  EUR: ExchangeRate;
  GBP: ExchangeRate;
  ARS: ExchangeRate;
  BTC: ExchangeRate;
  LTC: ExchangeRate;
  JPY: ExchangeRate;
  CHF: ExchangeRate;
  AUD: ExchangeRate;
  CNY: ExchangeRate;
  ILS: ExchangeRate;
  ETH: ExchangeRate;
  XRP: ExchangeRate;
};

export type CurrencyType =
  | 'CAD'
  | 'EUR'
  | 'GBP'
  | 'ARS'
  | 'BTC'
  | 'LTC'
  | 'JPY'
  | 'CHF'
  | 'AUD'
  | 'CNY'
  | 'ILS'
  | 'ETH'
  | 'XRP';

export type ExpensesType = {
  id: number,
  value: string,
  description: string,
  currency: CurrencyType,
  method: string,
  tag: string,
  exchangeRates: ExchangeRates,
};

export type ExpensesTypeForm = {
  id: number,
  value: string,
  description: string,
  currency: string | CurrencyType,
  method: string,
  tag: string,
  exchangeRates: ExchangeRates | any,
};

export type ReduxState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    expenses: ExpensesType[],
  },
};

export type WalletStateType = {
  currencies: CurrencyType[] | [],
  expenses: ExpensesType[] | [],
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
