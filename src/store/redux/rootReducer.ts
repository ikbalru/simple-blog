import { combineReducers } from 'redux';

import { authSlice } from './auth/auth.slice';
import { searchSlice } from './search/search.slice';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
});

export default rootReducer;
