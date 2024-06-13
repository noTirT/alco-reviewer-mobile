import axiosApi from './axiosInstance';
import { ApiResponse, TokenResponse } from '@/types';

export async function refreshAccessToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    if (!refreshToken) throw new Error('No refresh-token provided');

    const response = await axiosApi.get<ApiResponse<TokenResponse>>(
      '/auth/refresh',
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    return response.data.data.access_token;
  } catch (error: any) {
    throw new Error('Error refreshing token: ', error);
  }
}

export async function login(
  loginName: string,
  password: string,
): Promise<TokenResponse | null> {
  try {
    const response = await axiosApi.post<ApiResponse<TokenResponse>>(
      '/auth/signin',
      {
        username: loginName,
        password: password,
      },
    );
    const data = response.data.data;

    return data;
  } catch (error: any) {
    throw new Error('Error logging in: ', error);
  }
}

export async function signup(
  username: string,
  email: string,
  password: string,
): Promise<void> {
  try {
    await axiosApi.post('/auth/signup', {
      username,
      email,
      password,
    });
  } catch (error: any) {
    throw new Error('Error creating new user account: ', error);
  }
}
