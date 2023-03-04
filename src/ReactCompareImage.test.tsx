import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import ReactCompareImage from './ReactCompareImage';

// mock resize observer
// @ts-ignore
window.ResizeObserver = class MockResizeObserver {
  observe() {}
  disconnect() {}
};

/**
 * cheatsheet
 * https://testing-library.com/docs/react-testing-library/cheatsheet
 */

describe('ReactCompareImage', () => {
  const DUMMY_LEFT_IMAGE = 'http://dummy.com/left.jpg';
  const DUMMY_LEFT_IMAGE_UPDATED = 'http://dummy.com/left_updated.jpg';
  const DUMMY_RIGHT_IMAGE = 'http://dummy.com/right.jpg';

  afterEach(() => cleanup());

  test('set image source', () => {
    const { getByTestId } = render(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
      />,
    );

    // @ts-ignore
    const leftImage: HTMLImageElement = getByTestId('left-image');
    // @ts-ignore
    const rightImage: HTMLImageElement = getByTestId('right-image');

    expect(rightImage.src).toBe(DUMMY_RIGHT_IMAGE);
    expect(leftImage.src).toBe(DUMMY_LEFT_IMAGE);
  });

  test('show skeleton if it is provided as props', async () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
        skeleton={<div data-testid="skelton" />}
      />,
    );

    const leftImage = getByTestId('left-image');
    const rightImage = getByTestId('right-image');

    // show skeleton if images are loading
    expect(queryByTestId('skelton')).toBeTruthy();

    fireEvent.load(leftImage);
    fireEvent.load(rightImage);

    // // hide skeleton if the images are fully loaded
    expect(queryByTestId('skelton')).toBeFalsy();

    // show skeleton again if the image url is changed
    rerender(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE_UPDATED}
        rightImage={DUMMY_RIGHT_IMAGE}
        skeleton={<div data-testid="skelton" />}
      />,
    );
    expect(queryByTestId('skelton')).toBeTruthy();
  });

  test('container is invisible until images is fully loaded', () => {
    const { getByTestId } = render(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
      />,
    );

    const container = getByTestId('container');
    expect(container).not.toBeVisible();

    const leftImage = getByTestId('left-image');
    const rightImage = getByTestId('right-image');
    fireEvent.load(leftImage);
    fireEvent.load(rightImage);

    expect(container).toBeVisible();
  });

  test('show custom handle', () => {
    const { getByTestId, rerender, queryByText } = render(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
      />,
    );

    expect(queryByText(/some custom handle/i)).toBeFalsy();

    rerender(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
        handle={<div>some custom handle</div>}
      />,
    );

    const leftImage = getByTestId('left-image');
    const rightImage = getByTestId('right-image');
    fireEvent.load(leftImage);
    fireEvent.load(rightImage);

    expect(queryByText(/some custom handle/i)).toBeTruthy();
  });

  test('set alt props', () => {
    const dummyLeftImageAlt = 'left alt';
    const dummyRightImageAlt = 'right alt';

    const { getByTestId } = render(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
        leftImageAlt={dummyLeftImageAlt}
        rightImageAlt={dummyRightImageAlt}
      />,
    );

    expect(getByTestId('left-image')).toHaveAttribute('alt', dummyLeftImageAlt);
    expect(getByTestId('right-image')).toHaveAttribute(
      'alt',
      dummyRightImageAlt,
    );
  });

  describe('loading strategy props', () => {
    test('seting loading strategy', () => {
      const strategy = 'eager';

      const { getByTestId } = render(
        <ReactCompareImage
          leftImage={DUMMY_LEFT_IMAGE}
          rightImage={DUMMY_RIGHT_IMAGE}
          loadingStrategy={strategy}
        />,
      );

      expect(getByTestId('left-image')).toHaveAttribute('loading', strategy);
      expect(getByTestId('right-image')).toHaveAttribute('loading', strategy);
    });

    test('default loading strategy', () => {
      const { getByTestId } = render(
        <ReactCompareImage
          leftImage={DUMMY_LEFT_IMAGE}
          rightImage={DUMMY_RIGHT_IMAGE}
        />,
      );

      expect(getByTestId('left-image')).toHaveAttribute('loading', 'auto');
      expect(getByTestId('right-image')).toHaveAttribute('loading', 'auto');
    });
  });
});
