# Release notes

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
