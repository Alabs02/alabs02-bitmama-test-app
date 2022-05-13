import { combineReducers } from '@reduxjs/toolkit';

// REDUCERS
import { authReducer } from './slices/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export { rootReducer as default };
