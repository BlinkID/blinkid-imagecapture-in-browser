/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

import { ClassInfo } from "../Generic/ClassInfo";
import { ImageAnalysisResult } from "../Generic/ImageAnalysisResult";
import { ProcessingStatus } from "../Generic/ProcessingStatus";
import { RecognitionModeFilter } from "../Generic/RecognitionModeFilter";
import { CameraFrameResult } from "../ImageOptions";

import
{
    Recognizer,
    RecognizerResult,
    RecognizerSettings,
    WasmSDK
} from "../../../MicroblinkSDK/DataStructures";

// required for the final SDK
export * from "../Generic/ClassInfo";
export * from "../Generic/ImageAnalysisResult";
export * from "../Generic/ProcessingStatus";
export * from "../Generic/RecognitionModeFilter";

/**
 * A barcode capture started callback function.
 */
export type BarcodeCaptureStartedCallback = () => void;

/**
 * A settings object that is used for configuring the BlinkIdImageCaptureRecognizer.
 */
export class BlinkIdImageCaptureRecognizerSettings implements RecognizerSettings
{
    /**
     * Defines whether the recognizer will perform capturing of both document sides
     */
    captureBothDocumentSides = false;

    /**
     * Called when barcode frame capture step starts.
     */
    barcodeCaptureStartedCallback: BarcodeCaptureStartedCallback | null = null;

    /**
     * Configure the recognizer to only work on already cropped and dewarped images.
     * This only works for still images - video feeds will ignore this setting.
     */
    scanCroppedDocumentImage = false;

    /**
     * Enable or disable recognition of specific document groups supported by the current license.
     * By default all modes are enabled.
     */
    captureModeFilter = new RecognitionModeFilter();
}

/**
 * The result of image recognition when using the BlinkIdImageCaptureRecognizer.
 */
export interface BlinkIdImageCaptureRecognizerResult extends RecognizerResult
{
    /**
     *  The class info
     */
    readonly classInfo: ClassInfo;

    /**
     * Status of the last recognition process.
     */
    readonly processingStatus: ProcessingStatus;

    /**
     * Result of analysis of the image of the front side of the document.
     */
    readonly frontImageAnalysisResult: ImageAnalysisResult;

    /**
     * Result of analysis of the image of the back side of the document.
     * Available only if both sides of document capturing is enabled.
     */
    readonly backImageAnalysisResult: ImageAnalysisResult;

    /**
     * Captured camera frame containing the front side of the document.
     */
    readonly frontCameraFrame: CameraFrameResult;

    /**
     * Captured camera frame containing the back side of the document.
     * Available only if both sides of document capturing is enabled.
     */
    readonly backCameraFrame: CameraFrameResult;
}

/**
 * The BlinkIdImageCaptureRecognizer is used for capturing the best image of ID document for server-side processing.
 */
export interface BlinkIdImageCaptureRecognizer extends Recognizer
{
    /** Returns the currently applied BlinkIdImageCaptureRecognizerSettings. */
    currentSettings(): Promise< BlinkIdImageCaptureRecognizerSettings >

    /** Applies new settings to the recognizer. */
    updateSettings( newSettings: BlinkIdImageCaptureRecognizerSettings ): Promise< void >;

    /** Returns the current result of the recognition. */
    getResult(): Promise< BlinkIdImageCaptureRecognizerResult >;
}

/**
 * This function is used to create a new instance of `BlinkIdImageCaptureRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
export async function createBlinkIdImageCaptureRecognizer( wasmSDK: WasmSDK ): Promise< BlinkIdImageCaptureRecognizer >
{
    return wasmSDK.mbWasmModule.newRecognizer(
        "BlinkIdImageCaptureRecognizer"
    ) as Promise< BlinkIdImageCaptureRecognizer >;
}
