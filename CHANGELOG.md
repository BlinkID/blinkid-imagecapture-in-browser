# Release notes

## 5.11.2

### SDK changes

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
