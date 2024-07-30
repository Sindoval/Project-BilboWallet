import { REQUEST_COINS, SEND_EXPENSE } from '../actions';
import { WalletStateType } from '../../types';

const INITIAL_STATE: WalletStateType = {
  currencies: [],
  expenses: [],
};

type ActionType = {
  type: string,
  payload: [],
};

const walletReducer = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case REQUEST_COINS:
      return {
        ...state,
        currencies: action.payload,
      };
    case SEND_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
};

export default walletReducer;
