
/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

/**
 * BlinkID ImageCapture In-browser SDK demo app which demonstrates how to:
 *
 * - Change default SDK settings
 * - Scan front side of the identity document from image
 * - Provide visual feedback to the end-user during the scan
 * - Send an image to web API for processing
 */

// General UI helpers
const initialMessageEl = document.getElementById("msg");
const progressEl = document.getElementById("load-progress");
const scanImageElement = document.getElementById("target-image");
const inputImageFile = document.getElementById("image-file");

/**
 * Check browser support, customize settings and load WASM SDK.
 */
function main()
{
  // Check if browser has proper support for WebAssembly
  if (!BlinkIDImageCaptureSDK.isBrowserSupported())
  {
    initialMessageEl.innerText = "This browser is not supported!";
    return;
  }

  // 1. It's possible to obtain a free trial license key on microblink.com
  let licenseKey = "sRwAAAYJbG9jYWxob3N0r/lOPgo/w35CpGHWKsMXyV8pLjKmj0+9eFjvfX0TgjpvuedjxBx/LIsuo5sKOHD+5Uwjw1z4y10qbq/lEwUJiXzdSnihwZqLno0gfabRPsF/o2SyH7C5al21APZBfvwXx6PMvxe6Ze7SIGu0wach/76eKVlLKbVp2vxI7tVa42cnIQcM0YyD1UqcCI/9fomjgILTvNJHoMjAvy+ptZRw";

  if (window.location.hostname === "blinkid.github.io")
  {
    licenseKey = "sRwAAAYRYmxpbmtpZC5naXRodWIuaW+qBF9heYYlTvZbvuaFzq9PiS0vf1fYGV2YWYAaY6T5nF3SCiK3YFXRSTUguSJHTO+XKjmupSk49GH7QJN+8lo1XwCtV6TBri+4hGPCHUb3Ac4SoEQqCtcEnZGadseNI4PqoJe+a5A5CcSWbo1IwrS6qX8jfLX44wlfLzc3l6rMFGlLvA8AZkkGbXag0K+DGxAJVXIg+NQ7Y2Ck2OUHv2g=";
  }

  // 2. Create instance of SDK load settings with your license key
  const loadSettings = new BlinkIDImageCaptureSDK.WasmSDKLoadSettings(licenseKey);

  // [OPTIONAL] Change default settings

  // Show or hide hello message in browser console when WASM is successfully loaded
  loadSettings.allowHelloMessage = true;

  // In order to provide better UX, display progress bar while loading the SDK
  loadSettings.loadProgressCallback = (progress) => progressEl.value = progress;

  // Set absolute location of the engine, i.e. WASM and support JS files
  loadSettings.engineLocation = "https://blinkid.github.io/blinkid-imagecapture-in-browser/resources";

  // Set absolute location of the worker file
  loadSettings.workerLocation = "https://blinkid.github.io/blinkid-imagecapture-in-browser/resources/BlinkIDImageCaptureWasmSDK.worker.min.js";

  // 3. Load SDK
  BlinkIDImageCaptureSDK.loadWasmModule(loadSettings).then(

  (sdk) =>
  {
    document.getElementById("screen-initial")?.classList.add("hidden");
    document.getElementById("screen-start")?.classList.remove("hidden");
    document.getElementById("image-file")?.addEventListener("change", (ev) =>
    {
      ev.preventDefault();
      startScan(sdk, ev.target.files);
    });
  },
  (error) =>
  {
    initialMessageEl.innerText = "Failed to load SDK!";
    console.error("Failed to load SDK!", error);
  });

}

/**
 * Scan single side of identity document with web camera.
 */
async function startScan(sdk, fileList)
{
  processingOnWebApi = false;

  document.getElementById("screen-start")?.classList.add("hidden");
  document.getElementById("screen-scanning")?.classList.remove("hidden");

  // 1. Create a recognizer objects which will be used to recognize single image or stream of images.
  //
  // BlinkID ImageCapture Recognizer - recognize a document and extract an image
  const blinkIdImageCaptureRecognizer = await BlinkIDImageCaptureSDK.createBlinkIdImageCaptureRecognizer(sdk);

  // 2. Create a RecognizerRunner object which orchestrates the recognition with one or more
  //    recognizer objects.
  const recognizerRunner = await BlinkIDImageCaptureSDK.createRecognizerRunner(

  // SDK instance to use
  sdk,
  // List of recognizer objects that will be associated with created RecognizerRunner object
  [blinkIdImageCaptureRecognizer],
  // [OPTIONAL] Should recognition pipeline stop as soon as first recognizer in chain finished recognition
  false);


  // 3. Prepare image for scan action - keep in mind that SDK can only process images represented in
  //    internal CapturedFrame data structure. Therefore, auxiliary method "captureFrame" is provided.

  // Make sure that image file is provided
  let file = null;
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < fileList.length; ++i)
  {
    if (imageRegex.exec(fileList[i].type))
    {
      file = fileList[i];
    }
  }
  if (!file)
  {
    alert("No image files provided!");
    // Release memory on WebAssembly heap used by the RecognizerRunner
    recognizerRunner?.delete();

    // Release memory on WebAssembly heap used by the recognizer
    blinkIdImageCaptureRecognizer?.delete();
    inputImageFile.value = "";
    return;
  }

  scanImageElement.src = URL.createObjectURL(file);
  await scanImageElement.decode();
  const imageFrame = BlinkIDImageCaptureSDK.captureFrame(scanImageElement);

  // 4. Start the recognition and await for the results
  const processResult = await recognizerRunner.processImage(imageFrame);

  // 5. If recognition was successful, obtain the result and display it
  if (processResult !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty)
  {
    const blinkIdImageCaptureResults = await blinkIdImageCaptureRecognizer.getResult();
    if (blinkIdImageCaptureResults.state !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty)
    {
      console.log("BlinkIDImageCapture results", blinkIdImageCaptureResults);

      if (!blinkIdImageCaptureResults.frontCameraFrame.frame)
      {
        alert("Could not extract front image of a document. Please try again.");
      } else

      {
        processingOnWebApi = true;
        console.log("Sending request to web API...");
        getWebApiResults(blinkIdImageCaptureResults.frontCameraFrame.frame);
      }
    }
  } else

  {
    alert("Could not extract information!");
  }

  // 7. Release all resources allocated on the WebAssembly heap and associated with camera stream

  // Release memory on WebAssembly heap used by the RecognizerRunner
  recognizerRunner?.delete();

  // Release memory on WebAssembly heap used by the recognizer
  blinkIdImageCaptureRecognizer?.delete();

  // Hide scanning screen and show scan button again
  inputImageFile.value = "";

  if (!processingOnWebApi)
  {
    document.getElementById("screen-start")?.classList.remove("hidden");
    document.getElementById("screen-scanning")?.classList.add("hidden");
  }
}

/**
 * Prepare and send image frames to web API for recognition processing.
 *
 * This function is using client library which is provided with the SDK.
 */
function getWebApiResults(frontSide)
{
  // Create instance of client library - for more information see `client-library/README.md` file
  const client = new Client.Client(Client.ApiType.SelfHosted, { apiLocation: "https://demoapi.microblink.com" });

  // Send image to web API for processing
  const payload =
  {
    // Image from WASM library should be converted to Base64 from ImageData format.
    "imageSource": client.imageDataToBase64(frontSide)
  };

  client.recognize("/v2/recognizers/blinkid-single-side", payload).
  then((results) =>
  {
    const recognitionResults = results.response.data.result;
    console.log("API recognition results", recognitionResults);

    if (recognitionResults.recognitionStatus === "EMPTY")
    {
      console.warn("API processing returned empty results.");
      alert("API processing returned empty results.");
      return;
    }

    alert(

    `Hello, ${recognitionResults.firstName} ${recognitionResults.lastName}!\n` +
    `You were born on ${recognitionResults.dateOfBirth.year}-${recognitionResults.dateOfBirth.month}-${recognitionResults.dateOfBirth.day}.`);

  }).
  catch((error) =>
  {
    console.error("API recognition error", error);
    alert("Could not process image on backend.");
  }).
  finally(() =>
  {
    processingOnWebApi = false;
    document.getElementById("screen-start")?.classList.remove("hidden");
    document.getElementById("screen-scanning")?.classList.add("hidden");
  });
}

// Run
main();
