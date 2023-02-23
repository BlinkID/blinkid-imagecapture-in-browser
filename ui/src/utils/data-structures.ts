/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

import { EventEmitter } from '@stencil/core';

import * as BlinkIDImageCaptureSDK from '@microblink/blinkid-imagecapture-in-browser-sdk';

export {
  ProductIntegrationInfo,
  SDKError
} from '@microblink/blinkid-imagecapture-in-browser-sdk';

export interface MicroblinkUI {
  // SDK settings
  allowHelloMessage:     boolean;
  engineLocation:        string;
  workerLocation:        string;
  licenseKey:            string;
  wasmType:              string;
  rawRecognizers:        string;
  recognizers:           Array<string>;
  recognizerOptions:     { [key: string]: any };
  recognitionTimeout?:   number;
  recognitionPauseTimeout?: number;
  includeSuccessFrame?:  boolean;
  thoroughScanFromImage: boolean;

  // Functional properties
  enableDrag:            boolean;
  hideFeedback:          boolean;
  hideLoadingAndErrorUi: boolean;
  scanFromCamera:        boolean;
  scanFromImage:         boolean;

  // Localization
  translations:          { [key: string]: string };
  rawTranslations:       string;

  // UI customization
  galleryOverlayType:                'FULLSCREEN' | 'INLINE';
  galleryDropType:                   'FULLSCREEN' | 'INLINE';
  showActionLabels:                  boolean;
  showModalWindows:                  boolean;
  showScanningLine?:                 boolean;
  showCameraFeedbackBarcodeMessage?: boolean;

  // Icons
  iconCameraDefault:                string;
  iconCameraActive:                 string;
  iconGalleryDefault:               string;
  iconGalleryActive:                string;
  iconInvalidFormat:                string;
  iconSpinnerScreenLoading:         string;
  iconSpinnerFromGalleryExperience: string;
  iconGalleryScanningCompleted:     string;

  // Events
  fatalError:         EventEmitter<BlinkIDImageCaptureSDK.SDKError>;
  ready:              EventEmitter<EventReady>;
  scanError:          EventEmitter<EventScanError>;
  scanSuccess:        EventEmitter<EventScanSuccess>;
  cameraScanStarted:  EventEmitter<null>;
  imageScanStarted:   EventEmitter<null>;

  // Methods
  setUiState:                (state: 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS') => Promise<any>;
  setUiMessage:              (state: 'FEEDBACK_ERROR' | 'FEEDBACK_INFO' | 'FEEDBACK_OK', message: string) => Promise<any>;
  getProductIntegrationInfo: () => Promise<BlinkIDImageCaptureSDK.ProductIntegrationInfo>;
}

export interface SdkSettings {
  allowHelloMessage:  boolean;
  engineLocation:     string;
  workerLocation:     string;
  wasmType?:          BlinkIDImageCaptureSDK.WasmType;
}

/**
 * Events
 */
export class EventReady {
  sdk: BlinkIDImageCaptureSDK.WasmSDK;

  constructor(sdk: BlinkIDImageCaptureSDK.WasmSDK) {
    this.sdk = sdk;
  }
}

export class EventScanError {
  code:           Code;
  fatal:          boolean;
  message:        string;
  recognizerName: string;
  details?:       any;

  constructor(code: Code, fatal: boolean, message: string, recognizerName: string, details?: any) {
    this.code = code;
    this.fatal = fatal;
    this.message = message;
    this.recognizerName = recognizerName;

    if (details) {
      this.details = details;
    }
  }
}

export class EventScanSuccess {
  recognizer:     BlinkIDImageCaptureSDK.RecognizerResult;
  recognizerName: string;
  successFrame?:  BlinkIDImageCaptureSDK.SuccessFrameGrabberRecognizerResult;

  constructor(
    recognizer: BlinkIDImageCaptureSDK.RecognizerResult,
    recognizerName: string,
    successFrame?: BlinkIDImageCaptureSDK.SuccessFrameGrabberRecognizerResult
  ) {
    this.recognizer = recognizer;
    this.recognizerName = recognizerName;

    if (successFrame) {
      this.successFrame = successFrame;
    }
  }
}

export interface RecognitionResults {
  recognizer: BlinkIDImageCaptureSDK.RecognizerResult,
  successFrame?: BlinkIDImageCaptureSDK.SuccessFrameGrabberRecognizerResult
}

/**
 * Error codes
 */
export enum Code {
  EmptyResult               = 'EMPTY_RESULT',
  InvalidRecognizerOptions  = 'INVALID_RECOGNIZER_OPTIONS',
  NoImageFileFound          = 'NO_IMAGE_FILE_FOUND',
  NoFirstImageFileFound     = 'NO_FIRST_IMAGE_FILE_FOUND',
  NoSecondImageFileFound    = 'NO_SECOND_IMAGE_FILE_FOUND',
  GenericScanError          = 'GENERIC_SCAN_ERROR',
  CameraNotAllowed          = 'CAMERA_NOT_ALLOWED',
  CameraInUse               = 'CAMERA_IN_USE',
  CameraGenericError        = 'CAMERA_GENERIC_ERROR',
}

/**
 * Scan structures
 */
export const AvailableRecognizers: { [key: string]: string } = {
  BlinkIdImageCaptureRecognizer:        'createBlinkIdImageCaptureRecognizer',
}

export interface VideoRecognitionConfiguration {
  recognizers: Array<string>,
  recognizerOptions?: any,
  recognitionTimeout?: number,
  successFrame: boolean,
  cameraFeed: HTMLVideoElement,
  cameraId: string | null
}

export interface ImageRecognitionConfiguration {
  recognizers: Array<string>,
  recognizerOptions?: any,
  thoroughScan?: boolean,
  file: File
}

export interface MultiSideImageRecognitionConfiguration {
  recognizers: Array<string>,
  recognizerOptions?: any,
  thoroughScan?: boolean,
  firstFile: File,
  secondFile: File
}

export enum ImageRecognitionType {
  SingleSide = 'SingleSide',
  MultiSide  = 'MultiSide'
}

export enum MultiSideImageType {
  First  = 'First',
  Second = 'Second'
}

export interface RecognizerInstance {
  name: string,
  recognizer: BlinkIDImageCaptureSDK.Recognizer & { objectHandle: number },
  successFrame?: BlinkIDImageCaptureSDK.SuccessFrameGrabberRecognizer<BlinkIDImageCaptureSDK.Recognizer> & { objectHandle?: number }
}

export enum RecognitionStatus {
  NoImageFileFound          = 'NoImageFileFound',
  NoFirstImageFileFound     = 'NoFirstImageFileFound',
  NoSecondImageFileFound    = 'NoSecondImageFileFound',
  Preparing                 = 'Preparing',
  Ready                     = 'Ready',
  Processing                = 'Processing',
  DetectionFailed           = 'DetectionFailed',
  EmptyResultState          = 'EmptyResultState',
  OnFirstSideResult         = 'OnFirstSideResult',
  ScanSuccessful            = 'ScanSuccessful',
  DocumentClassified        = 'DocumentClassified',

  // Camera states
  DetectionStatusChange     = 'DetectionStatusChange',
  NoSupportForMediaDevices  = 'NoSupportForMediaDevices',
  CameraNotFound            = 'CameraNotFound',
  CameraNotAllowed          = 'CameraNotAllowed',
  UnableToAccessCamera      = 'UnableToAccessCamera',
  CameraInUse               = 'CameraInUse',
  CameraGenericError        = 'CameraGenericError',

  // Errors
  UnknownError              = 'UnknownError',

  // BlinkIDImageCaptureSDK.DetectionStatus
  DetectionStatusFail                   = 'Fail',
  DetectionStatusSuccess                = 'Success',
  DetectionStatusCameraTooHigh          = 'CameraTooHigh',
  DetectionStatusFallbackSuccess        = 'FallbackSuccess',
  DetectionStatusPartial                = 'Partial',
  DetectionStatusCameraAtAngle          = 'CameraAtAngle',
  DetectionStatusCameraTooNear          = 'CameraTooNear',
  DetectionStatusDocumentTooCloseToEdge = 'DocumentTooCloseToEdge'
}

export interface RecognitionEvent {
  status: RecognitionStatus,
  data?: any
}

export interface RecognitionResults {
  recognizer:        BlinkIDImageCaptureSDK.RecognizerResult,
  recognizerName:    string,
  successFrame?:     BlinkIDImageCaptureSDK.SuccessFrameGrabberRecognizerResult,
  imageCapture?:     boolean,
  resultSignedJSON?: BlinkIDImageCaptureSDK.SignedPayload
}

export enum CameraExperience {
  Barcode         = 'BARCODE',
  CardMultiSide   = 'CARD_MULTI_SIDE',
  CardSingleSide  = 'CARD_SINGLE_SIDE',
  PaymentCard     = 'PAYMENT_CARD'
}

export enum CameraExperienceState {
  AdjustAngle     = 'AdjustAngle',
  Classification  = 'Classification',
  Default         = 'Default',
  Detection       = 'Detection',
  Done            = 'Done',
  DoneAll         = 'DoneAll',
  Flip            = 'Flip',
  MoveCloser      = 'MoveCloser',
  MoveFarther     = 'MoveFarther'
}

export interface CameraExperienceTimeoutDurations {
  adjustAngle: number,
  default: number,
  done: number,
  doneAll: number,
  flip: number,
  moveCloser: number,
  moveFarther: number
}

export const CameraExperienceStateDuration = new Map([
  [ CameraExperienceState.AdjustAngle, 2500 ],
  [ CameraExperienceState.Default, 500 ],
  [ CameraExperienceState.Done, 300 ],
  [ CameraExperienceState.DoneAll, 400 ],
  [ CameraExperienceState.Flip, 3500 ],
  [ CameraExperienceState.MoveCloser, 2500 ],
  [ CameraExperienceState.MoveFarther, 2500 ]
]);

/**
 * User feedback structures
 */
export enum FeedbackCode {
  CameraDisabled      = 'CAMERA_DISABLED',
  CameraGenericError  = 'CAMERA_GENERIC_ERROR',
  CameraInUse         = 'CAMERA_IN_USE',
  CameraNotAllowed    = 'CAMERA_NOT_ALLOWED',
  GenericScanError    = 'GENERIC_SCAN_ERROR',
  ScanStarted         = 'SCAN_STARTED',
  ScanUnsuccessful    = 'SCAN_UNSUCCESSFUL',
  ScanSuccessful      = 'SCAN_SUCCESSFUL'
}

export interface FeedbackMessage {
  code?   : FeedbackCode;
  state   : 'FEEDBACK_ERROR' | 'FEEDBACK_INFO' | 'FEEDBACK_OK';
  message : string;
}

/**
 * Camera selection
 */
export interface CameraEntry {
  prettyName: string;
  details: BlinkIDImageCaptureSDK.SelectedCamera | null;
}
