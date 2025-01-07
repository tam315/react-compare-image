import type { Meta, StoryObj } from '@storybook/react';
import img2Src from './assets/image2.png';
import img2WiderSrc from './assets/image2-wider.png';
import ReactCompareImage from '../ReactCompareImage';
import img1Src from './assets/image1.png';
import img1TallerSrc from './assets/image1-taller.png';
import ImgTallerSrc from './assets/taller-image.png';
import ImgWiderSrc from './assets/wider-image.png';
import React from 'react';

const meta: Meta<typeof ReactCompareImage> = {
  title: 'ReactCompareImage/Basic',
  component: ReactCompareImage,
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
  },
};

export const Vertical: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    vertical: true,
  },
};

export const Hover: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    hover: true,
  },
};

export const LabelHorizontal: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    leftImageLabel: 'Before',
    rightImageLabel: 'After',
  },
};

export const LabelVertical: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    leftImageLabel: 'Before',
    rightImageLabel: 'After',
    vertical: true,
  },
};

export const ApplyCss: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    leftImageCss: { filter: 'brightness(40%)' },
    rightImageCss: { filter: 'brightness(20%)' },
  },
};

export const SliderCustomization: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    sliderLineWidth: 10,
    sliderLineColor: 'rebeccapurple',
    handle: <button type="button">I am Custom Handle!</button>,
  },
};

export const NoHandleNoSlider: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    handle: <React.Fragment />,
    sliderLineWidth: 0,
  },
};

export const SliderPosition: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img2Src,
    onSliderPositionChange: position => {
      console.log('Slider position:', position);
    },
  },
};

export const Taller: Story = {
  args: {
    leftImage: ImgTallerSrc,
    rightImage: ImgWiderSrc,
    aspectRatio: 'taller',
  },
};

export const Wider: Story = {
  args: {
    leftImage: ImgTallerSrc,
    rightImage: ImgWiderSrc,
    aspectRatio: 'wider',
  },
};

export const SameWidthComparison: Story = {
  args: {
    leftImage: img1Src,
    rightImage: img1TallerSrc,
    aspectRatio: 'taller',
    rightImageCss: { objectFit: 'contain', objectPosition: 'top' },
    leftImageCss: { objectFit: 'contain', objectPosition: 'top' },
  },
};

export const SameHeightComparison: Story = {
  args: {
    leftImage: img2WiderSrc,
    rightImage: img2Src,
    aspectRatio: 'wider',
    rightImageCss: { objectFit: 'contain', objectPosition: 'left' },
    leftImageCss: { objectFit: 'contain', objectPosition: 'left' },
    sliderPositionPercentage: 0.95,
  },
};
