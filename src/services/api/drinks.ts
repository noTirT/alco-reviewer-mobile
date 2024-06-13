import { ApiResponse, DrinkResponse } from '@/types';
import axiosApi from './axiosInstance';

export async function getDrinksByLocation(
  locationId: string,
): Promise<DrinkResponse[] | null> {
  try {
    const response = await axiosApi.get<ApiResponse<DrinkResponse[]>>(
      `drinks/${locationId}`,
    );

    return response.data.data;
  } catch (error: any) {
    throw new Error('Error retrieving drinks: ', error);
  }
}
