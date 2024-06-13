import { ApiResponse, ReviewResponse, UserProfileResponse } from '@/types';
import axiosApi from './axiosInstance';

export async function getUserProfile(): Promise<UserProfileResponse | null> {
  try {
    const response =
      await axiosApi.get<ApiResponse<UserProfileResponse>>('/userinfo');

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error retrieving profile: ', error);
  }
}

export async function getUserReviews(): Promise<ReviewResponse[] | null> {
  try {
    const response =
      await axiosApi.get<ApiResponse<ReviewResponse[]>>('/reviews/user');

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error retrieving user reviews: ', error);
  }
}
