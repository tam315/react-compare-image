import { ResizeSensor } from 'css-element-queries';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const propTypes = {
  handleSize: PropTypes.number,
  handle: PropTypes.node,
  hover: PropTypes.bool,
  leftImage: PropTypes.string.isRequired,
  leftImageAlt: PropTypes.string,
  leftImageCss: PropTypes.object, // eslint-disable-line
  leftImageLabel: PropTypes.string,
  onSliderPositionChange: PropTypes.func,
  rightImage: PropTypes.string.isRequired,
  rightImageAlt: PropTypes.string,
  rightImageCss: PropTypes.object, // eslint-disable-line
  rightImageLabel: PropTypes.string,
  skeleton: PropTypes.element,
  sliderLineColor: PropTypes.string,
  sliderLineWidth: PropTypes.number,
  sliderPositionPercentage: PropTypes.number,
  container: PropTypes.object, // eslint-disable-line
};

const defaultProps = {
  handleSize: 40,
  handle: null,
  hover: false,
  leftImageAlt: '',
  leftImageCss: {},
  leftImageLabel: null,
  onSliderPositionChange: () => {},
  rightImageAlt: '',
  rightImageCss: {},
  rightImageLabel: null,
  skeleton: null,
  sliderLineColor: '#ffffff',
  sliderLineWidth: 2,
  sliderPositionPercentage: 0.5,
  container: {},
};

function ReactCompareImage(props) {
  const {
    handleSize,
    handle,
    hover,
    leftImage,
    leftImageAlt,
    leftImageCss,
    leftImageLabel,
    onSliderPositionChange,
    rightImage,
    rightImageAlt,
    rightImageCss,
    rightImageLabel,
    skeleton,
    sliderLineColor,
    sliderLineWidth,
    sliderPositionPercentage,
    container,
  } = props;

  // 0 to 1
  const [sliderPosition, setSliderPosition] = useState(
    sliderPositionPercentage,
  );
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [leftImgLoaded, setLeftImgLoaded] = useState(false);
  const [rightImgLoaded, setRightImgLoaded] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const containerRef = useRef();
  const rightImageRef = useRef();
  const leftImageRef = useRef();

  useEffect(() => {
    // when the left image source is changed
    setLeftImgLoaded(false);
    setCanvasWidth(0);
    // consider the case where loading image is completed immediately
    // due to the cache etc.
    const alreadyDone = leftImageRef.current.complete;
    alreadyDone && setLeftImgLoaded(true);
  }, [leftImage]);

  useEffect(() => {
    // when the right image source is changed
    setRightImgLoaded(false);
    setCanvasWidth(0);
    // consider the case where loading image is completed immediately
    // due to the cache etc.
    const alreadyDone = rightImageRef.current.complete;
    alreadyDone && setRightImgLoaded(true);
  }, [rightImage]);

  function getCanvasWidth() {
    // Image size set as follows.
    //
    // 1. right(under) image:
    //     width  = 100% of container width
    //     height = auto
    //
    // 2. left(over) imaze:
    //     width  = 100% of container width
    //     height = right image's height
    //              (protrudes is hidden by css 'object-fit: hidden')
    setCanvasWidth(rightImageRef.current.getBoundingClientRect().width);
  }

  useEffect(() => {
    // re-calculate canvas size when container element size is changed
    const containerElement = containerRef.current;
    const resizeSensor = new ResizeSensor(containerElement, () => {
      getCanvasWidth();
    });
    return () => {
      resizeSensor.detach(containerElement);
    };
  }, []);

  useEffect(() => {
    if (leftImgLoaded && rightImgLoaded) {
      getCanvasWidth();
    }
  }, [leftImgLoaded, rightImgLoaded]);

  function handleSliding(event) {
    if (!isSliding) setIsSliding(true);

    const e = event || window.event;

    // Calc Cursor Position from the left edge of the viewport
    const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;

    // Calc Cursor Position from the left edge of the window (consider any page scrolling)
    const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;

    // Calc Cursor Position from the left edge of the image
    const imagePosition = rightImageRef.current.getBoundingClientRect();
    let pos = cursorXfromWindow - imagePosition.left;

    // Set minimum and maximum values to prevent the slider from overflowing
    const minPos = 0 + sliderLineWidth / 2;
    const maxPos = canvasWidth - sliderLineWidth / 2;

    if (pos < minPos) pos = minPos;
    if (pos > maxPos) pos = maxPos;

    setSliderPosition(pos / canvasWidth);

    // If there's a callback function, invoke it everytime the slider changes
    if (onSliderPositionChange) {
      onSliderPositionChange(pos / canvasWidth);
    }
  }

  function startSliding(e) {
    // Prevent default behavior other than mobile scrolling
    if (!('touches' in e)) {
      e.preventDefault();
    }

    // Slide the image even if you just click or tap (not drag)
    handleSliding(e);

    window.addEventListener('mousemove', handleSliding); // 07
    window.addEventListener('touchmove', handleSliding); // 08
  }

  function finishSliding() {
    setIsSliding(false);
    window.removeEventListener('mousemove', handleSliding);
    window.removeEventListener('touchmove', handleSliding);
  }

  useEffect(() => {
    const containerElement = containerRef.current;

    if (leftImgLoaded && rightImgLoaded && canvasWidth) {
      // it's necessary to reset event handlers each time the canvasWidth changes

      // for mobile
      containerElement.addEventListener('touchstart', startSliding); // 01
      window.addEventListener('touchend', finishSliding); // 02

      // for desktop
      if (hover) {
        containerElement.addEventListener('mousemove', handleSliding); // 03
        containerElement.addEventListener('mouseleave', finishSliding); // 04
      } else {
        containerElement.addEventListener('mousedown', startSliding); // 05
        window.addEventListener('mouseup', finishSliding); // 06
      }
    }

    return () => {
      // cleanup all event resteners
      containerElement.removeEventListener('touchstart', startSliding); // 01
      window.removeEventListener('touchend', finishSliding); // 02
      containerElement.removeEventListener('mousemove', handleSliding); // 03
      containerElement.removeEventListener('mouseleave', finishSliding); // 04
      containerElement.removeEventListener('mousedown', startSliding); // 05
      window.removeEventListener('mouseup', finishSliding); // 06
      window.removeEventListener('mousemove', handleSliding); // 07
      window.removeEventListener('touchmove', handleSliding); // 08
    };
  }, [leftImgLoaded, rightImgLoaded, canvasWidth]);

  const styles = {
    container: {
      boxSizing: 'border-box',
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      ...container,
    },
    rightImage: {
      display: 'block',
      height: 'auto', // Respect the aspect ratio
      width: '100%',
      ...rightImageCss,
    },
    leftImage: {
      clip: `rect(auto, ${canvasWidth * sliderPosition}px, auto, auto)`,
      display: 'block',
      height: '100%', // fit to the height of right(under) image
      objectFit: 'cover', // protrudes is hidden
      position: 'absolute',
      top: 0,
      width: '100%',
      ...leftImageCss,
    },
    slider: {
      alignItems: 'center',
      cursor: !hover && 'ew-resize',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: `${canvasWidth * sliderPosition - handleSize / 2}px`,
      position: 'absolute',
      top: 0,
      width: `${handleSize}px`,
    },
    line: {
      background: sliderLineColor,
      boxShadow:
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
      flex: '0 1 auto',
      height: '100%',
      width: `${sliderLineWidth}px`,
    },
    handleCustom: {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      height: 'auto',
      justifyContent: 'center',
      width: 'auto',
    },
    handleDefault: {
      alignItems: 'center',
      border: `${sliderLineWidth}px solid ${sliderLineColor}`,
      borderRadius: '100%',
      boxShadow:
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      height: `${handleSize}px`,
      justifyContent: 'center',
      width: `${handleSize}px`,
    },
    leftArrow: {
      border: `inset ${handleSize * 0.15}px rgba(0,0,0,0)`,
      borderRight: `${handleSize * 0.15}px solid ${sliderLineColor}`,
      height: '0px',
      marginLeft: `-${handleSize * 0.25}px`, // for IE11
      marginRight: `${handleSize * 0.25}px`,
      width: '0px',
    },
    rightArrow: {
      border: `inset ${handleSize * 0.15}px rgba(0,0,0,0)`,
      borderLeft: `${handleSize * 0.15}px solid ${sliderLineColor}`,
      height: '0px',
      marginRight: `-${handleSize * 0.25}px`, // for IE11
      width: '0px',
    },
    leftLabel: {
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      left: '5%',
      opacity: isSliding ? 0 : 1,
      padding: '10px 20px',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0,-50%)',
      transition: 'opacity 0.1s ease-out',
    },
    rightLabel: {
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      opacity: isSliding ? 0 : 1,
      padding: '10px 20px',
      position: 'absolute',
      right: '5%',
      top: '50%',
      transform: 'translate(0,-50%)',
      transition: 'opacity 0.1s ease-out',
    },
  };

  const allImagesLoaded = rightImgLoaded && leftImgLoaded;

  return (
    <React.Fragment>
      {skeleton && !allImagesLoaded && (
        <div style={{ ...styles.container }}>{skeleton}</div>
      )}

      <div
        style={{
          ...styles.container,
          display: allImagesLoaded ? 'block' : 'none',
        }}
        ref={containerRef}
        data-testid="container"
      >
        <img
          onLoad={() => setRightImgLoaded(true)}
          // onError={() => this.onError(rightImageRef, rightImage)}
          alt={rightImageAlt}
          data-testid="right-image"
          ref={rightImageRef}
          src={rightImage}
          style={styles.rightImage}
        />
        <img
          onLoad={() => setLeftImgLoaded(true)}
          // onError={() => this.onError(leftImageRef, leftImage)}
          alt={leftImageAlt}
          data-testid="left-image"
          ref={leftImageRef}
          src={leftImage}
          style={styles.leftImage}
        />
        <div style={styles.slider}>
          <div style={styles.line} />
          {handle ? (
            <div style={styles.handleCustom}>{handle}</div>
          ) : (
            <div style={styles.handleDefault}>
              <div style={styles.leftArrow} />
              <div style={styles.rightArrow} />
            </div>
          )}
          <div style={styles.line} />
        </div>
        {/* labels */}
        {leftImageLabel && <div style={styles.leftLabel}>{leftImageLabel}</div>}
        {rightImageLabel && (
          <div style={styles.rightLabel}>{rightImageLabel}</div>
        )}
      </div>
    </React.Fragment>
  );
}

ReactCompareImage.propTypes = propTypes;
ReactCompareImage.defaultProps = defaultProps;

export default ReactCompareImage;
