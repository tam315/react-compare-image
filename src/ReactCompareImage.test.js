import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import ReactCompareImage from './ReactCompareImage';

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

    const leftImage = getByTestId('left-image');
    const rightImage = getByTestId('right-image');

    expect(rightImage.src).toBe(DUMMY_RIGHT_IMAGE);
    expect(leftImage.src).toBe(DUMMY_LEFT_IMAGE);
  });

  test('show skeleton if it is provided as props', async () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
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
      { container },
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
});
