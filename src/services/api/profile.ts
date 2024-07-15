import { ApiResponse, ReviewResponse, UserProfileResponse } from '@/types';
import axiosApi from './axiosInstance';

export async function getUserProfile(): Promise<UserProfileResponse | null> {
  try {
    const response =
      await axiosApi.get<ApiResponse<UserProfileResponse>>('/user/');

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

export async function getProfileById(
  userId: string,
): Promise<UserProfileResponse | null> {
  try {
    const response = await axiosApi.get<ApiResponse<UserProfileResponse>>(
      `/user/${userId}`,
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error('Error retrieving profile: ', error);
  }
}

export async function followUser(userId: string): Promise<void> {
  try {
    await axiosApi.post<ApiResponse<null>>(`/user/follow/${userId}`);
  } catch (error: any) {
    throw new Error('Error following user: ', error);
  }
}

export async function unfollowUser(userId: string): Promise<void> {
  try {
    await axiosApi.post<ApiResponse<null>>(`/user/unfollow/${userId}`);
  } catch (error: any) {
    throw new Error('Error unfollowing user: ', error);
  }
}
