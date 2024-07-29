// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

type ActionType = {
  type: string,
  payload: string,
};

const userReducer = (state = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        email: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
