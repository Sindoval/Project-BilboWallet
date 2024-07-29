import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ReduxState = {
  walletReducer: {
    wallet: '',
  },
  userReducer: {
    user: '',
  },
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
