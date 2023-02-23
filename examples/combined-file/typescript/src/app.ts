/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

/**
 * This example app demonstrates how to use BlinkID ImageCapture In-browser SDK to achieve the following:
 *
 * - Change default SDK settings
 * - Scan front and back side of the identity document with file upload (combined experience)
 * - Send an image to web API for processing
 */
import * as BlinkIDImageCaptureSDK from "@microblink/blinkid-imagecapture-in-browser-sdk";
import { ApiType, Client } from "@microblink/blinkid-imagecapture-in-browser-sdk/client-library";

// General UI helpers
const initialMessageEl = document.getElementById( "msg" ) as HTMLHeadingElement;
const progressEl = document.getElementById( "load-progress" ) as HTMLProgressElement;
const scanImageElement = document.getElementById( "target-image") as HTMLImageElement;
const inputImageFileFrontSide = document.getElementById( "image-file-front-side" ) as HTMLInputElement;
const inputImageFileBackSide = document.getElementById( "image-file-back-side" ) as HTMLInputElement;
let processingOnWebApi = false;

/**
 * Check browser support, customize settings and load WASM SDK.
 */
function main()
{
    // Check if browser has proper support for WebAssembly
    if ( !BlinkIDImageCaptureSDK.isBrowserSupported() )
    {
        initialMessageEl.innerText = "This browser is not supported!";
        return;
    }

    // 1. It's possible to obtain a free trial license key on microblink.com
    const licenseKey = "sRwAAAYJbG9jYWxob3N0r/lOPgo/w35CpGFWKcUTzWfFms+1HtOJBLOa0Z9jQdHUQo1EWP1afmump3DAd/zRkoNODh6Y9FtA1eYVaya36wQmmWpLEliFyV9va44nCIrCRqyoUzeQolAjPINbKGqHklMsfYekNYLDA2i+7zfxUF8Ac3eQ3FiDhrN3d1l+36UjfUfU9e6omHNFxdqysdOxvgVw9bNH8fjbKRmI1CJHbJmb1AWmi2YGwk0=";

    // 2. Create instance of SDK load settings with your license key
    const loadSettings = new BlinkIDImageCaptureSDK.WasmSDKLoadSettings( licenseKey );

    // [OPTIONAL] Change default settings

    // Show or hide hello message in browser console when WASM is successfully loaded
    loadSettings.allowHelloMessage = true;

    // In order to provide better UX, display progress bar while loading the SDK
    loadSettings.loadProgressCallback = ( progress: number ) => progressEl!.value = progress;

    // Set absolute location of the engine, i.e. WASM and support JS files
    loadSettings.engineLocation = window.location.origin;

    // Set absolute location of the worker file
    loadSettings.workerLocation = window.location.origin + "/BlinkIDImageCaptureWasmSDK.worker.min.js";

    // 3. Load SDK
    BlinkIDImageCaptureSDK.loadWasmModule( loadSettings ).then
    (
        ( sdk: BlinkIDImageCaptureSDK.WasmSDK ) =>
        {
            document.getElementById( "screen-initial" )?.classList.add( "hidden" );
            document.getElementById( "screen-start" )?.classList.remove( "hidden" );
            document.getElementById( "start-button" )?.addEventListener( "click", ( ev: any ) =>
            {
                ev.preventDefault();
                startScan( sdk );
            });
        },
        ( error: any ) =>
        {
            initialMessageEl.innerText = "Failed to load SDK!";
            console.error( "Failed to load SDK!", error );
        }
    );
}

/**
 * Scan single side of identity document with web camera.
 */
async function startScan( sdk: BlinkIDImageCaptureSDK.WasmSDK )
{
    processingOnWebApi = false;

    document.getElementById( "screen-start" )?.classList.add( "hidden" );
    document.getElementById( "screen-scanning" )?.classList.remove( "hidden" );

    // 1. Create a recognizer objects which will be used to recognize single image or stream of images.
    //
    // BlinkID ImageCapture Recognizer - recognize a document and extract an image
    const blinkIdImageCaptureRecognizer = await BlinkIDImageCaptureSDK.createBlinkIdImageCaptureRecognizer( sdk );

    // 1.1. Enable scan of both sides for BlinkID ImageCapture recognizer
    const settings = await blinkIdImageCaptureRecognizer.currentSettings();

    settings[ "captureBothDocumentSides" ] = true;

    await blinkIdImageCaptureRecognizer.updateSettings( settings );

    // 2. Create a RecognizerRunner object which orchestrates the recognition with one or more
    //    recognizer objects.
    const recognizerRunner = await BlinkIDImageCaptureSDK.createRecognizerRunner
    (
        // SDK instance to use
        sdk,
        // List of recognizer objects that will be associated with created RecognizerRunner object
        [ blinkIdImageCaptureRecognizer ],
        // [OPTIONAL] Should recognition pipeline stop as soon as first recognizer in chain finished recognition
        false
    );

    // 3. Prepare front side image for scan action - keep in mind that SDK can only process images represented in
    //    internal CapturedFrame data structure. Therefore, auxiliary method "captureFrame" is provided.

    // Make sure that image file is provided
    const fileFrontSide = getImageFromInput( inputImageFileFrontSide.files );

    if ( !fileFrontSide )
    {
        alert( "No image files provided!" );
        // Release memory on WebAssembly heap used by the RecognizerRunner
        recognizerRunner?.delete();

        // Release memory on WebAssembly heap used by the recognizer
        blinkIdImageCaptureRecognizer?.delete();
        inputImageFileFrontSide.value = "";
        return;
    }

    const imageFrame = await getImageFrame( fileFrontSide );

    // 4. Start the recognition and await for the results
    const processResultFrontSide = await recognizerRunner.processImage( imageFrame );

    // 5. If recognition of the first side was successful, process the back side
    if ( processResultFrontSide !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty )
    {
        // 6. Prepare back side image for scan action
        const fileBackSide = getImageFromInput( inputImageFileBackSide.files );

        if ( !fileBackSide )
        {
            alert( "No image files provided!" );
            // Release memory on WebAssembly heap used by the RecognizerRunner
            recognizerRunner?.delete();

            // Release memory on WebAssembly heap used by the recognizer
            blinkIdImageCaptureRecognizer?.delete();
            inputImageFileBackSide.value = "";
            return;
        }

        const imageFrame = await getImageFrame( fileBackSide );

        // 7. Start the recognition and await for the results
        const processResultBackSide = await recognizerRunner.processImage( imageFrame );

        if ( processResultBackSide !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty )
        {
            // 8. If recognition of the back side was successful, obtain the result and display it
            const results = await blinkIdImageCaptureRecognizer.getResult();
            if ( results.state !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty )
            {
                console.log( "BlinkIDImageCapture results", results );

                if ( !results.frontCameraFrame.frame || !results.backCameraFrame.frame )
                {
                    alert( "Could not extract images of a document. Please try again." );
                }
                else
                {
                    processingOnWebApi = true;
                    console.log( "Sending request to web API..." );
                    getWebApiResults( results.frontCameraFrame.frame, results.backCameraFrame.frame );
                }
            }
        }
        else
        {
            alert( "Could not extract information from the back side of a document!" );
        }
    }
    else
    {
        alert( "Could not extract information from the front side of a document!" );
    }

    // 9. Release all resources allocated on the WebAssembly heap and associated with camera stream

    // Release memory on WebAssembly heap used by the RecognizerRunner
    recognizerRunner?.delete();

    // Release memory on WebAssembly heap used by the recognizer
    blinkIdImageCaptureRecognizer?.delete();

    // Hide scanning screen and show scan button again
    inputImageFileFrontSide.value = "";
    inputImageFileBackSide.value = "";

    if ( !processingOnWebApi )
    {
        document.getElementById( "screen-start" )?.classList.remove( "hidden" );
        document.getElementById( "screen-scanning" )?.classList.add( "hidden" );
    }
}

function getImageFromInput( fileList: FileList | null ): File | null {
    if ( fileList === null )
    {
        return null;
    }

    let image = null;
    const imageRegex = RegExp( /^image\// );
    for ( let i = 0; i < fileList.length; ++i )
    {
        if ( imageRegex.exec( fileList[ i ].type ) )
        {
            image = fileList[ i ];
        }
    }
    return image;
}

async function getImageFrame( file: File ): Promise< BlinkIDImageCaptureSDK.CapturedFrame > {
    scanImageElement.src = URL.createObjectURL( file );
    await scanImageElement.decode();
    return BlinkIDImageCaptureSDK.captureFrame( scanImageElement );
}

/**
 * Prepare and send image frames to web API for recognition processing.
 *
 * This function is using client library which is provided with the SDK.
 */
function getWebApiResults( frontSide: ImageData, backSide: ImageData )
{
    // Create instance of client library - for more information see `client-library/README.md` file
    const client = new Client( ApiType.SelfHosted, { apiLocation: "https://demoapi.microblink.com" } );

    // Send image to web API for processing
    const payload =
    {
        // Images from WASM library should be converted to Base64 from ImageData format.
        "imageFrontSide": client.imageDataToBase64( frontSide ),
        "imageBackSide": client.imageDataToBase64( backSide )
    };

    client.recognize( "/v2/recognizers/blinkid-multi-side", payload )
        .then( ( results ) =>
        {
            const recognitionResults = results.response.data.result;
            console.log( "API recognition results", recognitionResults );

            if ( recognitionResults.recognitionStatus === "EMPTY" )
            {
                console.warn( "API processing returned empty results." );
                alert( "API processing returned empty results." );
                return;
            }

            alert
            (
                `Hello, ${ recognitionResults.firstName } ${ recognitionResults.lastName }!\n` +
                `You were born on ${ recognitionResults.dateOfBirth.year }-${ recognitionResults.dateOfBirth.month }-${ recognitionResults.dateOfBirth.day }.`
            );
        } )
        .catch( ( error ) =>
        {
            console.error( "API recognition error", error );
            alert( "Could not process image on backend." );
        } )
        .finally( () =>
        {
            processingOnWebApi = false;
            document.getElementById( "screen-start" )?.classList.remove( "hidden" );
            document.getElementById( "screen-scanning" )?.classList.add( "hidden" );
        } );
}

// Run
main();
