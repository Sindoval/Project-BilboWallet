const INITIAL_STATE = {
  wallet: '',
};

type ActionType = {
  type: string,
  payload: string,
};

const walletReducer = (state = INITIAL_STATE, action: ActionType) => {
};

export default walletReducer;
