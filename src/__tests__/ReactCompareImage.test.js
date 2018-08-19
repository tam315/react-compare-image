import { mount } from 'enzyme';
import * as React from 'react';
import ReactCompareImage from '../ReactCompareImage';

jest.mock('css-element-queries');

describe('ReactCompareImage', () => {
  let mock;
  const DUMMY_LEFT_IMAGE = 'http://dummy.com/left.jpg';
  const DUMMY_LEFT_IMAGE_UPDATED = 'http://dummy.com/left_updated.jpg';
  const DUMMY_RIGHT_IMAGE = 'http://dummy.com/right.jpg';

  beforeEach(() => {
    mock = {
      actions: {
        signInWithGoogle: jest.fn(),
        signInWithFacebook: jest.fn(),
        signInWithEmail: jest.fn(),
        signUpWithEmail: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
      },
      signInWithRedirect: jest.fn(),
    };
  });

  test('set image sources', () => {
    const wrapper = mount(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
      />,
    );

    const instance = wrapper.instance();
    expect(instance.underImageRef.current.src).toBe(DUMMY_RIGHT_IMAGE);
    expect(instance.overImageRef.current.src).toBe(DUMMY_LEFT_IMAGE);
  });

  test('show skeleton if it is provided as props', () => {
    const skeleton = <div dataenzyme="skeleton" />;
    const wrapper = mount(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
        skeleton={skeleton}
      />,
    );

    // show skeleton if images are loading
    const instance = wrapper.instance();
    expect(wrapper.find({ dataenzyme: 'skeleton' })).toHaveLength(1);

    // hide skeleton if the images are fully loaded
    instance.onRightImageLoaded();
    instance.onLeftImageLoaded();
    wrapper.update();
    expect(wrapper.find({ dataenzyme: 'skeleton' })).toHaveLength(0);

    // show skeleton again if the image url is changed
    wrapper.setProps({ leftImage: DUMMY_LEFT_IMAGE_UPDATED });
    wrapper.update();
    expect(wrapper.find({ dataenzyme: 'skeleton' })).toHaveLength(1);
  });

  test('container is invisible until images is fully loaded', () => {
    const skeleton = <div dataenzyme="skeleton" />;
    const wrapper = mount(
      <ReactCompareImage
        leftImage={DUMMY_LEFT_IMAGE}
        rightImage={DUMMY_RIGHT_IMAGE}
      />,
    );

    expect(
      wrapper.find({ dataenzyme: 'container' }).prop('style')['display'],
    ).toBe('none');

    const instance = wrapper.instance();
    instance.onRightImageLoaded();
    instance.onLeftImageLoaded();
    wrapper.update();

    expect(
      wrapper.find({ dataenzyme: 'container' }).prop('style')['display'],
    ).toBe('block');
  });
});
