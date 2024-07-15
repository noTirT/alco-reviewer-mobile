/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenericResponse } from '../models/GenericResponse';
import type { userinfo_FollowRequest } from '../models/userinfo_FollowRequest';
import type { userinfo_UsernameChangeRequest } from '../models/userinfo_UsernameChangeRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserinfoService {
    /**
     * Get User Profile
     * Retrieve the profile of the current user
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static getUserProfile(): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/userinfo',
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Change Username
     * Update the username of current user
     * @param usernameChangeRequest New username info
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static changeUsernamce(
        usernameChangeRequest: userinfo_UsernameChangeRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/userinfo/change-username',
            body: usernameChangeRequest,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Follow User
     * Follow a user
     * @param followRequest Info about user to follow
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static followUser(
        followRequest: userinfo_FollowRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/userinfo/follow',
            body: followRequest,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Unfollow User
     * Unfollow a user
     * @param followRequest Info about user to unfollow
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static unfollowUser(
        followRequest: userinfo_FollowRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/userinfo/unfollow',
            body: followRequest,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
}
