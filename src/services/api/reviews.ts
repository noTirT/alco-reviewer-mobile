import {
  ApiResponse,
  CreateReviewRequest,
  FeedRequest,
  FeedResponse,
} from '@/types';
import axiosApi from '../api/axiosInstance';

export async function createReview(review: CreateReviewRequest): Promise<null> {
  try {
    const response = await axiosApi.post<ApiResponse<null>>('/reviews', review);

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error creating review: ', error);
  }
}

export async function getFeed(
  request: FeedRequest,
): Promise<FeedResponse[] | null> {
  try {
    const response = await axiosApi.get<ApiResponse<FeedResponse[]>>(
      '/reviews/feed',
      { params: { ...request } },
    );

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error generating feed: ', error);
  }
}
