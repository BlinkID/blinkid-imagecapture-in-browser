# Client library

Client library is a small JS library which simplifies communication with [BlinkID Cloud API](https://microblink.com/products/blinkid/cloud-api) and [BlinkID Self-hosted API](https://microblink.com/products/blinkid/self-hosted-api) backend services.

Even though client library is built with BlinkID ImageCapture In-browser SDK in mind, it can be used separately.

For more information about endpoints, request and response formats of Cloud API and Self-hosted API see official documentation:

* [Cloud API](https://microblink.com/docs/cloudapi/overview.html#introduction)
* [Self-hosted API](https://hub.docker.com/r/microblink/api/)

## Table of contents

* [Installation](#installation)
    * [NPM](#installation-npm)
    * [Standalone (UMD) bundle](#installation-standalone-bundle)
    * [ES module](#installation-es-module)
* [Usage](#usage)
* [Customization](#customization)
    * [Custom endpoint](#custom-endpoint)
    * [Custom headers](#custom-headers)
    * [Custom user-friendly messages](#custom-user-friendly-messages)

## <a name="installation"></a> Installation

Client library is bundled within BlinkID ImageCapture In-browser SDK, but is separated from the rest of the codebase so it can be include on its own.

### <a name="installation-npm"></a> NPM

```sh
# Install NPM package
npm install --save-dev @microblink/blinkid-imagecapture-in-browser-sdk
```

```javascript
// Include Client from JS/TS files
import { Client } from "@microblink/blinkid-imagecapture-in-browser-sdk";
```

### <a name="installation-standalone-bundle"></a> Standalone (UMD) bundle

Since the client library is published on NPM, it's possible to download the library via public CDN services.

However, **we strongly advise** that you host the JavaScript bundle on your infrastructure since there is no guarantee that the public CDN service has satisfactory uptime and availability throughout the world.

```html
<!-- After successful load, global variable `Client` is available. -->
<!-- IMPORTANT: change "X.Y.Z" to the version number you wish to use! -->
<script src="https://unpkg.com/@microblink/blinkid-imagecapture-in-browser-sdk@X.Y.Z/client-library/dist/client-library.min.js"></script>
```

*Keep in mind that Unpkg CDN is used for demonstration, it's not intended to be used in production!*

### <a name="installation-es-module"></a> ES module

The library is also packaged as a classic ES module which can be downloaded via public CDN services.

However, **we strongly advise** that you host the JavaScript bundle on your infrastructure since there is no guarantee that the public CDN service has satisfactory uptime and availability throughout the world.

```js
/* IMPORTANT: change "X.Y.Z" to the version number you wish to use! */
import { Client } from "https://unpkg.com/@microblink/blinkid-imagecapture-in-browser-sdk@X.Y.Z/client-library/es/client-library.mjs";
```

*Keep in mind that Unpkg CDN is used for demonstration, it's not intended to be used in production!*

## <a name="usage"></a> Usage

```typescript
import
{ 
    Client,
    Configuration,
    ApiType,
    ResponseHealthcheck,
    ResponseRecognition
} from "@microblink/blinkid-imagecapture-in-browser-sdk/client-library";

/* Create instance of Client */
const configuration: Configuration =
{
    /* [OPTIONAL] Add authorization header to every request */
    headers:
    {
        "Authorization": "Bearer ..."
    }
}

/* Use 'ApiType.SelfHosted' for Self-hosted solution */
const client = new Client( ApiType.Cloud, configuration );

/* Check API availability */
client.getHealthcheck()
    .then( ( response: ResponseHealthcheck ) => { /* API is available */ } )
    .catch( ( error: ResponseHealthcheck ) => { /* Could not access API */ } );

/* Extract data from image */
const image = "..."; // Base64 representation of image

/* See API documentation for full list of endpoints and body parameters */
client.recognize( "/v1/recognizers/blinkid", { "imageSource": image } )
    .then( ( results: ResponseRecognition ) =>
    {
        const recognitionResults = results.response.data.result;

        /* Handle case when results are empty */
        if ( recognitionResults.recognitionStatus === "EMPTY" )
        {
            /* Inform the user */
        }

        /* Do something with results */
    } )
    .error( ( error: ResponseRecognition ) =>
    {
        /* User friendly message */
        const message = error.error.message;

        /* Do something... */
    } );
```

For complete JavaScript examples for both Cloud API and Self-hosted API see HTML files in the [examples](examples) directory.

## <a name="customization"></a> Customization

All configuration options can be seen in [data-structures.ts](src/data-structures.ts) file.

### <a name="custom-endpoint"></a> Custom endpoint

Since it's a good practice to place an API behind a proxy, configuration supports `apiLocation` property which can be used to define the exact location of an API service.

```typescript
import { Configuration } from "@microblink/blinkid-imagecapture-in-browser-sdk/client-library";

const configuration: Configuration =
{
    apiLocation: "http://example.com"
}
```

### <a name="custom-headers"></a> Custom headers

The client library implements mechanism which includes response headers from every API call. Furthermore, it's possible to add custom headers which are included in every request towards the API.

```typescript
import { Configuration } from "@microblink/blinkid-imagecapture-in-browser-sdk/client-library";

const configuration: Configuration =
{
    // Add all custom headers, where every value is a string
    headers:
    {
        "Authorization": "Bearer ...",
        ...
    }
}
```

### <a name="custom-user-friendly-messages"></a> Custom user-friendly messages

By default, Cloud and Self-hosted API services will return various error messages in different scenarios. Even though it's a good practice to handle those messages in the proxy application between the frontend client and API, this library provides a mechanism to change default messages.

Furthermore, this mechanism could be useful if this library is used in application with multiple interface languages. During the initialization of Client class, messages can be set in accordance with the user interface language.

List of general error messages can be found in [data-strucutres.ts](src/data-structures.ts) file.

List of API specific messages can be found in [service.cloud.ts](src/service.cloud.ts) and [service.self-hosted.ts](src/service.self-hosted.ts) files.

```typescript
import { Configuration } from "@microblink/blinkid-imagecapture-in-browser-sdk/client-library";

const configuration: Configuration =
{
    messages:
    {
        // Overwrite default "GENERIC_ERROR" message
        "GENERIC_ERROR": "Oops, there was an error during processing..."
    }
}
```
