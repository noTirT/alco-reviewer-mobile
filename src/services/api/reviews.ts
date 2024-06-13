import { ApiResponse, CreateReviewRequest } from '@/types';
import axiosApi from '../api/axiosInstance';

export async function createReview(review: CreateReviewRequest): Promise<null> {
  try {
    const response = await axiosApi.post<ApiResponse<null>>('/reviews', review);

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error creating review: ', error);
  }
}
