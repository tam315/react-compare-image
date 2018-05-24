import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { ResizeSensor } from 'css-element-queries';

const propTypes = {
  leftImage: PropTypes.string.isRequired,
  rightImage: PropTypes.string.isRequired,
  sliderWidth: PropTypes.number,
};

const defaultProps = {
  sliderWidth: 4,
};

class ReactCompareImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderPositionPercentage: 0.5, // 0 to 1
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  componentDidMount() {
    const that = this;

    // Image size set as follows.
    // note that 'imageHeight' state affects only over image.
    //
    // 1. set under image size like so:
    //     width  = container width
    //     height = auto
    //
    // 2. set over imaze size like so:
    //     width  = container width
    //     height = under image's height
    //              (protrudes is hidden by css 'object-fit: hidden')
    function setImagesSize() {
      that.setState({
        imageWidth: that.refs.container.getBoundingClientRect().width,
        imageHeight: that.refs.underImage.getBoundingClientRect().height,
      });
    }

    setImagesSize();

    const containerElement = this.refs.container;

    // Re-set images size when container size is changed
    new ResizeSensor(containerElement, () => {
      setImagesSize();
    });

    containerElement.addEventListener('mousedown', startSliding);
    containerElement.addEventListener('touchstart', startSliding);

    this.mouseupHandler = window.addEventListener('mouseup', finishSliding);
    this.thouchendHander = window.addEventListener('touchend', finishSliding);

    function startSliding(e) {
      // Prevent default behavior other than mobile scrolling
      if (!('touches' in e)) {
        e.preventDefault();
      }

      // Slide the image even if you just click or tap (not drag)
      handleSliding(e);

      window.addEventListener('mousemove', handleSliding);
      window.addEventListener('touchmove', handleSliding);
    }

    function finishSliding() {
      window.removeEventListener('mousemove', handleSliding);
      window.removeEventListener('touchmove', handleSliding);
    }

    function handleSliding(e) {
      let pos = getCursorPosFromImageLeft(e);

      const minPos = 0 + that.props.sliderWidth / 2;
      const maxPos = that.state.imageWidth - that.props.sliderWidth / 2;

      if (pos < minPos) pos = minPos;
      if (pos > maxPos) pos = maxPos;

      that.setState({
        sliderPositionPercentage: pos / that.state.imageWidth,
      });
    }

    function getCursorPosFromImageLeft(event) {
      const e = event || window.event;

      // Distance from the left edge of the viewport
      const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;

      // Distance from the left edge of the window (consider any page scrolling)
      const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;

      // Distance from the left edge of the image
      const imagePosition = that.refs.underImage.getBoundingClientRect();
      let cursorXfromImage = cursorXfromWindow - imagePosition.left;

      return cursorXfromImage;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.mouseupHandler);
    window.removeEventListener('touchend', this.thouchendHander);
  }

  render() {
    const styles = {
      container: css({
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        ' .img-comp-under': {
          ' img': {
            display: 'block',
            height: 'auto', // Respect the aspect ratio
            width: this.state.imageWidth,
          },
        },
        ' .img-comp-over': {
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          width:
            this.state.imageWidth * this.state.sliderPositionPercentage + 'px',
          ' img': {
            display: 'block',
            height: this.state.imageHeight, // fit to the height of under image
            objectFit: 'cover', // protrudes is hidden
            width: this.state.imageWidth,
          },
        },

        ' .img-comp-slider': {
          backgroundColor: 'white',
          cursor: 'ew-resize',
          height: this.state.imageHeight,
          left:
            this.state.imageWidth * this.state.sliderPositionPercentage -
            this.props.sliderWidth / 2 +
            'px',
          position: 'absolute',
          top: 0,
          width: `${this.props.sliderWidth}px`,
          zIndex: 9,
        },
      }),
    };

    return (
      <div className={styles.container} ref="container">
        <div className="img-comp-under" ref="underImage">
          <img src={this.props.rightImage} alt="left" />
        </div>

        <div className="img-comp-over">
          <img src={this.props.leftImage} alt="right" />
        </div>

        <div className="img-comp-slider" />
      </div>
    );
  }
}

ReactCompareImage.propTypes = propTypes;
ReactCompareImage.defaultProps = defaultProps;

export default ReactCompareImage;
