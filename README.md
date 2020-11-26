# BlinkID ImageCapture In-browser SDK

[![Build Status](https://travis-ci.org/BlinkID/blinkid-imagecapture-in-browser.svg?branch=master)](https://travis-ci.org/BlinkID/blinkid-imagecapture-in-browser) [![npm version](https://badge.fury.io/js/%40microblink%2Fblinkid-imagecapture-in-browser-sdk.svg)](https://badge.fury.io/js/%40microblink%2Fblinkid-imagecapture-in-browser-sdk)

BlinkID ImageCapture In-browser SDK is a frontend component for [BlinkID Cloud API](https://microblink.com/products/blinkid/cloud-api) and [BlinkID Self-hosted API](https://microblink.com/products/blinkid/self-hosted-api). The purpose of the SDK is to capture high quality image of an identity document inside a web browser, to ensure successful scan when the image is sent to on one of the backend services for processing.

The SDK consists of:

* WASM library that recognizes a document a user is holding and extracts an image of the most suitable frame from the camera feed.
* Web component with a prebuilt and customizable UI, which acts as a wrapper for WASM library to provide a straightforward integration.
* JS client library for a simple communication with backend services.

For more information on how to integrate the BlinkID ImageCapture SDK into your web app read the instructions below. Make sure you read the latest [CHANGELOG.md](CHANGELOG.md) file for most recent changes and improvements.

---

Check out the live examples to see the BlinkID ImageCapture SDK in action:

1. [BlinkID ImageCapture SDK with built-in UI](https://blinkid.github.io/blinkid-imagecapture-in-browser/ui/examples/javascript/index.html)
    * See minimal example for UI component at [Codepen](https://codepen.io/microblink/pen/ZEOVRVQ)
2. [BlinkID ImageCapture SDK UI - scan both document sides](https://blinkid.github.io/blinkid-imagecapture-in-browser/ui/examples/javascript-combined/index.html)
    * See example for scanning of both document sides at [Codepen](https://codepen.io/microblink/pen/pobGzEY)
3. [Scan front side of identity document from web camera](https://blinkid.github.io/blinkid-imagecapture-in-browser/examples/blinkid-camera/javascript/index.html)
    * See example at [Codepen](https://codepen.io/microblink/pen/XWKoYPK)
4. [Scan front side of identity document from image file](https://blinkid.github.io/blinkid-imagecapture-in-browser/examples/blinkid-file/javascript/index.html)
    * See example at [Codepen](https://codepen.io/microblink/pen/bGeOKxZ)
5. [Scan both sides of identity document from web camera](https://blinkid.github.io/blinkid-imagecapture-in-browser/examples/combined/javascript/index.html)
    * See example at [Codepen](https://codepen.io/microblink/pen/dyXwKgZ)

Finally, check out the [examples directory](examples) to see the source code of the aforementioned examples. Keep in mind that examples for UI component are located in the [ui/examples](ui/examples) directory.

BlinkID ImageCapture In-browser SDK is meant to be used natively in a web browser. It will not work correctly within a iOS/Android WebView or NodeJS backend service.

## Table of contents

* [Components of SDK](#components-of-sdk)
* [Integration instructions](#integration)
    * [Obtaining a license key](#obtainingalicensekey)
    * [Installation](#installation)
    * [Performing your first scan](#firstScan)
    * [Recognizing still images](#stillImagesRecognition)
    * [Configuration of SDK](#sdkConfiguration)
    * [Deployment guidelines](#deploymentGuidelines)
* [The `Recognizer` concept, `RecognizerRunner` and `VideoRecognizer`](#availableRecognizers)
    * [The `Recognizer` concept](#recognizerConcept)
    * [`RecognizerRunner`](#recognizerRunner)
    * [Performing recognition of video streams using `VideoRecognizer`](#videoRecognizer)
    * [Custom UX with `VideoRecognizer`](#customUXWithVideoRecognizer)
* [Handling processing events with `MetadataCallbacks`](#metadataCallbacks)
* [List of available recognizers](#recognizerList)
    * [BlinkID ImageCapture recognizer](#blinkid-imagecapture-recognizer)
        * [Filter documents by class](#blinkid-imagecapture-recognizer-filter-by-class)
    * [Integration problems](#integrationProblems)
    * [SDK problems](#sdkProblems)
        * [Licensing problems](#licensingProblems)
        * [Other problems](#otherProblems)
* [FAQ and known issues](#faq)
* [Additional info](#info)

## <a name="components-of-sdk"></a> Components of SDK

BlinkID ImageCapture In-browser SDK has two most common usage scenarios:

1. For the simplest form of integration use web component with prebuilt and customizable UI.
    * Check out examples in [`ui/examples`](ui/examples) directory to see complete integration.
        * Examples are using [client library](client-library/README.md) for communication with backend services.
    * Integration instructions for UI component can be found in the [ui/README.md](ui/README.md) file.
2. For an advanced form of integration where UI has to be built from scratch use WASM library.
    * Check out examples in [`examples`](examples) directory to see complete integration.
        * Examples are using [client library](client-library/README.md) for communication with backend services.
    * Integration instructions for WASM library can be found in this file.

In both cases, usage of [client library](client-library/README.md) is recommended to simplify communication with [BlinkID Cloud API](https://microblink.com/products/blinkid/cloud-api) or [BlinkID Self-hosted API](https://microblink.com/products/blinkid/self-hosted-api) backend services. Although, it's possible to use arbitrary code since all components are decoupled.
## <a name="integration"></a> Integration instructions

This repository contains WebAssembly file and support JS files which contains the core implementation of BlinkID ImageCapture functionalities.

In order to make integration of the WebAssembly easier and more developer friendly, a JavaScript/TypeScript support code is also provided, giving an easy to use integration API to the developer.

This repository also contains a sample JS/TS integration app which demonstrates how you can integrate the BlinkID ImageCapture into your web app.

BlinkID ImageCapture requires a browser with a support for [WebAssembly](https://webassembly.org), but works best with latest versions of Firefox, Chrome, Safari and Microsoft Edge. It's worth noting that scan performance depends on the device processing capabilities.

### <a name="obtainingalicensekey"></a> Obtaining a license key

Using BlinkID ImageCapture in your web app requires a valid license key.

You can obtain a free trial license key by registering to [Microblink dashboard](https://microblink.com/login). After registering, you will be able to generate a license key for your web app.

The license key is bound to [fully qualified domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) of your web app, so please make sure you enter the correct name when asked. Also, keep in mind that if you plan to serve your web app from different domains, you will need different license keys.

### <a name="installation"></a> Installation

It's recommended to install the stable version via NPM or Yarn:

```sh
# NPM
npm install @microblink/blinkid-imagecapture-in-browser-sdk

# Yarn
yarn add @microblink/blinkid-imagecapture-in-browser-sdk
```

Which then can be used with a module bundler in Node environment:

```javascript
import * as BlinkIDImageCaptureSDK from "@microblink/blinkid-imagecapture-in-browser-sdk";
```

Source code of `BlinkIDImageCaptureSDK` is written in TypeScript and types are exposed in the public NPM package, so it's possible
to use the SDK in both JavaScript and TypeScript projects.

---

Alternatively, it's possible to use UMD builds, which can be loaded from [the `dist` folder on unpkg](https://unpkg.com/@microblink/blinkid-imagecapture-in-browser-sdk/dist/). The UMD builds make `BlinkIDImageCaptureSDK` available as a `window.BlinkIDImageCaptureSDK` global variable:

```html
<script src="https://unpkg.com/@microblink/blinkid-imagecapture-in-browser-sdk/dist/blinkid-imagecapture-sdk.min.js"></script>
```

Finally, it's possible to use ES builds, which can be downloaded from [the `es` folder on unpkg](https://unpkg.com/@microblink/blinkid-imagecapture-in-browser-sdk/es/). ES modules are used in a similar manner as NPM package:

```javascript
import * as BlinkIDImageCaptureSDK from "./es/blinkid-imagecapture-sdk.js";
```

#### WASM Resources

After adding the BlinkID ImageCapture SDK to your project, make sure to include all files from its `resources` folder in your distribution. Those files contain compiled WebAssembly module and support JS code.

Do not add those files to the main app bundle, but rather place them on a publicly available location so SDK can load them at the appropriate time. For example, place the resources in `my-angular-app/src/assets/` folder if using `ng new`, or place the resources in `my-react-app/public/` folder if using `create-react-app`.

For more information on how to setup aforementioned resources, check out the [Configuration of SDK](#sdkConfiguration) section.

#### Versions and backward compatibility

Even though the API is not going to change between minor versions, structure of results for various recognizers can change between minor versions.

This is due to improvements that are made on recognizers with every minor release.

It's a good practice to always lock on minor version and to check [CHANGELOG.md](CHANGELOG.md) file before upgrading to new minor version.

For example, in `package.json` you should have something like `"@microblink/blinkid-imagecapture-in-browser-sdk": "~4.1.1"` instead of default value `"@microblink/blinkid-imagecapture-in-browser-sdk": "^4.1.1"`.

### <a name="firstScan"></a> Performing your first scan

*Note: following code snippets are written in TypeScript, but it's possible to use them in plain JavaScript.*

1. Make sure to have a valid license key. Information on how to get a license key can be seen in the [Obtaining a license key](#obtainingalicensekey) section.

2. Add SDK to your web app by using one of the options provided in the [Installation](#installation) section.

3. Initialize the SDK using the following code snippet:

    ```typescript
    import * as BlinkIDImageCaptureSDK from "@microblink/blinkid-imagecapture-in-browser-sdk";

    // Check if browser is supported
    if ( BlinkIDImageCaptureSDK.isBrowserSupported() )
    {
        const loadSettings = new BlinkIDImageCaptureSDK.WasmSDKLoadSettings( "your-base64-license-key" );

        BlinkIDImageCaptureSDK.loadWasmModule( loadSettings ).then
        (
            ( wasmSDK: BlinkIDImageCaptureSDK.WasmSDK ) =>
            {
                // The SDK was initialized successfully, save the wasmSDK for future use
            },
            ( error: any ) =>
            {
                // Error happened during the initialization of the SDK
                console.log( "Error during the initialization of the SDK!", error );
            }
        )
    }
    else
    {
        console.log( "This browser is not supported by the SDK!" );
    }
    ```

4. Create recognizer objects that will perform image recognition, configure them and use them to create a `RecognizerRunner` object:

    ```typescript
    import * as BlinkIDImageCaptureSDK from "@microblink/blinkid-imagecapture-in-browser-sdk";

    const recognizer = await BlinkIDImageCaptureSDK.createBlinkIdImageCaptureRecognizer( wasmSDK );
    const recognizerRunner = await BlinkIDImageCaptureSDK.createRecognizerRunner( wasmSDK, [ recognizer ], true );
    ```

5. Obtain a reference to your HTML video element and create a `VideoRecognizer` using the element and your instance of `RecognizerRunner` which then can be used to process input video stream:

    ```typescript
    const cameraFeed = document.getElementById( "myCameraVideoElement" ) as HTMLVideoElement;
    try
    {
        const videoRecognizer = await BlinkIDImageCaptureSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
            cameraFeed,
            recognizerRunner
        );
        const processResult = await videoRecognizer.recognize();
        // To obtain recognition results see next step
    }
    catch ( error )
    {
        if ( error.name === "VideoRecognizerError" )
        {
            // Reason is of type BlinkIDImageCaptureSDK.NotSupportedReason and contains information why video
            // recognizer could not be used. Usually this happens when user didn't give permission
            // to use the camera or when a hardware or OS error occurs.
            const reason = ( error as BlinkIDImageCaptureSDK.VideoRecognizerError ).reason;
        }
    }
    ```

6. If `processResult` returned from `VideoRecognizer's` method `recognize` is not `BlinkIDImageCaptureSDK.RecognizerResultState.Empty`, then at least one recognizer given to the `RecognizerRunner` above contains a recognition result. You can extract the result from each recognizer using its `getResult` method:

    ```typescript
    if ( processResult !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty )
    {
        const recognitionResult = await recognizer.getResult();
        console.log( recognitionResult );
    }
    else
    {
        console.log( "Recognition was not successful!" );
    }
    ```

7. Finally, release the memory on the WebAssembly heap by calling `delete` method on both `RecognizerRunner` and each of your recognizers. Also, release the camera stream by calling `releaseVideoFeed` on instance of `VideoRecognizer`:

    ```typescript
    videoRecognizer.releaseVideoFeed();
    recognizerRunner.delete();
    recognizer.delete();
    ```

    Note that after releasing those objects it is not valid to call any methods on them, as they are literally destroyed. This is required to release memory resources on WebAssembly heap which are not automatically released with JavaScript's garbage collector. Also, note that results returned from `getResult` method are placed on JavaScript's heap and will be cleaned by garbage collector, just like any other normal JavaScript object.

For more information about available recognizers and `RecognizerRunner`, see [RecognizerRunner and available recognizers](#availableRecognizers).

### <a name="stillImagesRecognition"></a> Recognizing still images

If you just want to perform recognition of still images and do not need live camera recognition, you can do that as well.

1. Initialize recognizers and `RecognizerRunner` just as in the [steps 1-4 above](#firstScan).

2. Make sure you have the image set to a `HTMLImageElement`. If you only have the URL of the image that needs recognizing, You can attach it to the image element with following code snippet:

    ```typescript
    const imageElement = document.getElementById( "imageToProcess" ) as HTMLImageElement;
    imageElement.src = URL.createObjectURL( imageURL );
    await imageElement.decode();
    ```

3. Obtain the `CapturedFrame` object using function `captureFrame` and give it to the `processImage` method of the `RecognizerRunner`:

    ```typescript
    const imageFrame = BlinkIDImageCaptureSDK.captureFrame( imageElement );
    const processResult = await recognizerRunner.processImage( imageFrame );
    ```

4. Proceed as in [steps 6-7 above](#firstScan). Note that in there is no `VideoRecognizer` here that needs freeing its resources, but `RecognizerRunner` and recognizers must be deleted using the `delete` method.

### <a name="sdkConfiguration"></a> Configuration of SDK

It's possible to modify default behaviour of the SDK before WASM module is loaded.

Following code snippet shows how to configure the SDK and which non-development options are available:

```typescript
// Create instance of WASM SDK load settings
const loadSettings = new BlinkIDImageCaptureSDK.WasmSDKLoadSettings( "your-base64-license-key" );

/**
 * Write a hello message to the browser console when license check is successfully performed.
 *
 * Hello message will contain the name and version of the SDK, which are required information for all support
 * tickets.
 *
 * Default value is true.
 */
loadSettings.allowHelloMessage = true;

/**
 * Absolute location of WASM and related JS/data files. Useful when resource files should be loaded over CDN, or
 * when web frameworks/libraries are used which store resources in specific locations, e.g. inside "assets" folder.
 *
 * Important: if engine is hosted on another origin, CORS must be enabled between two hosts. That is, server where
 * engine is hosted must have 'Access-Control-Allow-Origin' header for the location of the web app.
 *
 * Important: SDK and WASM resources must be from the same version of package.
 *
 * Default value is empty string, i.e. "". In case of empty string, value of "window.location.origin" property is
 * going to be used.
 */
loadSettings.engineLocation = "";

/**
 * Optional callback function that will report the SDK loading progress.
 *
 * This can be useful for displaying progress bar for users on slow connections.
 *
 * Default value is "null".
 *
 * @example
 * loadSettings.loadProgressCallback = (percentage: number) => console.log(`${ percentage }% loaded!`);
 */
loadSettings.loadProgressCallback = null;

// After load settings are configured, proceed with the loading
BlinkIDImageCaptureSDK.loadWasmModule( loadSettings ).then( ... );
```

There are some additonal development options which can be seen in the configuration class [WasmLoadSettings](src/MicroblinkSDK/WasmLoadSettings.ts).

### <a name="deploymentGuidelines"></a> Deployment guidelines

This section contains information on how to deploy a web app which uses BlinkID ImageCapture In-browser SDK.

#### HTTPS

Make sure to serve the web app on HTTPS protocol.

Otherwise, web camera and loading of remote scripts will be blocked by web browser due to security policies.

#### Deployment of WASM files

_Files: resources/BlinkID ImageCaptureWasmSDK.{data,js,wasm}_

##### Server Configuration

When browser loads the `.wasm` file it needs to compile it to the native code. This is unlike JavaScript code, which is interpreted and compiled to native code only if needed ([JIT, a.k.a. Just-in-time compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation)). Therefore, before BlinkID ImageCapture is loaded, the browser must download and compile the provided `.wasm` file.

In order to make this faster, you should configure your web server to serve `.wasm` files with `Content-Type: application/wasm`. This will instruct the browser that this is a WebAssembly file, which most modern browsers will utilize to perform streaming compilation, i.e. they will start compiling the WebAssembly code as soon as first bytes arrive from the server, instead of waiting for the entire file to download.

For more information about streaming compilation, check [this article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming).

If your server supports serving compressed files, you should utilize that to minimize the download size of your web app. It's easy to notice that `.wasm` file is not a small file, but it is very compressible. This is also true for all other files that you need to serve for your web app.

For more information about configuring your web server for using compression and for optimal delivery of your web app that uses BlinkID ImageCapture SDK, you should also check the [official Emscripten documentation](https://emscripten.org/docs/compiling/Deploying-Pages.html#optimizing-download-sizes).

##### Location of WASM and related support files

It's possible to host WASM and related support files on a location different than the one where web app is located.

For example, it's possible to host WASM and related support files on `https://cdn.example.com`, while the web app is hosted on `https://example.com`.

In that case it's important to set [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) in response from `https://cdn.example.com`. i.e. set header `Access-Control-Allow-Origin` with proper value.

If WASM engine is not placed in the same folder as web app, don't forget to configure instance of `WasmSDKLoadSettings` with proper location:

```typescript
...
const loadSettings = new BlinkIDImageCaptureSDK.WasmSDKLoadSettings( licenseKey );

loadSettings.engineLocation = "https://cdn.example.com/wasm";
...
```

#### Setting up multiple licenses

Since license key of BlinkID ImageCapture SDK is tied to the domain name, it's required to initialize the SDK with different license keys based on the location of the web app.

A common scenario is to have different license keys for development on the local machine, staging environment and production environment.

There are two most common approaches regarding setup of license key:

1. Multiple apps: build different versions of web app for different environments
2. Single app: build single version of web app which has logic to determine which license key to use

##### Multiple apps

Common approach when working with modern frameworks/libraries.

* [Using environment variables in React](https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5#:~:text=In%20short%3A%20environment%20variables,re%20going%20to%20need%20webpack.)
* [Building and serving Angular apps](https://angular.io/guide/build)
* [Vue.js: Modes and Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)

##### Single app

Simple approach, where handling of license key is done inside the web app.

Here is one possible solution:

```typescript
let licenseKey = "..."; // Place your development license key here

if ( window.location.hostname === "staging.example.com" ) // Place your staging domain here
{
    licenseKey = "..."; // Place your staging license key here
}

if ( window.location.hostname === "example.com" ) // Place your production domain here
{
    licenseKey = "..."; // Place your production license key here
}
...
```

## <a name="availableRecognizers"></a> The `Recognizer` concept, `RecognizerRunner` and `VideoRecognizer`

This section will first describe [what is a `Recognizer`](#recognizerConcept) and how it should be used to perform recognition of the images, videos and camera stream. Next, we will describe what is a [`RecognizerRunner`](#recognizerRunner) and how it can be used to tweak the recognition procedure. Finally, a [`VideoRecognizer`](#videoRecognizer) will be described and how it builds on top of `RecognizerRunner` in order to provide support for recognizing a video or a camera stream.

### <a name="recognizerConcept"></a> The `Recognizer` concept

The `Recognizer` is the basic unit of processing within the BlinkID ImageCapture SDK. Its main purpose is to process the image and extract meaningful information from it. As you will see [later](#recognizerList), the BlinkID ImageCapture SDK has lots of different `Recognizer` objects that have various purposes.

The `Recognizer` is the object on the WebAssembly heap, which means that it will not be automatically cleaned up by the garbage collector once it's not required anymore. Once you are done with using it, you **must** call the `delete` method on it to release the memory on the WebAssembly heap. Failing to do so will result in memory leak on the WebAssembly heap which may result with crash of the browser tab running your web app.

Each `Recognizer` has a `Result` object, which contains the data that was extracted from the image. The `Result` for each specific `Recognizer` can be obtained by calling its `getResult` method, which will return a `Result` object placed on the JS heap, i.e. managed by the garbage collector. Therefore, you don't need to call any delete-like methods on the `Result` object.

Every `Recognizer` is a stateful object that can be in two possible states: _idle state_ and _working state_.

While in _idle state_, you are allowed to call method `updateSettings` which will update its properties according to given settings object. At any time, you can call its `currentSettings` method to obtain its currently applied settings object.

After you create a `RecognizerRunner` with array containing your recognizer, the state of the `Recognizer` will change to _working state_, in which `Recognizer` object will be used for processing. While being in _working state_, it is not possible to call method `updateSettings` (calling it will crash your web app). If you need to change configuration of your recognizer while its being used, you need to call its `currentSettings` method to obtain its current configuration, update it as you need it, create a new `Recognizer` of the same type, call `updateSettings` on it with your modified configuration and finally replace the original `Recognizer` within the `RecognizerRunner` by calling its `reconfigureRecognizers` method.

When written as a pseudocode, this would look like:

```typescript
import * as BlinkIDImageCaptureSDK from "@microblink/blinkid-imagecapture-in-browser-sdk";

// Assume myRecognizerInUse is used by the recognizerRunner
const currentSettings = await myRecognizerInUse.currentSettings();

// Modify currentSettings as you need
const newRecognizer = await BlinkIDImageCaptureSDK.createRecognizer(); // use appropriate recognizer creation function
await newRecognizer.updateSettings( currentSettings );

// Reconfigure recognizerRunner
await recognizerRunner.reconfigureRecognizers( [ newRecognizer ], true ); // use `true` or `false` depending of what you want to achieve (see below for the description)

// newRecognizer is now in use and myRecognizerInUse is no longer in use -
// you can delete it if you don't need it anymore
await myRecognizerInUse.delete();
```

While `Recognizer` object works, it changes its internal state and its result. The `Recognizer` object's `Result` always starts in `Empty` state. When corresponding `Recognizer` object performs the recognition of given image, its `Result` can either stay in `Empty` state (in case `Recognizer` failed to perform recognition), move to `Uncertain` state (in case `Recognizer` performed the recognition, but not all mandatory information was extracted) or move to `Valid` state (in case `Recognizer` performed recognition and all mandatory information was successfully extracted from the image).

### <a name="recognizerRunner"></a> `RecognizerRunner`

The `RecognizerRunner` is the object that manages the chain of individual `Recognizer` objects within the recognition process.

It must be created by `createRecognizerRunner` method of the `WasmModuleProxy` interface, which is a member of `WasmSDK` interface which is resolved in a promise returned by the `loadWasmModule` function you've seen [above](#firstScan). The function requires a two parameters: an array of `Recognizer` objects that will be used for processing and a `boolean` indicating whether multiple `Recognizer` objects are allowed to have their `Results` enter the `Valid` state.

To explain further the `boolean` parameter, we first need to understand how `RecognizerRunner` performs image processing.

When the `processImage` method is called, it processes the image with the first `Recognizer` in chain. If the `Recognizer's` `Result` object changes its state to `Valid`, then if the above `boolean` parameter is `false`, the recognition chain will be broken and promise returned by the method will be immediately resolved. If the above parameter is `true`, then the image will also be processed with other `Recognizer` objects in chain, regardless of the state of their `Result` objects. If, after processing the image with the first `Recognizer` in chain, its `Result` object's state is not changed to `Valid`, the `RecognizerRunner` will use the next `Recognizer` object in chain for processing the image and so on - until the end of the chain (if no results become valid or always if above parameter is `true`) or until it finds the recognizer that has successfully processed the image and changed its `Result's` state to `Valid` (if above parameter is `false`).

You cannot change the order of the `Recognizer` objects within the chain - no matter the order in which you give `Recognizer` objects to `RecognizerRunner` (either to its creation function `createRecognizerRunner` or to its `reconfigureRecognizers` method), they are internally ordered in a way that provides best possible performance and accuracy.

Also, in order for BlinkID ImageCapture SDK to be able to order `Recognizer` objects in recognition chain in the best way possible, it is not allowed to have multiple instances of `Recognizer` objects of the same type within the chain. Attempting to do so will crash your application.

### <a name="videoRecognizer"></a> Performing recognition of video streams using `VideoRecognizer`

Using `RecognizerRunner` directly could be difficult in cases when you want to perform recognition of the video or the live camera stream. Additionally, handling camera management from the web browser can be [sometimes challenging](https://stackoverflow.com/questions/59636464/how-to-select-proper-backfacing-camera-in-javascript). In order to make this much easier, we provided a `VideoRecognizer` class.

To perform live camera recognition using the `VideoRecognizer`, you will need an already set up `RecognizerRunner` object and a reference to `HTMLVideoElement` to which camera stream will be attached.

To perform the recognition, you should simply write:

```typescript
const cameraFeed = <HTMLVideoElement> document.getElementById( "cameraFeed" );
try
{
    const videoRecognizer = await BlinkIDImageCaptureSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
        cameraFeed,
        recognizerRunner
    );
    const processResult = await videoRecognizer.recognize();
}
catch ( error )
{
    // Handle camera error
}
```

The `recognize` method of the `VideoRecognizer` will start the video capture and recognition loop from the camera and will return a `Promise` that will be resolved when either `processImage` of the given `RecognizerRunner` returns `Valid` for some frame or the timeout given to `recognize` method is reached (if no timeout is given, a default one is used).

#### Recognizing a video file

If, instead of performing recognition of live video stream, you want to perform recognition of pre-recorded video file, you should simply construct `VideoRecognizer` using a different function, as shown below:

```typescript
const videoRecognizer = await BlinkIDImageCaptureSDK.createVideoRecognizerFromVideoPath(
    videoPath,
    htmlVideoElement,
    recognizerRunner
);
const processResult = await videoRecognizer.recognize();
```

### <a name="customUXWithVideoRecognizer"></a> Custom UX with `VideoRecognizer`

The procedure for using `VideoRecognizer` described [above](#videoRecognizer) is quite simple, but has some limits. For example, you can only perform one shot scan with it. As soon as the promise returned by `recognize` method resolves, the camera feed is paused and you need to start new recognition. However, if you need to perform multiple recognitions in single camera session, without pausing the camera preview, you can use the `startRecognition` method, as described in the example below;

```typescript
videoRecognizer.startRecognition
(
    ( recognitionState: BlinkIDImageCaptureSDK.RecognizerResultState ) =>
    {
        // Pause recognition before performing any async operation - this will make sure that
        // recognition will not continue while returning the control flow back from this function.
        videoRecognizer.pauseRecognition();

        // Obtain recognition results directly from recognizers associated with the RecognizerRunner
        // that is associated with the VideoRecognizer

        if ( shouldContinueScanning )
        {
            // Resume recognition
            videoRecognizer.resumeRecognition( true );
        }
        else
        {
            // Pause the camera feed
            videoRecognizer.pauseVideoFeed();
            // After this line, the VideoRecognizer is in the same state as if promise returned from
            // recognizer was resolved
        }
        // If videoRecognizer is not paused or terminated, after this line the recognition will
        // continue and recognition state will be retained
    }
);
```

## <a name="metadataCallbacks"></a> Handling processing events with `MetadataCallbacks`

Processing events, also known as _Metadata callbacks_ are purely intended for giving processing feedback on UI or to capture some debug information during development of your web app using BlinkID ImageCapture SDK.

Callbacks for all events are bundled into the [MetadataCallbacks](src/MicroblinkSDK/MetadataCallbacks.ts) object. We suggest that you check for more information about available callbacks and events to which you can handle in the [source code of the `MetadataCallbacks` interface](src/MicroblinkSDK/MetadataCallbacks.ts).

You can associate your implementation of `MetadataCallbacks` interface with `RecognizerRunner` either during creation or by invoking its method `setMetadataCallbacks`. Please note that both those methods need to pass information about available callbacks to the native code and for efficiency reasons this is done at the time `setMetadataCallbacks` method is called and **not every time** when change occurs within the `MetadataCallbacks` object. This means that if you, for example, set `onQuadDetection` to `MetadataCallbacks` after you already called `setMetadataCallbacks` method, the `onQuadDetection` will not be registered with the native code and therefore it will not be called.

Similarly, if you, for example, remove the `onQuadDetection` from `MetadataCallbacks` object after you already called `setMetadataCallbacks` method, your app will crash in attempt to invoke non-existing function when our processing code attempts to invoke it. We **deliberately** do not perform null check here because of two reasons:

- It is inefficient
- Having no callback, while still being registered to native code is illegal state of your program and it should therefore crash

**Remember**, each time you make some changes to `MetadataCallbacks` object, you need to apply those changes to to your `RecognizerRunner` by calling its `setMetadataCallbacks` method.

## <a name="recognizerList"></a> List of available recognizers

This section will give a list of all `Recognizer` objects that are available within BlinkID ImageCapture SDK, their purpose and recommendations how they should be used to get best performance and user experience.
### <a name="blinkid-imagecapture-recognizer"></a> BlinkID ImageCapture recognizer

The [`BlinkIdImageCaptureRecognizer`](src/Recognizers/BlinkID/ImageCapture/ImageCaptureRecognizer.ts) is recognizer that recognizes a document a user is holding and extracts an image of the most suitable frame from the camera feed.

Also, this recognizer can process still image for which it will determine document class and if the image is good enough for processing on the backend service.

#### <a name="blinkid-imagecapture-recognizer-filter-by-class"></a> Filter documents by class

One useful object that is returned by `BlinkIdImageCaptureRecognizer` is class info. This object contains information about:

* Document type
* Country
* Region

Values from this object can be compared to enum values in [`ClassInfo.ts`](src/Recognizers/BlinkID/Generic/ClassInfo.ts) file.## <a name="troubleshoot"></a> Troubleshooting

### <a name="integrationProblems"></a> Integration problems

In case of problems with the integration of the SDK, first make sure that you have tried integrating the SDK exactly as described [in integration instructions](#firstScan).

If you have followed the instructions to the letter and you still have the problems, please contact us at [help.microblink.com](https://help.microblink.com)

### <a name="sdkProblems"></a> SDK problems

In case of problems with using the SDK, you should do as follows:

#### <a name="licensingProblems"></a> Licensing problems

If you are getting "invalid license key" error or having other license-related problems (e.g. some feature is not enabled that should be), first check the browser console. All license-related problems are logged to web console so it is easy to determine what went wrong.

When you have to determine what is the license-related problem or you simply do not understand the log, you should contact us at [help.microblink.com](http://help.microblink.com). When contacting us, please make sure you provide following information:

* Exact fully qualified domain name of your app, i.e. where the app is hosted.
* License that is causing problems.
* Please stress out that you are reporting problem related to WebAssembly version of the BlinkID ImageCapture SDK.
* If unsure about the problem, you should also provide excerpt from web console containing the license error.

#### <a name="otherProblems"></a> Other problems

If you are having problems with scanning certain items, undesired behaviour on specific device(s), crashes inside _BlinkID ImageCapture_ SDK or anything unmentioned, please do as follows:

* Contact us at [help.microblink.com](http://help.microblink.com) describing your problem and provide following information:
	* Log from the web console.
	* High resolution scan/photo of the item that you are trying to scan.
	* Information about device and browser that you are using - we need exact version of the browser and operating system it runs on. Also, if it runs on mobile device, we also need the model of the device in question (camera management is specific to browser, OS and device).
	* Please stress out that you are reporting problem related to WebAssembly version of the BlinkID ImageCapture SDK.
## <a name="faq"></a> FAQ and known issues

* **After switching from trial to production license I get error `This entity is not allowed by currently active license!` when I create a specific `Recognizer` object.**

Each license key contains information about which features are allowed to use and which are not. This error indicates that your production license does not allow using of specific `Recognizer` object. You should contact [support](http://help.microblink.com) to check if provided license is OK and that it really contains all features that you have purchased.

* **Document is scanned successfully when using camera feed, but fails when still iamge of recognized with `processImage` method.**

The reason for this is the way the SDK operates. When scanning from an image file, all data must be extracted from a single frame. Which is not always possible due to limited computing power. On the other hand, when an image is scanned with the camera, multiple frames are processed, so all relevant data can be extracted in a couple of iterations.

**This problem is going to be fixed in future versions.** Watch this repository to get notified when new versions are released, and check [CHANGELOG.md](CHANGELOG.md) file to see a list of improvements.
## <a name="info"></a> Additional info

Complete source code of the TypeScript wrapper can be found in [here](src).

For any other questions, feel free to contact us at [help.microblink.com](http://help.microblink.com).
