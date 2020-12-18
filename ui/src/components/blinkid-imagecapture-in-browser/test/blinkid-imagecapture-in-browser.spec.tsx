/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

import { newSpecPage } from '@stencil/core/testing';
import { BlinkidImageCaptureInBrowser } from '../blinkid-imagecapture-in-browser';

describe('blinkid-imagecapture-in-browser', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BlinkidImageCaptureInBrowser],
      html: `<blinkid-imagecapture-in-browser></blinkid-imagecapture-in-browser>`,
    });
    expect(page.root).toEqualHtml(`
      <blinkid-imagecapture-in-browser>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </blinkid-imagecapture-in-browser>
    `);
  });
});
