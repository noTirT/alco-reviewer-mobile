import { login, refreshAccessToken, signup } from "./auth"
import { getUserProfile, getUserReviews } from "./profile"

export const api = {
    login,
    getUserProfile,
    refreshAccessToken,
    signup,
    getUserReviews
}
