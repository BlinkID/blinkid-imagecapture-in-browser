/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

import * as BlinkIDImageCaptureSDK from '../../../../../es/blinkid-imagecapture-sdk';

function getSDKWasmType(wasmType: string): BlinkIDImageCaptureSDK.WasmType | null {
  switch (wasmType) {
    case 'BASIC':
      return BlinkIDImageCaptureSDK.WasmType.Basic;
    case 'ADVANCED':
      return BlinkIDImageCaptureSDK.WasmType.Advanced;
    case 'ADVANCED_WITH_THREADS':
      return BlinkIDImageCaptureSDK.WasmType.AdvancedWithThreads;
    default:
      return null;
  }
}

export { getSDKWasmType }
