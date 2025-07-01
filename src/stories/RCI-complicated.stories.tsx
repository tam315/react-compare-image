import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import ReactCompareImage from '@/ReactCompareImage'
import img1Src from './assets/image1.png'
import img2Src from './assets/image2.png'
import imgTaller from './assets/taller-image.png'
import imgWider from './assets/wider-image.png'

const meta: Meta = {
  title: 'ReactCompareImage/ForDebugging',
}

export default meta

export const VariousWidths: StoryObj = {
  render: () => (
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
  ),
}

export const UpdateImage: StoryObj = {
  render: () => {
    const [leftImageSrc, setLeftImageSrc] = useState(img1Src)
    const [rightImageSrc, setRightImageSrc] = useState(img2Src)

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
    )
  },
}

export const Resizing: StoryObj = {
  render: () => (
    <div
      style={{
        background: 'lightblue',
        height: 400,
        overflow: 'scroll',
        resize: 'both',
        width: 400,
      }}
    >
      <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
    </div>
  ),
}
