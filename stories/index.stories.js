import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ReactCompareImage from '../src/ReactCompareImage';

const leftImageSrc = '/cat1.jpg';
const rightImageSrc = '/cat2.jpg';

storiesOf('ReactCompareImages', module)
  .add('200px', () => (
    <div style={{ maxWidth: '200px', padding: '30px 0', background: 'gray' }}>
      <ReactCompareImage leftImage={leftImageSrc} rightImage={rightImageSrc} />
    </div>
  ))
  .add('300px', () => (
    <div style={{ maxWidth: '300px', padding: '30px 0', background: 'gray' }}>
      <ReactCompareImage leftImage={leftImageSrc} rightImage={rightImageSrc} />
    </div>
  ))
  .add('500px', () => (
    <div style={{ maxWidth: '500px', padding: '30px 0', background: 'gray' }}>
      <ReactCompareImage leftImage={leftImageSrc} rightImage={rightImageSrc} />
    </div>
  ))
  .add('100%', () => (
    <div style={{ maxWidth: '100%', padding: '30px 0', background: 'gray' }}>
      <ReactCompareImage leftImage={leftImageSrc} rightImage={rightImageSrc} />
    </div>
  ))
  .add('linecolor', () => (
    <div style={{ maxWidth: '100%', padding: '30px 0', background: 'gray' }}>
      <ReactCompareImage
        leftImage={leftImageSrc}
        rightImage={rightImageSrc}
        sliderLineColor="rebeccapurple"
      />
    </div>
  ))
  .add('apply-css', () => (
    <div style={{ maxWidth: '100%', padding: '30px 0', background: 'gray' }}>
      <ReactCompareImage
        leftImage={leftImageSrc}
        rightImage={rightImageSrc}
        leftImageCss={{ filter: 'brightness(50%)' }}
        rightImageCss={{ filter: 'sepia(100%)' }}
      />
    </div>
  ))
  .add('all', () => (
    <div>
      <div style={{ maxWidth: '200px', padding: '30px 0', background: 'gray' }}>
        <ReactCompareImage
          leftImage={leftImageSrc}
          rightImage={rightImageSrc}
        />
      </div>
      <p />
      <div style={{ maxWidth: '300px', padding: '30px 0', background: 'gray' }}>
        <ReactCompareImage
          leftImage={leftImageSrc}
          rightImage={rightImageSrc}
        />
      </div>
      <p />
      <div style={{ maxWidth: '500px', padding: '30px 0', background: 'gray' }}>
        <ReactCompareImage
          leftImage={leftImageSrc}
          rightImage={rightImageSrc}
        />
      </div>
      <p />
      <div style={{ maxWidth: '100%', padding: '30px 0', background: 'gray' }}>
        <ReactCompareImage
          leftImage={leftImageSrc}
          rightImage={rightImageSrc}
        />
      </div>
    </div>
  ));
