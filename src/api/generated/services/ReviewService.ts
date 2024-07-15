/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenericResponse } from '../models/GenericResponse';
import type { reviews_CreateReviewRequest } from '../models/reviews_CreateReviewRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewService {
    /**
     * Create Review
     * Create new review
     * @param review Review details
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static createReview(
        review: reviews_CreateReviewRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/reviews',
            body: review,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Get Reviews Sorted With Offset
     * Get all Reviews made by friends of the current user sorted by time and witha given offset for pagination
     * @param offset Current offset representing the page
     * @param count How many reviews are included in one page
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static getReviewsSortedWithOffset(
        offset: number,
        count: number,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reviews/feed',
            query: {
                'offset': offset,
                'count': count,
            },
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Get Reviews
     * Get all Reviews made by current user
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static getReviews(): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reviews/user',
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
}
