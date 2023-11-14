import storage from 'redux-persist/lib/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types/user.type';
import { RootState } from '@/stores/store';

type UserState = {
  user         : User;
  access_token : string;
  refresh_token: string;
  // org: Org[];
};

const initialState: UserState = {
  user: {
    uid     : undefined,
    username: '',
    name    : '',
    sex     : '',
    email   : '',
  },
  access_token : '',
  refresh_token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth: (state, actions: PayloadAction<User>) => {
      const { payload } = actions;
      state.user        = payload;
      return state;
    },
    setAccessToken: (state, actions: PayloadAction<string>) => {
      const { payload }  = actions;
      state.access_token = payload;
      return state;
    },
    setRefreshToken: (state, actions: PayloadAction<string>) => {
      const { payload }   = actions;
      state.refresh_token = payload;
      return state;
    },
    userLogout: (state) => {
      storage.removeItem('persist:root');
      state = initialState;
      return state;
    },
  },
});

export const getUserAuth                                 = (state: RootState) => state.reducer.user.user;
export const getAccessToken                              = (state: RootState) => state.reducer.user.access_token;
export const getRefreshToken                             = (state: RootState) => state.reducer.user.refresh_token ;
// export const getOrg                                      = (state: RootState) => state.reducer.user.org;
export const { setUserAuth, setAccessToken, userLogout } = userSlice.actions;

export default userSlice.reducer;