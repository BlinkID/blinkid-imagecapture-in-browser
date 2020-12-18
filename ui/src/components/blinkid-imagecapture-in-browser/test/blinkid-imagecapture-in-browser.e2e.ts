/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */

import { newE2EPage } from '@stencil/core/testing';

describe('blinkid-imagecapture-in-browser', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<blinkid-imagecapture-in-browser></blinkid-imagecapture-in-browser>');

    const element = await page.find('blinkid-imagecapture-in-browser');
    expect(element).toHaveClass('hydrated');
  });
});
