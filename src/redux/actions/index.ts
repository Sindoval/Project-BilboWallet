import { Dispatch, ExpensesTypeForm } from '../../types';
import fetchAllCoins from '../../utils';
// Coloque aqui suas actions
export const SEND_EMAIL = 'SEND_EMAIL';
export const REQUEST_COINS = 'REQUEST_COINS';
export const SEND_EXPENSE = 'SEND_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function sendEmail(email: string) {
  return {
    type: SEND_EMAIL,
    payload: email,
  };
}

export function requestCoins(coins: string[]) {
  return {
    type: REQUEST_COINS,
    payload: coins,
  };
}

export function sendExpense(expense: ExpensesTypeForm) {
  return {
    type: SEND_EXPENSE,
    payload: expense,
  };
}

export function deleteExpense(expenses: ExpensesTypeForm[]) {
  return {
    type: DELETE_EXPENSE,
    payload: expenses,
  };
}

export function fetchCoins() {
  return async (dispatch: Dispatch, _getState: any) => {
    try {
      const data = await fetchAllCoins();
      const dataFilter = Object.keys(data).filter((coin) => coin !== 'USDT');
      dispatch(requestCoins(dataFilter));
    } catch (error) {
      console.log(error);
    }
  };
}
