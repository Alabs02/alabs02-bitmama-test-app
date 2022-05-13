import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';

// TYPES
import { AuthState, AuthUser } from './types';

export const initialState: AuthState = {
  current_user: {} as AuthUser,
  users: [] as Array<AuthUser>,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (
      state: AuthState,
      { payload }: PayloadAction<AuthUser>
    ) => {
      state.current_user = payload;
    },
    setUsers: (
      state: AuthState,
      { payload }: PayloadAction<Array<AuthUser>>
    ) => {
      state.users = payload;
    },

    setActiveState: (
      state: AuthState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.current_user = {...state.current_user, ...{ is_active: payload }};
    },
  }
});

export const updateUsers =
  (payload: Array<AuthUser>): AppThunk =>
  (dispatch) => {
    dispatch(setUsers(payload));
  };

export const updateUserActivity =
  (payload: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setActiveState(payload));
  };

export const updateCurrentUser =
  (payload: AuthUser): AppThunk =>
  (dispatch) => {
    dispatch(setCurrentUser(payload));
  };

const authReducer = authSlice.reducer;
export const { setCurrentUser, setUsers, setActiveState } = authSlice.actions;
export { authReducer as default };
