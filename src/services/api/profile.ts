import { ApiResponse, ReviewResponse, UserProfileResponse } from "@/types/api"
import axiosApi from "./axiosInstance"

export async function getUserProfile(): Promise<UserProfileResponse | null> {
    try {
        const response = await axiosApi.get<ApiResponse<UserProfileResponse>>("/userinfo/profile")

        return response.data.data
    } catch (error) {
        console.error("Error retrieving profile:", error)
        return null
    }
}

export async function getUserReviews(): Promise<ReviewResponse[] | null> {
    try {
        const response = await axiosApi.get<ApiResponse<ReviewResponse[]>>("/reviews/user")

        return response.data.data
    } catch (error) {
        console.error("Error retrieving user reviews:", error)
        return null
    }
}
