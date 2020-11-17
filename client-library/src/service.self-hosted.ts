import
{
    ApiService,
    HttpResponse,
    RequestPayload
} from "./data-structures";

import * as Util from "./util";

export const SelfHostedMessages =
{
    "API_ROLE_IS_NOT_FOUND":                        "API role is not found",
    "AUTHORIZATION_HEADER_IS_NOT_VALID":            "Authorization header is not valid",
    "BAD_REQUEST":                                  "Bad request",
    "FORBIDDEN_RECOGNIZER":                         "Forbidden recognizer",
    "IMAGE_IS_NOT_ABLE_TO_CONVERT_TO_RAW_PIXELS":   "Image is not able to convert to raw pixels",
    "IMAGE_IS_NOT_VALID":                           "Image is not valid",
    "IMAGE_IS_NOT_VALID_BASE64_STRING":             "Image is not valid base64 string",
    "IMAGE_SIZE_IS_TOO_BIG":                        "Image size is too big",
    "INTERNAL_SERVER_ERROR":                        "Internal server error",
    "INVALID_LICENSE_KEY":                          "Invalid license key",
    "NOT_ALLOWED_TO_EXECUTE_REQUESTED_RECOGNIZER":  "Not allowed to execute requested recognizer",
    "SERVER_CANCELED_REQUEST":                      "Server canceled request",
    "SERVER_TOO_BUSY":                              "Server too busy"
}

const DefaultHeaders =
{
    "Accept": "application/json",
    "Content-Type": "application/json"
}

export class ServiceSelfHosted implements ApiService
{
    private apiLocation         : string;
    private healthcheckEndpoint : string;
    private headers             : { [ key: string ]: string };

    constructor(
        apiLocation         : string,
        healthcheckEndpoint : string,
        headers             : { [ key: string ]: string }
    )
    {
        this.apiLocation         = apiLocation;
        this.healthcheckEndpoint = healthcheckEndpoint;
        this.headers             = Object.assign( DefaultHeaders, headers );

        // HTTP header must contain header field and value
        // @see https://tools.ietf.org/html/rfc7230#section-3.2
        for ( const key in this.headers )
        {
            if ( !key || !this.headers[ key ] )
            {
                delete this.headers[ key ];
            }
        }
    }

    public getHealthcheckResponse(): Promise< HttpResponse >
    {
        const requestUrl = Util.getSafeUrl( this.apiLocation, this.healthcheckEndpoint );
        return Util.httpClient( "GET", requestUrl, this.headers );
    }

    public recognize( endpoint: string, payload: RequestPayload, method = "POST" ): Promise< HttpResponse >
    {
        const requestUrl = Util.getSafeUrl( this.apiLocation, endpoint );
        return Util.httpClient( method, requestUrl, this.headers, payload );
    }
}
