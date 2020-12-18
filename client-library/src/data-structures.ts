/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

export enum ApiType
{
    Cloud       = "cloud",
    SelfHosted  = "self-hosted"
}

export interface Configuration
{
    /**
     * API location.
     *
     * Default value for all API types is "http://localhost".
     *
     * If you're using Cloud API, check official documentation for exact
     * location.
     */
    apiLocation?: string;

    /**
     * Healthcheck endpoint used in `getHealthcheck` method to check if backend
     * is available.
     *
     * This endpoint should return HTTP status 200 if everything is OK.
     *
     * Default value is "/v1/hc".
     */
    healthcheckEndpoint?: string;

    /**
     * Default headers which are added to every request. This is useful for
     * setting global authorization headers.
     *
     * If not set, request will not contain any provisional headers.
     */
    headers?: { [ key: string ]: string };

    /**
     * Override default error messages for specific API type. It's not necessary
     * to provide all error messages, but rather only those which should be
     * modified.
     *
     * Default error messages are located in `src/service.cloud.ts` and
     * `src/service.self-hosted.ts` files.
     *
     * Keep in mind that these messages are merged with generic error messages
     * defined in `src/data-structures.ts` file.
     */
    messages?: { [ key: string ]: string };
}

export const GenericMessages =
{
    "GENERIC_ERROR": "There was an error during scan action.",
    "UNKNOWN_ERROR": "Oops, something went wrong."
}

export interface ResponseError
{
    code    : string;
    message : string;
}

export interface RequestPayload
{}

export interface ResponseRecognition
{
    status  : boolean;
    response: HttpResponse;
    error?  : ResponseError;
}

export interface ResponseHealthcheck
{
    status      : boolean;
    response?   : HttpResponse;
}

export interface HttpResponse
{
    data?       : any;
    headers     : { [ key: string ]: string };
    httpStatus  : number;
}

export interface ApiService
{
    getHealthcheckResponse(): Promise< HttpResponse >;
    recognize(
        endpoint: string,
        payload : RequestPayload,
        method? : string
    ): Promise< HttpResponse >;
}
