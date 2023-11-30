import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import router from 'next/router';
import dayjs from 'dayjs';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { API_URL, AUTH_REFRESH_TOKEN_PATH } from '@/configs/constant';
import { setAccessToken, setRefreshToken } from '@/stores/slices/auth.slice'
import { store, RootState } from '@/stores/store';

export const http: AxiosInstance = axios.create({
  baseURL        : API_URL,
  withCredentials: true,
  headers        : {
    // 'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token'): null,
    'Content-Type' : 'application/json',
    'accept'       : 'application/json'
  }
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state: RootState = store.getState();
    const accessToken      = state.reducer.user.access_token;
    const refreshToken     = state.reducer.user.refresh_token;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["Refresh-token"] = `${refreshToken}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config

    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const refreshResponse = await http.get(`${API_URL}${AUTH_REFRESH_TOKEN_PATH}`);
        const data            = refreshResponse.data;
        store.dispatch(setAccessToken(data.data.access_token));
        store.dispatch(setRefreshToken(data.data.refresh_token));
        
        return http(originalConfig);
      } catch (error) {    
        
        console.log(error);
        store.dispatch(setAccessToken(''));
        store.dispatch(setRefreshToken(''));
        return Promise.reject(error)
      }
    }
    // else if (err.response.status === 400) {
    //   return err.response
    // }
    return Promise.reject(err);
  }
)