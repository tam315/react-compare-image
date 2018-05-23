import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

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

    getAndSetImagesSize();

    // set width correctly even if scroll bar was shown after initial rendering
    this.loadHandler = window.addEventListener('load', getAndSetImagesSize);
    // re-calculate images size whenever window resized
    this.resizeHandler = window.addEventListener('resize', getAndSetImagesSize);

    this.refs.container.addEventListener('mousedown', startSliding);
    this.refs.container.addEventListener('touchstart', startSliding);
    this.mouseupHandler = window.addEventListener('mouseup', finishSliding);
    this.thouchendHander = window.addEventListener('touchend', finishSliding);

    function getAndSetImagesSize() {
      // - get image size of under(right) image using temprary DOM
      // - calculate its aspect ratio
      // - set both image size statically like so:
      //     width  = container width
      //     height = width * (aspect rasio of under(right) image)
      const tempUnderImage = new Image();
      tempUnderImage.onload = function() {
        const containerWidth = that.refs.container.offsetWidth;
        const aspectRasio = this.height / this.width;

        that.setState({
          imageWidth: containerWidth - 1,
          imageHeight: containerWidth * aspectRasio,
        });
      };
      tempUnderImage.src = that.props.rightImage;
    }

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
    window.removeEventListener('load', this.loadHandler);
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('mouseup', this.mouseupHandler);
    window.removeEventListener('touchend', this.thouchendHander);
  }

  render() {
    const styles = {
      container: css({
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        ' .img-comp-over': {
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          width:
            this.state.imageWidth * this.state.sliderPositionPercentage + 'px',
        },
        ' img': {
          display: 'block',
          height: this.state.imageHeight,
          objectFit: 'cover',
          width: this.state.imageWidth,
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
        <div ref="underImage">
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
