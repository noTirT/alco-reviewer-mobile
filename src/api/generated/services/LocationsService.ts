/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenericResponse } from '../models/GenericResponse';
import type { locations_CreateLocationRequest } from '../models/locations_CreateLocationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationsService {
    /**
     * Get All Locations
     * Get all Locations
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static getAllLocations(): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations',
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Create location
     * Create new location
     * @param locationInfo Location info
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static createLocation(
        locationInfo: locations_CreateLocationRequest,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/locations',
            body: locationInfo,
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
    /**
     * Get Locations by Drink ID
     * Get locations by drink id
     * @param drinkId ID of drink
     * @returns GenericResponse OK
     * @throws ApiError
     */
    public static getLocationsByDrinkId(
        drinkId: string,
    ): CancelablePromise<GenericResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/{drinkId}',
            path: {
                'drinkId': drinkId,
            },
            errors: {
                500: `Server or Database internal error`,
            },
        });
    }
}
