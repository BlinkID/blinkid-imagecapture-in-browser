# Release notes

## 5.20.0

### New feature:

* ML models with new architecture that result in further 8% decrease in error rate

### Support for 8 new document types:

#### Northern America

* USA - Polycarbonate Passport 
* USA - Nebraska - ID Card
* USA - New York - ID Card
* USA - Utah - ID Card

#### Latin America and the Caribbean

* Mexico - Polycarbonate Passport
* Brazil - Sao Paolo - ID Card

#### Europe 

* Austria - Residence Permit

#### Asia

* Philippines - ID Card

### Back side support added:

* Australia - South Australia - Driving license

### Added support for 29 new versions of already supported documents:

* Australia - Northern Territory - Proof of Age Card
* Belgium - Minors ID Card
* Belgium - Residence Permit
* Bolivia - ID Card
* Croatia - Residence Permit
* Cyprus - ID Card
* Czechia - ID card
* Czechia - Residence Permit
* Dominican Republic - Paper Passport
* Greece - Residence Permit
* Italy - Residence Permit
* Ivory Coast - Driving license
* Kuwait - Driving license
* Mexico - Jalisco - Driving license
* Mexico - Nuevo Leon - Driving license
* Peru - ID Card
* Poland - Driving license
* Slovenia - ID Card
* Sweden - ID Card
* Sweden - Polycarbonate Passport
* USA - Georgia - ID Card 
* USA - Iowa - ID Card
* USA - Kansas - Driving license
* USA - Maryland - ID Card
* USA - Nebraska - ID Card
* USA - New York - Driving license
* USA - New York - ID Card
* USA - Oklahoma - Driving license
* Vietnam - ID Card

### These documents are no longer BETA:

* Finland - Residence Permit
* Guatemala - Driving license

### Added support for 2 new ID types in BETA:

* Antigua and Barbuda - Driving license
* Mexico - Professional ID Card

### Changes to BlinkID(Combined) Recognizer

* ClassInfo:
	* Added to JSON serialization:
		* isoNumericCountryCode
		* isoAlpha2CountryCode
		* isoAlpha3CountryCode

* BarcodeData:
	* JSON serialization update: stringData member is now in base64 format

* Added new item to enums:
	* Region: 
		* Sao Paulo, when scanning Brazilian Driving licenses

* Fixed scanning for Argentina ID - there were confusions for Veteran ID, now we enabled successful extraction on Veteran ID as well

### Bugfixes

*  We've fixed a bug with CSS `::part()` pseudo-selector to enable safe CSS customization of nested elements like `mb-camera-toolbar`.
 
### Optimizing camera usage
 
* We are now preventing aborting the scanning process when using the UI component until the camera is not being fully initialized due to potential issues with reusing the camera's resources.

### Environment changes

* We've updated environment to Node v16.3.0.

## 5.18.0

### New feature:

* Updated machine learning models resulting in a 41% reduced error rate.

### Support for 16 new document types:

#### Northern America

* USA - Passport Card
* Usa - District of Columbia - ID Card
* USA - Iowa - ID Card
* USA - Tennessee - ID Card

#### Latin America and the Caribbean

* Cuba - Paper Passport
* Dominican Republic - Paper Passport
* Panama - Residence Permit (front onyl)
* Peru - Paper Passport

#### Europe 

* Cyprus - Paper Passport
* Germany - Minors Passport
* UK - Proof of Age Card (front onyl)
* Ukraine - Residence Permit
* Ukraine - Temporrary Residence Permit

#### Middle East and Africa

* Qatar - Paper Passport
* UAE - Paper Passport

#### Oceania

* Australia - Northern Territory - Proof of Age Card

### Back side support added:

* Austria - ID Card
* Australia - South Australia - Driving license
* Australia - Tasmania - Driving license
* Canada - Quebec - Driving license
* Mexico - Quintana Roo Solidaridad - Driving license
* USA - Washington - Driving license

### Added support for 26 new versions of already supported documents:

* Afghanistan - ID Card
* Bahrain - ID Card
* Hungary - Residence Permit
* India - ID Card
* Mexico - Tabasco - Driving license
* New Zealand - Driving license (front only)
* The Philippines - Professional ID (front only)
* Slovakia - Residence Permit
* South Africa - ID Card
* Switzerland - Residence Permit
* UK - Driving license 
* USA - Colorado - Driving license 
* USA - Idaho - Driving license 
* USA - Kansas - ID Card 
* USA - Kentucky - Driving license 
* USA - Maine - Driving license 
* USA - Massachusetts - ID Card 
* USA - Nebraska - Driving license 
* USA - New Hampshire - Driving license 
* USA - New Jersey - ID Card 
* USA - New Mexico - ID Card 
* USA - North Carolina - ID Card 
* USA - Utah - Driving license 
* USA - Vermont Driving license 
* USA - West Virginia - Driving license 

### These documents are no longer BETA:

* Algeria - Paper Passport
* Slovakia - Residence Permit
* USA - Mississippi - ID Card

### Added support for 8 new ID types in BETA:

* Iceland - Paper Passport
* South Africa - ID Card (front only)
* Brazil - Consular Passport (beta)
* Quintana Roo Cozumel - Driving license 
* Canada - Social Security Card (front only)
* Canada - British Columbia - Minor Public Services Card
* USA - Maine - ID Card
* USA - North Dakota - ID Card

### Changes to BlinkID(Combined) Recognizer

* Added new enums:
    * Region: `QUINTANA_ROO_COZUMEL` 
	* Type: `CONSULAR_PASSPORT`, `MINORS_PASSPORT`, and `MINORS_PUBLIC_SERVICES_CARD` 

### Platform-related SDK changes

* We've added a support for two different WebAssembly build versions.
    * Standard and default build that has all the optimisations, but has considerably larger file size compared to lightweight version. 
    * Lighter version of the WebAssembly bundle that doesn’t have all optimizations for reading of dense barcodes with low quality cameras.

## 5.17.1

* We've fixed a problem that has caused the enormous size of WebAssembly bundles.

## 5.17.0

### Changes to BlinkID ImageCapture Recognizer

* We've fixed issues with scanning Argentina AlienID, where there were confusions with the regular ID. `ClassInfo` now correctly returns which ID type is present based on the barcode data.

### Platform-related SDK changes

* **[BREAKING CHANGE]** Due to security reasons, we've added a mechanism to load worker script from an external location.
    * New property `WasmSDKLoadSettings.workerLocation` was added for this purpose and represents a path to the external worker script file.
    * If omitted, SDK will look for the worker script in the `resources` directory.

### UI Improvements

* We've added property `recognitionPauseTimeout` to the UI component that defines scanning pause after the first side of a document has been scanned.
    * The purpose of this property is to give the end-user enough time to flip the document before scanning is resumed.
    * Default value is `3800` and represents time in milliseconds.
* We've exposed property `cameraExperienceStateDurations` on the UI component that can be used to change the default durations of UI animations.

## 5.16.0

We've added new documents to our list of supported documents:

#### Europe

* Austria - ID Card (front only)
* Germany - ID Card

#### Latin America and the Caribbean

* Brazil - ID Card (beta)
* Colombia - ID Card (front only)
* Ecuador - ID Card

#### Mexico

* Baja California Sur - Driving Licence (beta)
* Ciudad De Mexico - Driving Licence (front only)
* Colima - Driving Licence (front only, beta)
* Michoacan - Driving Licence (beta)
* Nayarit - Driving Licence (beta)
* Quintana Roo Solidaridad - Driving Licence (front only)
* Tlaxcala - Driving Licence
* Veracruz - Driving Licence (beta)

#### Oceania

* Australia - Northern Territory (beta)

#### Asia

* Japan - My Number Card (front only)
* Singapore - Resident ID

#### Northern America

* USA - Missouri - ID Card
* USA - Nevada - Driving Licence
* USA - New York City - ID Card
* USA - Oklahoma - ID Card

#### Back side support added:

* Mexico - Chiapas - Driving License 

#### No longer BETA:

* Mexico - Baja California - Driving Licence
* Mexico - Chihuahua - Driving Licence
* Mexico - Coahuila - Driving Licence
* Mexico - Guanajuato - Driving Licence
* Mexico - Mexico - Driving Licence

## 5.15.1

* We've updated Microblink logo and colors

## 5.15.0

### Changes to BlinkID(Combined) Recognizer

* No API changes
* We've improved document detection and cropping of the document image

### Platform-related SDK changes

* We've added methods for programmatically starting camera and image scan when using the UI component.
    * It's possible to call `startCameraScan()` and `startImageScan(File)` methods on the custom web element.
* We've standardized error structures returned from the WebAssembly library and the UI component.
    * See [SDKError.ts](src/MicroblinkSDK/SDKError.ts) and [ErrorTypes.ts](src/MicroblinkSDK/ErrorTypes.ts) for a complete list of possible error codes.
* We've completed support for `part::` selector and added [an example](ui/README.md#customization-ui-css-part).
* We've simplified integration of the UI component with Angular and React frameworks.
    * [Integration guide for Angular](ui/README.md#installation-angular)
    * [Integration guide for React](ui/README.md#installation-react)

### Bug fixes

* We've ensured that all SDK errors can be visible from `fatalError` and `scanError` events in the UI component.

## 5.14.1

* We've added support for `part::` selector to provide more flexibility when customizing built-in UI. [#35](https://github.com/BlinkID/blinkid-in-browser/issues/35)

### UI bug fixes

* We've fixed a bug where a user couldn't upload an image after the camera scan failed to start.
* We've fixed a bug where the video feed wasn't released in the scenario where the UI component was removed from the DOM.
* We've reverted style changes regarding width and height for camera scanning UI to provide more flexibility to developers.
* We've improved memory management during the initialization of the UI component to avoid the creation of unnecessary web workers.

## 5.14.0

### Improvements

* We've improved the accuracy of barcode scanning on identity documents

### Changes to MRTDRecognizer

* We've added `MRTD_TYPE_BORDER_CROSSING_CARD` type to MRTD enum

### Platform-related SDK changes

* We've added a camera management UI module for the selection of connected cameras
    * We've added `VideoRecognizer.changeCameraDevice` method that can be used to change the active camera device during the scanning session
* We've improved accessibility of the UI component by changing background contrasts and increasing default font sizes

### Bug fixes

* We've optimised memory usage of the SDK by fixing a problem where every refresh of the UI component would result in a new instance of web worker

## 5.13.0

### New additions to our supported document list

We’ve added 61 new documents:

#### Europe

* Austria - Paper Passport 
* Belarus - Paper Passport
* Belgium - Paper Passport (beta)
* Bulgaria - Paper Passport
* Estonia - Paper Passport
* France - Paper Passport (beta)
* Georgia - Paper Passport (beta)
* Germany - Paper Passport 
* Greece - Paper Passport
* Hungary- Paper Passport
* Italy - Paper Passport (beta)
* Kosovo - Paper Passport
* Moldova - Paper Passport (beta)
* Poland - Paper Passport
* Portugal - Paper Passport
* Spain - Paper Passport
* Switzerland - Paper Passport
* UK - Paper Passport

#### Middle East and Africa

* Algeria - Paper Passport (beta)
* Egypt - Paper Passport (beta)
* Eswatini - Paper Passport 
* Ghana - Paper Passport
* Iran - Paper Passport (beta)
* Iraq - Paper Passport (beta)
* Israel - Paper Passport (beta)
* Jordan - Paper Passport (beta)
* Kenya - Polycarbonate Passport
* Libya - Polycarbonate Passport (beta)
* Morocco - Paper Passport (beta)
* Nigeria - Paper Passport
* Nigeria - Polycarbonate Passport (beta)
* Qatar - ID Card (front only, beta)
* Saudi Arabia - Paper Passport
* Syria - Paper Passport
* Tanzania - ID Card (beta)
* Tanzania - Voter ID (front only, beta)
* Tunisia - Paper Passport
* Turkey - Paper Passport
* Zimbabwe - Paper Passport

#### Latin America and the Caribbean

* Argentina - Paper Passport
* Brazil - Paper Passport (beta)
* Guatemala - Paper Passport
* Haiti - Paper Passport
* Honduras - Paper Passport (beta)
* Mexico - Paper Passport (beta)
* Mexico - Nayarit - Driving Licence (beta)

#### Asia

* Bangladesh - Paper Passport
* China - Paper Passport (beta)
* India - Paper Passport
* Indonesia - Paper Passport
* Japan - Paper Passport
* Nepal - Paper Passport
* Pakistan - Paper Passport
* Philippines - Paper Passport
* South Korea - Paper Passport (beta)
* Sri Lanka - Paper Passport
* Uzbekistan - Paper Passport

#### Oceania

* Australia - Paper Passport

#### Northern America

* Canada - Paper Passport
* Canada - Weapon Permit (front only, beta)
* USA - Paper Passport (beta)

#### Back side support added:

* Greece - ID Card
* Burkina Faso - ID Card
* Democratic Republic of the Congo - Driving Licence
* Mexico - Veracruz - Driving Licence
* Canada - Citizenship Certificate

#### No longer BETA:

* Belarus - Driving Licence
* UK - Polycarbonate Passport
* Argentina - Alien ID
* Bahamas - Driving Licence
* Mexico - Durango - Driving Licence
* Venezuela - ID Card
* USA - Kansas - ID Card

### Changes to the BlinkId(Combined)Recognizer:

* We’ve renamed the Swaziland country to Eswatini in results and `ClassInfo` structure
* We are filling out COUNTRY and REGION fields in ClassInfo, without the field TYPE of document, when using BarcodeID mode for scanning documents where the Front side is not supported, and back side results are extracted from AAMVA compliant barcodes
    * This applies only if `ClassInfo` isn’t already prepopulated in some other way and when you’re not in `FullRecognition` mode
* We've added support for including or excluding groups of documents supported by the current license with the `captureModeFilter` setting
    * Scanning of documents with AAMVA compliant barcodes with BarcodeID mode
    * Scanning of all licensed documents in BlinkID FullRecognition mode

### Platform-related SDK changes

* We've fixed a bug where some users were not able to scan passports, even though all document types were allowed by the license key.
* We've improved the performance of the SDK by adding support for WebAssembly SIMD.
    * This increases the scanning performance on compatible browsers up to 77% and up to 94% in cases when WebAssembly threads are also supported.
    * Keep in mind that this feature requires a compatible browser (Chrome 91 and Firefox 90 or newer versions). Only `advanced` and `advanced-threads` binaries are using SIMD. In case that the browser doesn't support this feature, `basic` binary will be used.
* We've reduced the memory fragmentation during video processing, resulting in a smaller memory footprint.
* We've added a mechanism to automatically delete an instance of worker script in case of unsuccessful SDK initialization.
    * New method `WasmSDK.delete()` was added for this purpose and is available on every instance of the SDK.
* We've changed improper error handling in the `VideoRecognizer` class.
    * From now on, it's possible to catch all errors that happen during the video recognition.

## 5.11.3

* We've fixed a broken `client-library` which resulted as empty folder and unusable development bundle

## 5.11.2

* We've exposed a couple of functions that are used by the SDK to determine which WebAssembly bundle to load and from which location
    * Function `detectWasmType()` returns the best possible WebAssembly bundle based on the features a browser supports.
    * Function `wasmFolder( WasmType )` returns the name of the resources subfolder of the provided WebAssembly bundle type.
    * For more information on how to implement these functions, see [`WasmLoadUtils.ts`](src/MicroblinkSDK/WasmLoadUtils.ts) file.

### Bugfixes

* Container width size on UI component for action label (`Scan or choose from gallery`) and action buttons (`Device camera` and `From gallery`) are now responsive on Safari.

## 5.11.1

* We've fixed a broken `rollup.config.js` which resulted in unusable UMD development bundle

## 5.11.0

### Breaking changes

* We've changed the way how recognizer options are set up when using the UI component
    * You can now specify how a recognizer should behave by using the new `recognizerOptions` property.
    * To see the full list of available recognizer options, as well as examples on how to use them, check out the [relevant source code](ui/src/components/blinkid-imagecapture-in-browser/blinkid-imagecapture-in-browser.tsx).

### Newly supported identity documents:

We’ve added 98 new documents:

#### Europe

* Albania - Driver Card (front only)
* Albania - Professional Driver License (front only)
* Belarus - Driver License (front only, beta)
* Belgium - Minors ID (beta)
* Czechia - Residence Permit
* Finland - Alien ID
* Finland - Residence Permit (beta)
* Georgia - Driver License (front only)
* Greece - Residence Permit
* Ireland - Passport Card (beta)
* Ireland - Public Services Card (beta)
* Kosovo - Driver License (front only, beta)
* Latvia - Alien ID
* Luxembourg - ID Card
* Moldova - ID Card (beta)
* North Macedonia - Driver License (front only)
* North Macedonia - ID Card
* Poland - Passport (beta)
* Slovenia - Residence Permit (beta)
* Spain - Alien ID
* UK - Passport (beta)

#### Middle East and Africa

* Algeria - Driver License
* Burkina Faso - ID Card (front only)
* Cameroon - ID Card (beta)
* Democratic Republic Of The Congo - Driver License (front only, beta)
* Egypt - Driver License (beta)
* Ghana - ID Card (beta)
* Iraq - ID Card (beta)
* Ivory Coast - Driver License (front only, beta)
* Ivory Coast - ID Card
* Lebanon - ID Card (beta)
* Morocco - Driver License
* Mozambique - Driver License (front only, beta)
* Oman - Driver License (beta)
* Rwanda - ID Card (front only)
* Senegal - ID Card
* Tanzania - Driver License (front only, beta)
* Tunisia - Driver License (front only)
* Uganda - Driver License (front only, beta)

#### Latin America & the Caribbean

* Argentina - Alien ID (beta)
* Bahamas - ID Card (front only, beta)
* Bolivia - Minors ID (beta)
* Jamaica - Driver License
* Mexico - Residence Permit (beta)
* Mexico - Chiapas - Driver License (front only)
* Mexico - Coahuila - Driver License (beta)
* Mexico - Durango - Driver License(front only, beta)
* Mexico - Guerrero-cocula - Driver License (beta)
* Mexico - Guerrero-juchitan - Driver License (beta)
* Mexico - Guerrero-tepecoacuilco - Driver License (front only, beta)
* Mexico - Guerrero-tlacoapa - Driver License (front only, beta)
* Mexico - Hidalgo - Driver License
* Mexico - Mexico - Driver License (beta)
* Mexico - Morelos - Driver License (front only)
* Mexico - Oaxaca - Driver License
* Mexico - Puebla - Driver License (front only, beta)
* Mexico - San Luis Potosi - Driver License (front only)
* Mexico - Sinaloa - Driver License (front only, beta)
* Mexico - Sonora - Driver License (beta)
* Mexico - Tabasco - Driver License (beta)
* Mexico - Yucatan - Driver License (beta)
* Mexico - Zacatecas - Driver License (beta)
* Panama - Temporary Residence Permit (beta)
* Peru - Minors ID (beta)
* Trinidad And Tobago - Driver License (front only, beta)
* Trinidad And Tobago - ID Card

#### Oceania

* Australia - South Australia - Proof Of Age Card (front only, beta)

#### Asia

* Armenia - ID Card
* Bangladesh - Driver License (beta)
* Cambodia - Driver License (front only, beta)
* India - Gujarat - Driving Licence (front only, beta)
* India - Karnataka - Driving Licence (front only, beta)
* India - Kerala - Driving Licence (beta)
* India - Madhya Pradesh - Driving Licence (front only, beta)
* India - Maharashtra - Driving Licence (front only, beta)
* India - Punjab - Driving Licence (front only, beta)
* India - Tamil Nadu - Driving Licence (beta)
* Kyrgyzstan - ID Card
* Malaysia - Mypolis (beta)
* Malaysia - Refugee ID (front only)
* Myanmar - Driver License (beta)
* Pakistan - Punjab - Driving Licence (front only, beta)
* Sri Lanka - Driving Licence (front only)
* Thailand - Alien ID (front only)
* Thailand - Driver License (beta)
* Uzbekistan - Driver License (front only, beta)

#### Northern America

* Canada - Tribal ID (beta)
* Canada - Nova Scotia - ID Card (beta)
* Canada - Saskatchewan - ID Card (beta)
* USA - Border Crossing Card (front only)
* USA - Global Entry Card (beta)
* USA - Nexus Card (beta)
* USA - Veteran ID (front only)
* USA - Work Permit
* USA - Mississippi - ID Card (beta)
* USA - Montana - ID Card
* USA - New Mexico - ID Card (beta)
* USA - Wisconsin - ID Card (beta)

#### Back side support added:

* Hungary - Residence Permit
* Luxembourg - Residence Permit (no longer beta)
* Mauritius - ID Card
* Colombia - Alien ID (no longer beta)
* Mexico - Baja California - Driver License
* Mexico - Chihuahua - Driver License
* Mexico - Guanajuato - Driver License
* Mexico - Michoacan - Driver License
* Malaysia - MyKid
* Malaysia - MyPR

#### No longer beta:

* Albania - Passport
* Malta - Residence Permit
* Switzerland - Residence Permit
* Bolivia - Driver License
* Chile - Passport
* El Salvador - ID Card
* Peru - ID Card
* Singapore - S Pass (front only)

### Performance improvements

* We've added three different flavors of WebAssembly builds to the SDK, to provide better performance across all browsers
    * Unless defined otherwise, the SDK will load the best possible bundle during initialization:
        * `Basic` Same as the existing WebAssembly build, most compatible, but least performant.
        * `Advanced` WebAssembly build that provides better performance but requires a browser with advanced features.
        * `AdvancedWithThreads` Most performant WebAssembly build which requires a proper setup of COOP and COEP headers on the server-side.
    * For more information about different WebAssembly builds and how to use them properly, check out the [relevant section](README.md/#deploymentGuidelines) in our official documentation

### Bugfixes

* We fixed the initialization problem that prevented the SDK from loading on iOS 13 and older versions

## 5.10.0

**Newly supported identity documents**

* Saudi Arabia - DL (front)
* Saudi Arabia - Resident ID (front)

### Changes to the BlinkId(Combined)Recognizer:

* We've improved data extraction through the MRZ:
    * We now return the document type through `ClassInfo`.
* We've extended the `ClassInfo` structure with helper methods so you can filter documents by country more easily:
    * Use `countryName`, `isoNumericCountryCode`, `isoAlpha2CountryCode` and `isoAlpha3CountryCode` to get the full country names or their representative codes defined by [ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).
* We've added another `ProcessingStatus` called `AwaitingOtherSide`
    * This status is triggered once BlinkID has finished with the first side of a document and expects the other side, too.
* We've added a new recognition mode for recognizing still images of documents that have already been cropped:
    * Set the `scanCroppedDocumentImage` to true when you're feeding BlinkID images of documents that have already been cropped and don't require detection.
    * Keep in mind that this setting won't work on document images that haven't been properly cropped.

### Changes to the UI component:

* We’ve added new ways you can configure the UI component to better fit the way your app looks and behaves.
    * For a full list of attributes, properties and events you can modify, please see the [API documentation](ui/docs/components/blinkid-imagecapture-in-browser/readme.md).
    * For a full list of CSS variables please see [\_globals.scss file](ui/src/components/shared/styles/_globals.scss).

### Changes to RecognizerRunner class:

* Invoking `RecognizerRunner.processImage` on  multiple still images will no longer implicitly reset the recognizer chain.
    * This means you can now use BlinkIdImageCaptureRecognizer with the flag `captureBothDocumentSides` to scan both sides of a document by giving it two still images.
    * If you still need to reset the recognizers, you can do that  manually by invoking the `RecognizerRunner.resetRecognizers` function.
    * A complete example of how to use BlinkIdImageCaptureRecognizer with the flag `captureBothDocumentSides` with still images has been added [here](examples/combined-file).

## 5.9.0

### New additions to our supported documents list

- 53 documents added:

    - ALBANIA - DL (front)
    - BELGIUM - RESIDENCE PERMIT (front, back)
    - BOLIVIA - ID (front, back)
    - BOSNIA AND HERZEGOVINA - PASSPORT
    - CAMBODIA - PASSPORT
    - CANADA - RESIDENCE PERMIT (front, back)
    - CANADA - MANITOBA - ID (front)
    - CANADA - ONTARIO - HEALTH INSURANCE CARD (front)
    - CHILE - ALIEN ID (front, back)
    - CHINA - ID (front, back)
    - COLOMBIA - MINORS ID (front, back)
    - CYPRUS - RESIDENCE PERMIT (front, back)
    - CZECHIA - PASSPORT
    - GREECE - ID (front)
    - HAITI - ID (front, back)
    - ITALY - RESIDENCE PERMIT (front, back)
    - LATVIA - DL (front)
    - LATVIA - PASSPORT
    - LITHUANIA - PASSPORT
    - LUXEMBOURG - DL (front)
    - MONTENEGRO - DL (front)
    - MONTENEGRO - ID (front, back)
    - MONTENEGRO - PASSPORT
    - NETHERLANDS - RESIDENCE PERMIT (front, back)
    - NICARAGUA - ID (front, back)
    - NIGERIA - ID (front, back)
    - NORWAY - RESIDENCE PERMIT (front, back)
    - OMAN - RESIDENT ID (front, back)
    - PARAGUAY - DL (front, back)
    - PERU - DL (front, back)
    - PHILIPPINES - SOCIAL SECURITY CARD (front)
    - ROMANIA - PASSPORT
    - RUSSIA - PASSPORT
    - SERBIA - PASSPORT
    - SLOVAKIA - PASSPORT
    - SLOVENIA - PASSPORT
    - SOUTH KOREA - DL (front)
    - SPAIN - RESIDENCE PERMIT (front, back)
    - SWEDEN - RESIDENCE PERMIT (front, back)
    - THAILAND - PASSPORT
    - UKRAINE - DL (front)
    - UKRAINE - PASSPORT
    - USA - ARKANSAS - ID (front, back)
    - USA - CONNECTICUT - ID (front, back)
    - USA - GREEN CARD (front, back)
    - USA - MARYLAND - ID (front, back)
    - USA - MINNESOTA - ID (front, back)
    - USA - NEVADA - ID (front, back)
    - USA - NEW YORK CITY - ID (front, back)
    - USA - TEXAS - WEAPON PERMIT (front)
    - USA - VIRGINIA - ID (front, back)
    - VENEZUELA - DL (front)
    - VENEZUELA - PASSPORT

- Beta support added for 46 documents:
    - ALBANIA - PASSPORT
    - BAHAMAS - DL (front)
    - BERMUDA - DL (front)
    - BOLIVIA - DL (front)
    - CHILE - DL (front)
    - COLOMBIA - ALIEN ID (front)
    - DENMARK - RESIDENCE PERMIT (front, back)
    - DOMINICAN REPUBLIC - DL (front, back)
    - ECUADOR - DL (front)
    - EL SALVADOR - DL (front, back)
    - ESTONIA - RESIDENCE PERMIT (front, back)
    - GUATEMALA - DL (front, back)
    - HAITI - DL (front)
    - HONDURAS - DL (front, back)
    - HONDURAS - ID (front, back)
    - HUNGARY - ADDRESS CARD (front, back)
    - HUNGARY - RESIDENCE PERMIT (front)
    - ICELAND - DL (front)
    - ISRAEL - ID (front, back)
    - JAPAN - DL (front)
    - JORDAN - DL (front)
    - LATVIA - ALIEN PASSPORT
    - LATVIA - RESIDENCE PERMIT (front, back)
    - LUXEMBOURG - RESIDENCE PERMIT (front)
    - MALTA - RESIDENCE PERMIT (front, back)
    - MEXICO - BAJA CALIFORNIA - DL (front)
    - MEXICO - CHIHUAHUA - DL (front)
    - MEXICO - CIUDAD DE MEXICO - DL (front)
    - MEXICO - PROFESSIONAL DL (front)
    - MEXICO - GUANAJUATO - DL (front)
    - MEXICO - MICHOACAN - DL (front)
    - MEXICO - TAMAULIPAS - DL (front, back)
    - MEXICO - VERACRUZ - DL (front, back)
    - PHILIPPINES - TAX ID (front)
    - PHILIPPINES - VOTER ID (front)
    - POLAND - RESIDENCE PERMIT (front, back)
    - PORTUGAL - RESIDENCE PERMIT (front, back)
    - PUERTO RICO - VOTER ID (front)
    - SLOVAKIA - RESIDENCE PERMIT (front, back)
    - SOUTH KOREA - ID (front)
    - SWITZERLAND - RESIDENCE PERMIT (front, back)
    - TAIWAN - TEMPORARY RESIDENCE PERMIT (front)
    - TURKEY - RESIDENCE PERMIT (front)
    - USA - KANSAS - ID (front, back)
    - VENEZUELA - ID (front)
    - VIETNAM - DL (front)

- Added back side support for 7 documents:
    - ARGENTINA - ID
    - ECUADOR - ID
    - FINLAND - ID
    - NIGERIA - DL
    - QATAR - RESIDENCE PERMIT
    - URUGUAY - ID
    - USA - NEW YORK - DL

- 9 documents are no longer beta:
    - BRAZIL - DL
    - CANADA - ALBERTA - ID
    - MALAYSIA - MyKAS
    - MEXICO - NUEVO LEON - DL
    - PANAMA - DL
    - PORTUGAL - DL
    - SAUDI ARABIA - ID
    - SRI LANKA - ID
    - USA - IDAHO - ID

### New features and updates

*   We've expanded the set of possible recognizer states with `**StageValid**`. This state fixes `BlinkIDCombinedRecognizer` timeout issues, and enables better control of the Combined scanning pipeline. It activates when the first side of a document has been successfully scanned and scanning of the second side is required.

#### Camera management updates

* We've enabled camera image flipping
    * Method `flipCamera` has been added to [`VideoRecognizer`](src/MicroblinkSDK/VideoRecognizer.ts).
    * You can now let your users mirror the camera image vertically.
    * By default, the UI component will display a flip icon in the top left corner once the camera is live.
* We've improved camera management on devices with multiple cameras
    * Method `createVideoRecognizerFromCameraStream` has been extended in [`VideoRecognizer` class](src/MicroblinkSDK/VideoRecognizer.ts).
    * Attribute `[camera-id]` has been added to the UI component so that your users can preselect their desired camera.

### Licensing

* We've enabled creation of trial licenses through our Developer Dashboard
    * You can now generate a trial license key yourself to try BlinkID ImageCapture In-browser SDK in your web app

### Fixes

* We've fixed a problem where the UI component would interfere with navigation strategy in SPA frameworks.
    * Value of the `href` attribute in button elements has been changed to `javascript:void(0)`.

## 5.8.0

* initial release of the BlinkID ImageCapture In-browser SDK
* first version is 5.8.0 due to better connection with other BlinkID products
