/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

// Import typings for UI component
import "@microblink/blinkid-imagecapture-in-browser-sdk/ui";

// Import typings for custom events
import
{
    EventFatalError,
    EventScanError,
    EventScanSuccess
} from "@microblink/blinkid-imagecapture-in-browser-sdk/ui/dist/types/utils/data-structures";

// Import client library for simple communication with backend services
import { ApiType, Client } from "@microblink/blinkid-imagecapture-in-browser-sdk/client-library";

// [OPTIONAL] Include WASM library if filtering by document type is required
import { Country } from "@microblink/blinkid-imagecapture-in-browser-sdk";

function initializeUiComponent()
{
    const el = document.querySelector( "blinkid-imagecapture-in-browser" ) as HTMLBlinkidImagecaptureInBrowserElement;

    if ( !el )
    {
        throw "Could not find UI component!";
    }

    el.licenseKey = "sRwAAAYJbG9jYWxob3N0r/lOPgo/w35CpGFWLC04YNbW6mKi4G+0hY/TYPcxYsMtciH6IQJEVwB6I94r6RO0MkLQpRKpjcp6GFK8IfGpG+8dkyC4yaZwr7fpo45DcI31+Qrfv7UJAYaw7XSrOe3xRa1R7cUZ++uJAUgGCNvGbRJdpK/aoyDOSedumMwhP3aoShjz3NwVaBiJ212fw3hPEMM=";
    el.engineLocation = window.location.origin;
    el.recognizers = [ "BlinkIdImageCaptureRecognizer" ];

    // Create instance of client library - for more information see `client-library/README.md` file
    const client = new Client(
        ApiType.SelfHosted,
        {
            apiLocation: "https://demoapi.microblink.com"
        }
    );

    /**
     * UI component will extract a document image, which can be recognized on the backend.
     */
    el.addEventListener( "scanSuccess", ( ev: CustomEventInit< EventScanSuccess > ) =>
    {
        console.log( "scanSuccess: extracted image from WASM library", ev.detail );

        /**
         * [OPTIONAL] Filter document based on provided class info.
         *
         * Keep in mind that enums with codes for country, region and document types are
         * included in the WASM library.
         */
        if ( ev.detail!.recognizer.classInfo.country === Country.CROATIA )
        {
            console.log( "What should I do with Croatian document?" );
        }

        // Show error or loading screen in UI component based on extracted image
        if ( !ev.detail!.recognizer.frontSideCameraFrame )
        {
            el.setUiState( "ERROR" );
            return;
        }
        else
        {
            el.setUiState( "LOADING" );
        }

        // Send image to web API for processing
        const payload =
        {
            // Image from WASM library should be converted to Base64 from ImageData format.
            "imageSource": client.imageDataToBase64( ev.detail!.recognizer.frontSideCameraFrame )
        };

        client.recognize( "/v1/recognizers/blinkid", payload )
            .then( ( results ) =>
            {
                const recognitionResults = results.response.data.result;
                console.log( "API recognition results", recognitionResults );

                if ( recognitionResults.recognitionStatus === "EMPTY" )
                {
                    console.warn( "API processing returned empty results." );
                    el.setUiState( "ERROR" );
                    return;
                }

                // Do something with the results and notify the user
                el.setUiState( "SUCCESS" );
            } )
            .catch( ( error ) =>
            {
                console.error( "API recognition error", error );
                el.setUiState( "ERROR" );
            } );
    });

    el.addEventListener( "fatalError", ( ev: CustomEventInit< EventFatalError > ) =>
    {
        const fatalError = ev.detail;
        console.log( "Could not load UI component", fatalError );
    });

    el.addEventListener( "scanError", ( ev: CustomEventInit< EventScanError > ) =>
    {
        const scanError = ev.detail;
        console.log( "Could not scan a document", scanError );
    });
}

window.addEventListener( "DOMContentLoaded", () => initializeUiComponent() );
