/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { drinks_CreateDrinkRequest } from '../models/drinks_CreateDrinkRequest';
import type { GenericResponse } from '../models/GenericResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DrinksService {
    /**
     * Create Drink
     * Create new Drink
     * @param createDrinkRequest Drink info
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static createDrink(
        createDrinkRequest: drinks_CreateDrinkRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/drinks',
            body: createDrinkRequest,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Get Drinks By Location ID
     * Get Drinks by Location ID
     * @param locationId Id of location
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static getDrinksByLocationId(
        locationId: string,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drinks/{locationId}',
            path: {
                'locationId': locationId,
            },
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
}
