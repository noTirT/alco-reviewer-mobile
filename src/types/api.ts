export type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
  status_code: number;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  username: string;
};

export type UserProfileResponse = {
  email: string;
  username: string;
  created_at: string;
  follower_count: number;
  following_count: number;
  following: boolean;
};

export type ReviewResponse = {
  review_id: string;
  reviewer_id: string;
  rating: number;
  review_text: string;
  drink: DrinkResponse;
  location: LocationResponse;
  created_at: string;
  updated_at: string;
};

export type CreateReviewRequest = {
  rating: number;
  review_text: string;
  drink_id: string;
  location_id: string;
};

export type CreateLocationRequest = {
  name: string;
  type: string;
  address: string;
  city: string;
  zip_code: string;
};

export type CreateDrinkRequest = {
  name: string;
  alcohol: boolean;
  location_id: string;
};

export type DrinkResponse = {
  id: string;
  name: string;
  alcohol: boolean;
  created_at: string;
  updated_at: string;
};

export type LocationResponse = {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
};

export type FeedRequest = {
  offset: number;
  count: number;
};

export type FeedResponse = {
  review_id: string;
  reviewer_id: string;
  rating: number;
  review_text: string;
  reviewer_name: string;
  created_at: string;
  drink: DrinkResponse;
  location: LocationResponse;
};
