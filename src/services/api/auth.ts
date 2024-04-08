import axiosApi from "./axiosInstance"
import { ApiResponse, TokenResponse } from "@/types/api"

export async function refreshAccessToken(refreshToken: string) {
    try {
        if (!refreshToken) throw new Error("No refresh-token provided")

        const response = await axiosApi.get("/auth/refresh", {
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
            },
        })

        return response.data.access_token
    } catch (error) {
        console.error("Error refreshing token:", error)
    }
}

export async function login(loginName: string, password: string) {
    try {
        const response = await axiosApi.post<ApiResponse<TokenResponse>>("/auth/signin",
            {
                username: loginName,
                password: password,
            },
        )
        const data = response.data

        return data
    } catch (error) {
        console.error("Error logging in:", error)
    }
}

export async function signup(username: string, email: string, password: string) {
    try {
        await axiosApi.post("/auth/signup",
            {
                username,
                email,
                password,
            });
    } catch (error: any) {
        console.error("Error creating new user account:", error)
    }
}
