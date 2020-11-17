import
{
    ApiType,
    Configuration,
    GenericMessages,
    HttpResponse,
    RequestPayload,
    ResponseHealthcheck,
    ResponseRecognition
} from "./data-structures";

import
{
    ServiceCloud,
    CloudMessages
} from "./service.cloud";

import
{
    ServiceSelfHosted,
    SelfHostedMessages
} from "./service.self-hosted";

import
{
    imageDataToBase64
} from "./util";

const _DEFAULT_CLOUD_LOCATION       = "http://localhost";
const _DEFAULT_SELF_HOSTED_LOCATION = "http://localhost";
const _DEFAULT_HEALTHCHECK_ENDPOINT = "/v1/hc";

export class Client
{
    private errorMessages: { [ key: string ]: string };
    private service: ServiceCloud | ServiceSelfHosted;

    /**
     * Create new instance of Client service.
     *
     * This class requires API type and optional configuration object.
     */
    constructor( type: ApiType, configuration?: Configuration )
    {
        if ( !type )
        {
            throw "API type is not provided!";
        }

        const headers             = configuration?.headers || {};
        const healthcheckEndpoint = configuration?.healthcheckEndpoint || _DEFAULT_HEALTHCHECK_ENDPOINT;
        const customApiLocation   = configuration?.apiLocation || "";

        let apiMessages: { [ key: string ]: string } = {};

        switch ( type )
        {
            case ApiType.Cloud:
                apiMessages = CloudMessages;
                this.service = new ServiceCloud(
                    customApiLocation || _DEFAULT_CLOUD_LOCATION,
                    healthcheckEndpoint,
                    headers
                );
                break;

            case ApiType.SelfHosted:
                apiMessages = SelfHostedMessages;
                this.service = new ServiceSelfHosted(
                    customApiLocation || _DEFAULT_SELF_HOSTED_LOCATION,
                    healthcheckEndpoint,
                    headers
                );
                break;

            default:
                throw "Unsupported API type!";
        }

        this.errorMessages = Object.assign(
            GenericMessages,
            apiMessages,
            configuration?.messages || {}
        );
    }

    /**
     * Returns a promise which will resolve to `{ status: true }` if API service
     * is available.
     *
     * In case of error, promise will reject and property `details` with full
     * HTTP response will is added to object.
     *
     * Healthcheck endpoint can be configured with
     * `Configuration.healthcheckEndpoint` property. If omitted, default value
     * is used.
     */
    public getHealthcheck(): Promise< ResponseHealthcheck >
    {
        return new Promise( ( resolve, reject ) =>
        {
            this.service.getHealthcheckResponse()
                .then( ( response: HttpResponse ) =>
                {
                    if ( response.httpStatus === 200 )
                    {
                        resolve( { status: true } );
                        return;
                    }

                    reject( { status: false, response } );
                } )
                .catch( ( response: HttpResponse ) =>
                {
                    reject( { status: false, response } );
                } );
        } );
    }

    /**
     * Extract data from image. First argument is API endpoint, while the second
     * one is body which is sent with the request.
     *
     * This method returns a promise which will always resolve/reject to
     * `ResponseRecognition` object.
     *
     * Promise will resolve only when data has been extracted successfuly, or
     * when no data has been extracted. In every other case promise will reject.
     *
     * For full list of endpoints and related payloads see official
     * documentation for Cloud API or Self-hosted API.
     *
     * @example
     * client.recognize( "/v1/recognizers/blinkid", { "imageSource": imageBase64 } )
     *        .then( ( result: ResponseRecognition ) => console.log( result.response.data.result ) )
     *        .catch( ( error: ResponseRecognition ) => console.log( error.error.message ) );
     */
    public recognize( endpoint: string, payload: RequestPayload ): Promise< ResponseRecognition >
    {
        return new Promise( ( resolve, reject ) =>
        {
            this.service.recognize( endpoint, payload )
                .then( ( response: HttpResponse ) =>
                {
                    if ( response.httpStatus === 200 )
                    {
                        resolve( { status: true, response } );
                        return;
                    }

                    const errorCode = response.data.code || "GENERIC_ERROR";

                    const recognitionResult: ResponseRecognition =
                    {
                        status: false,
                        response: response,
                        error:
                        {
                            code: errorCode,
                            message: this.errorMessages[ errorCode ]
                        }
                    }

                    reject( recognitionResult );
                } )
                .catch( ( response: HttpResponse ) =>
                {
                    let errorCode = "UNKNOWN_ERROR";

                    if ( response.httpStatus === -1 || ( response.httpStatus % 400 < 100 ) )
                    {
                        errorCode = "GENERIC_ERROR";
                    }

                    const recognitionResult: ResponseRecognition =
                    {
                        status: false,
                        response: response,
                        error:
                        {
                            code: errorCode,
                            message: this.errorMessages[ errorCode ]
                        }
                    }

                    reject( recognitionResult );
                } );
        } );
    }

    /**
     * Get Base64 representation of an image based on provided instance of ImageData.
     */
    public imageDataToBase64( imageData: ImageData ): string
    {
        if ( !imageData )
        {
            throw "Image data is not provided!";
        }

        if ( !imageData.width || !imageData.height )
        {
            throw "Image data is malformed!";
        }

        return imageDataToBase64( imageData );
    }
}

export * from "./data-structures";
