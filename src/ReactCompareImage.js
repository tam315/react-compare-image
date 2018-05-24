import React from 'react';
import PropTypes from 'prop-types';
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
    };
  }

  componentDidMount() {
    const that = this;

    // Image size set as follows.
    //
    // 1. set under image size like so:
    //     width  = 100% of container width
    //     height = auto
    //
    // 2. set over imaze size like so:
    //     width  = 100% of container width
    //     height = under image's height
    //              (protrudes is hidden by css 'object-fit: hidden')
    function setImagesSize() {
      that.setState({
        imageWidth: that.refs.container.getBoundingClientRect().width,
      });
    };

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
      container: {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
      },
      underImage: {
        display: 'block',
        height: 'auto', // Respect the aspect ratio
        width: '100%',
      },
      overImage: {
        clip: `rect(auto, ${this.state.imageWidth * this.state.sliderPositionPercentage}px, auto, auto)`,
        display: 'block',
        height: '100%', // fit to the height of under image
        objectFit: 'cover', // protrudes is hidden
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: '100%',
      },
      slider: {
        backgroundColor: 'white',
        cursor: 'ew-resize',
        height: '100%',
        left:this.state.imageWidth * this.state.sliderPositionPercentage -this.props.sliderWidth / 2 +          'px',
        position: 'absolute',
        top: 0,
        width: `${this.props.sliderWidth}px`,
        zIndex: 9,
      },
    };

    return (
      <div style={styles.container} ref="container">
        <img
          alt="left"
          className="img-comp-under"
          ref="underImage"
          src={this.props.rightImage}
          style={styles.underImage}
        />
        <img
          alt="right"
          className="img-comp-over"
          src={this.props.leftImage}
          style={styles.overImage}
        />
        <div className="img-comp-slider" style={styles.slider} />
      </div>
    );
  }
}

ReactCompareImage.propTypes = propTypes;
ReactCompareImage.defaultProps = defaultProps;

export default ReactCompareImage;
