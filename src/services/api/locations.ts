import { ApiResponse, LocationResponse } from '@/types';
import axiosApi from './axiosInstance';

export async function getAllLocations(): Promise<LocationResponse[] | null> {
  try {
    const response =
      await axiosApi.get<ApiResponse<LocationResponse[]>>('/locations');

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error retrieving locations: ', error);
  }
}
