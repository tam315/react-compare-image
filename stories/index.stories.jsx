import { storiesOf } from '@storybook/react'; // eslint-disable-line
import React, { useState } from 'react';
import img1SrcTaller from '../images/image1-taller.png';
import img1Src from '../images/image1.png';
import img2SrcWider from '../images/image2-wider.png';
import img2Src from '../images/image2.png';
import imgTaller from '../images/taller-image.png';
import imgWider from '../images/wider-image.png';
import ReactCompareImage from '../src/ReactCompareImage';

storiesOf('Basic', module)
  .add('basic usage', () => (
    <div style={{ maxWidth: '320px' }}>
      Horizontal comparison
      <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
      <br />
      Vertical comparison
      <ReactCompareImage leftImage={img1Src} rightImage={img2Src} vertical />
    </div>
  ))
  .add('hover', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage leftImage={img1Src} rightImage={img2Src} hover />
    </div>
  ))
  .add('show labels', () => (
    <div style={{ maxWidth: '640px' }}>
      horizontal
      <ReactCompareImage
        leftImage={img1Src}
        leftImageLabel="Before"
        rightImage={img2Src}
        rightImageLabel="After"
      />
      vertical
      <ReactCompareImage
        leftImage={img1Src}
        leftImageLabel="Before"
        rightImage={img2Src}
        rightImageLabel="After"
        vertical
      />
    </div>
  ))
  .add('apply css', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img2Src}
        leftImageCss={{ filter: 'brightness(40%)' }}
        rightImageCss={{ filter: 'brightness(20%)' }}
      />
    </div>
  ))
  .add('detect slider position change', () => {
    const [position, setPosition] = useState(null);
    return (
      <div style={{ maxWidth: '640px' }}>
        <ReactCompareImage
          leftImage={img1Src}
          rightImage={img2Src}
          onSliderPositionChange={setPosition}
        />
        <div>slider position: {position}</div>
      </div>
    );
  });
storiesOf('Customizing', module)
  .add('slider width', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img2Src}
        sliderLineWidth={6}
      />
    </div>
  ))
  .add('slider color', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img2Src}
        sliderLineColor="rebeccapurple"
      />
    </div>
  ))
  .add('handle', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img2Src}
        handle={<button type="button">I am Custom Handle!</button>}
      />
    </div>
  ))
  .add('no handle', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img2Src}
        handle={<React.Fragment />} // eslint-disable-line
      />
    </div>
  ))
  .add('no slider', () => (
    <div style={{ maxWidth: '640px' }}>
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img2Src}
        handle={<React.Fragment />} // eslint-disable-line
        sliderLineWidth={0}
      />
    </div>
  ));

storiesOf('Images with different aspect ratios', module)
  .add('default behavior', () => (
    <div style={{ maxWidth: '320px' }}>
      <div>By default, container size is determined by the taller one.</div>
      <ReactCompareImage
        leftImage={imgTaller}
        rightImage={imgWider}
        aspectRatio="taller" // this is set by default
      />
      <div>
        If you want to change this behavior, you can set `aspectRatio` prop to
        `wider`.
      </div>
      <ReactCompareImage
        leftImage={imgTaller}
        rightImage={imgWider}
        aspectRatio="wider"
      />
    </div>
  ))
  .add('same width comparison', () => (
    <div style={{ maxWidth: '640px' }}>
      Adjust `object-fit` and `object-position` if you want to display images
      with the same width.
      <ReactCompareImage
        leftImage={img1Src}
        rightImage={img1SrcTaller}
        aspectRatio="taller"
        rightImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
        leftImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
      />
    </div>
  ))
  .add('same height comparison', () => (
    <div style={{ maxWidth: '640px' }}>
      Adjust `object-fit` and `object-position` if you want to display images
      with the same height.
      <ReactCompareImage
        leftImage={img2SrcWider}
        rightImage={img2Src}
        aspectRatio="wider"
        rightImageCss={{ objectFit: 'contain', objectPosition: 'left' }}
        leftImageCss={{ objectFit: 'contain', objectPosition: 'left' }}
      />
      (Try to slide to the right edge!)
    </div>
  ));

storiesOf('For Debugging', module)
  .add('multiple components', () => (
    <div>
      <div style={{ maxWidth: '200px' }}>
        <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
      </div>
      <p />
      <div style={{ maxWidth: '300px' }}>
        <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
      </div>
      <p />
      <div style={{ maxWidth: '500px' }}>
        <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
      </div>
      <p />
      <div style={{ maxWidth: '100%' }}>
        <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
      </div>
    </div>
  ))
  .add('update src', () => {
    const [leftImageSrc, setLeftImageSrc] = useState(img1Src);
    const [rightImageSrc, setRightImageSrc] = useState(img2Src);
    return (
      <div>
        <div style={{ maxWidth: '320px' }}>
          <ReactCompareImage
            leftImage={leftImageSrc}
            rightImage={rightImageSrc}
          />
        </div>
        <button type="button" onClick={() => setLeftImageSrc(imgTaller)}>
          update left image
        </button>
        <button type="button" onClick={() => setRightImageSrc(imgWider)}>
          update right image
        </button>
      </div>
    );
  });
