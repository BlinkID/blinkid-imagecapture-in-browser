
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

// General UI helpers
const initialMessageEl = document.getElementById("msg");
const progressEl = document.getElementById("load-progress");
const scanImageElement = document.getElementById("target-image");
const inputImageFileFrontSide = document.getElementById("image-file-front-side");
const inputImageFileBackSide = document.getElementById("image-file-back-side");

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
  let licenseKey = "sRwAAAYJbG9jYWxob3N0r/lOPgo/w35CpGGmKO04YrlUtdxXDo5BzgFSgHpva9hMMITa9+yGaYRyTnXVMv/L2YIiYentpORrou0qA2XVOivSMvvle5XgL+gx/QSS7sFpU5B3afH6h/P233xpvy/5Y/1Mp7g9nXQEFJ3kM4+XQ9zo0CJmm0nmDkNp9otY8ewB5I2bjs2RlodXmh8+PRlRAC9nyoQaT4mv4ou/ZNH8braaLK+0eA==";

  if (window.location.hostname === "blinkid.github.io")
  {
    licenseKey = "sRwAAAYRYmxpbmtpZC5naXRodWIuaW+qBF9heYYlTvZbvpaH4IDkSNZnf9Zbe9CH0iD8a+s+YCv7YEen/zVmkqbAHvDqg0yoi+5VTGVicUO+1a0gYNBpk0549/mni5FlkIftVvhfBKuvW54+ilsuQmJdBWNJ5CjupfvTl437HWt0gKoxuXY9Y2fOznUSt2dgi9DZQGr0736FEv9JHBfPwQ9K7cSO7AWIOzVHblPnT/U7cZS5DT/AIVullDT2";
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
    document.getElementById("start-button")?.addEventListener("click", (ev) =>
    {
      ev.preventDefault();
      startScan(sdk);
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

  // 1.1. Enable scan of both sides for BlinkID ImageCapture recognizer
  const settings = await blinkIdImageCaptureRecognizer.currentSettings();

  settings["captureBothDocumentSides"] = true;

  await blinkIdImageCaptureRecognizer.updateSettings(settings);

  // 2. Create a RecognizerRunner object which orchestrates the recognition with one or more
  //    recognizer objects.
  const recognizerRunner = await BlinkIDImageCaptureSDK.createRecognizerRunner(

  // SDK instance to use
  sdk,
  // List of recognizer objects that will be associated with created RecognizerRunner object
  [blinkIdImageCaptureRecognizer],
  // [OPTIONAL] Should recognition pipeline stop as soon as first recognizer in chain finished recognition
  false);


  // 3. Prepare front side image for scan action - keep in mind that SDK can only process images represented
  //    in internal CapturedFrame data structure. Therefore, auxiliary method "captureFrame" is provided.

  // Make sure that image file is provided
  const fileFrontSide = getImageFromInput(inputImageFileFrontSide.files);

  if (!fileFrontSide)
  {
    alert("No image files provided!");
    // Release memory on WebAssembly heap used by the RecognizerRunner
    recognizerRunner?.delete();

    // Release memory on WebAssembly heap used by the recognizer
    blinkIdImageCaptureRecognizer?.delete();
    inputImageFileFrontSide.value = "";
    return;
  }

  const imageFrame = await getImageFrame(fileFrontSide);

  // 4. Start the recognition and await for the results
  const processResultFrontSide = await recognizerRunner.processImage(imageFrame);

  // 5. If recognition of the first side was successful, process the back side
  if (processResultFrontSide !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty)
  {
    // 6. Prepare back side image for scan action
    const fileBackSide = getImageFromInput(inputImageFileBackSide.files);

    if (!fileBackSide)
    {
      alert("No image files provided!");
      // Release memory on WebAssembly heap used by the RecognizerRunner
      recognizerRunner?.delete();

      // Release memory on WebAssembly heap used by the recognizer
      blinkIdImageCaptureRecognizer?.delete();
      inputImageFileBackSide.value = "";
      return;
    }

    const imageFrame = await getImageFrame(fileBackSide);

    // 7. Start the recognition and await for the results
    const processResultBackSide = await recognizerRunner.processImage(imageFrame);

    if (processResultBackSide !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty)
    {
      // 8. If recognition of the back side was successful, obtain the result and display it
      const results = await blinkIdImageCaptureRecognizer.getResult();
      if (results.state !== BlinkIDImageCaptureSDK.RecognizerResultState.Empty)
      {
        console.log("BlinkIDImageCapture results", results);

        if (!results.frontSideCameraFrame || !results.backSideCameraFrame)
        {
          alert("Could not extract images of a document. Please try again.");
        } else

        {
          processingOnWebApi = true;
          console.log("Sending request to web API...");
          getWebApiResults(results.frontSideCameraFrame, results.backSideCameraFrame);
        }
      }
    } else

    {
      alert("Could not extract information from the back side of a document!");
    }
  } else

  {
    alert("Could not extract information from the front side of a document!");
  }

  // 9. Release all resources allocated on the WebAssembly heap and associated with camera stream

  // Release memory on WebAssembly heap used by the RecognizerRunner
  recognizerRunner?.delete();

  // Release memory on WebAssembly heap used by the recognizer
  blinkIdImageCaptureRecognizer?.delete();

  // Hide scanning screen and show scan button again
  inputImageFileFrontSide.value = "";
  inputImageFileBackSide.value = "";

  if (!processingOnWebApi)
  {
    document.getElementById("screen-start")?.classList.remove("hidden");
    document.getElementById("screen-scanning")?.classList.add("hidden");
  }
}

function getImageFromInput(fileList) {
  let image = null;
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < fileList.length; ++i)
  {
    if (imageRegex.exec(fileList[i].type))
    {
      image = fileList[i];
    }
  }
  return image;
}

async function getImageFrame(file) {
  scanImageElement.src = URL.createObjectURL(file);
  await scanImageElement.decode();
  return BlinkIDImageCaptureSDK.captureFrame(scanImageElement);
}

/**
 * Prepare and send image frames to web API for recognition processing.
 *
 * This function is using client library which is provided with the SDK.
 */
function getWebApiResults(frontSide, backSide)
{
  // Create instance of client library - for more information see `client-library/README.md` file
  const client = new Client.Client(Client.ApiType.SelfHosted, { apiLocation: "https://demoapi.microblink.com" });

  // Send image to web API for processing
  const payload =
  {
    // Images from WASM library should be converted to Base64 from ImageData format.
    "imageFrontSide": client.imageDataToBase64(frontSide),
    "imageBackSide": client.imageDataToBase64(backSide) };


  client.recognize("/v1/recognizers/blinkid-combined", payload).
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
