import {
  CONFIRM_EDIT,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  REQUEST_COINS,
  SEND_EXPENSE,
} from '../actions';
import { WalletStateType } from '../../types';

const INITIAL_STATE: WalletStateType = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: '',
  expenseEdit: null,
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
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
      };
    case EDIT_EXPENSE: {
      const expenseEdit = state.expenses.find(({ id }) => id === Number(action.payload));
      const expensesfilter = state.expenses.filter(({ id }) => (
        id !== Number(action.payload)));
      return {
        ...state,
        expenses: expensesfilter,
        editor: true,
        idToEdit: action.payload,
        expenseEdit,
      };
    }
    case CONFIRM_EDIT: {
      const expensesOrder = state.expenses.sort((a, b) => a.id - b.id);
      return {
        ...state,
        expenses: expensesOrder,
        editor: action.payload,
        expenseEdit: null,
        idToEdit: '',
      };
    }
    default:
      return state;
  }
};

export default walletReducer;
