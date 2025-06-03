import { combineReducers } from 'redux';

import { authSlice } from './auth/auth.slice';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
