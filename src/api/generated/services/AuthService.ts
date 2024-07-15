/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenericResponse } from '../models/GenericResponse';
import type { UserSigninRequest } from '../models/UserSigninRequest';
import type { UserSignupRequest } from '../models/UserSignupRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Refresh token
     * Refresh access token
     * @param authorization Refresh token in format: Bearer <token>
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static refreshToken(
        authorization: string,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/refresh',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Sign in
     * Sign in user
     * @param user User login information
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static signIn(
        user: UserSigninRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signin',
            body: user,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Sign up
     * Sign up new user
     * @param user User creation information
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static signUp(
        user: UserSignupRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: user,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
}
