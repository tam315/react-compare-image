import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const propTypes = {
  leftImage: PropTypes.string.isRequired,
  rightImage: PropTypes.string.isRequired,
  sliderWidth: PropTypes.number,
}

const defaultProps = {
  sliderWidth: 4,
}

class ReactCompareImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderPositionPercentage: 0.5, // 0 to 1
      imageWidth: null,
      imageHeight: null,
    };
  }

  componentDidMount() {
    const that = this;

    // Set the image width to be the same as the container width.
    // By default, the width of the container is 100% to fit its parent.
    // At this point, the height of images are unknown.
    const containerWidth = this.refs.container.offsetWidth;
    this.setState({
      imageWidth: containerWidth,
    });

    // Once images loaded, get the height of under image.
    // The height of the two images is set equal by the aspect ratio of the under(left) image.
    // This also applies to the height of the container.
    window.addEventListener('load', function() {
      const imageHeight = that.refs.underImage.offsetHeight;
      that.setState({ imageHeight });
    });

    this.refs.container.addEventListener('mousedown', startSliding);
    this.refs.container.addEventListener('touchstart', startSliding);
    window.addEventListener('mouseup', finishSliding);
    window.addEventListener('touchend', finishSliding);

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
      if (pos < 0) pos = 0;
      if (pos > that.state.imageWidth) pos = that.state.imageWidth;

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