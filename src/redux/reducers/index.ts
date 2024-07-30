import { combineReducers } from 'redux';
import walletReducer from './wallet';
import userReducer from './user';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ user: userReducer, wallet: walletReducer });

export default rootReducer;
