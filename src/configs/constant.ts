import { env } from "process";

export const API_URL            = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const API_MOCKING        = process.env.NEXT_PUBLIC_API_MOCKING === 'true';
export const IS_DEVELOPMENT     = env.nodeEnv === 'development';
export const IS_TEST            = env.nodeEnv === 'test';
export const IS_PRODUCTION      = env.nodeEnv === 'production';
export const IS_BROWSER         = typeof window !== 'undefined';
export const IS_SERVER          = typeof window === 'undefined';
export const DRAWER_WIDTH       = 240;
export const AUTH_REGISTER_PATH      = '/api/auth/register';
export const AUTH_LOGIN_PATH         = '/api/auth/login';
export const AUTH_LOGOUT_PATH        = '/api/auth/logout';
export const AUTH_REFRESH_TOKEN_PATH = '/api/auth/refresh';

export const PERMISSION_CREATE_PATH = '/api/permission';
export const PERMISSION_READ_PATH   = '/api/permission';
export const PERMISSION_UPDATE_PATH = '/api/permission/:permission_uid';
export const PERMISSION_DELETE_PATH = '/api/permission/:permission_uid';