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

  componentDidMount = () => {
    const containerElement = this.containerRef;

    this.setImagesSize();

    // Re-set images size when container size is changed
    new ResizeSensor(containerElement, () => {
      this.setImagesSize();
    });

    containerElement.addEventListener('mousedown', this.startSliding);
    containerElement.addEventListener('touchstart', this.startSliding);

    window.addEventListener('mouseup', this.finishSliding);
    window.addEventListener('touchend', this.finishSliding);
  };

  componentWillUnmount = () => {
    window.removeEventListener('mouseup', this.finishSliding);
    window.removeEventListener('touchend', this.finishSliding);
  };

  setImagesSize = () => {
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
    this.setState({
      imageWidth: this.underImageRef.getBoundingClientRect().width,
    });
  };

  startSliding = e => {
    // Prevent default behavior other than mobile scrolling
    if (!('touches' in e)) {
      e.preventDefault();
    }

    // Slide the image even if you just click or tap (not drag)
    this.handleSliding(e);

    window.addEventListener('mousemove', this.handleSliding);
    window.addEventListener('touchmove', this.handleSliding);
  };

  finishSliding = () => {
    window.removeEventListener('mousemove', this.handleSliding);
    window.removeEventListener('touchmove', this.handleSliding);
  };

  handleSliding = event => {
    const e = event || window.event;

    // Calc Cursor Position from the left edge of the viewport
    const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;

    // Calc Cursor Position from the left edge of the window (consider any page scrolling)
    const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;

    // Calc Cursor Position from the left edge of the image
    const imagePosition = this.underImageRef.getBoundingClientRect();
    let pos = cursorXfromWindow - imagePosition.left;

    // Set minimum and maximum values ​​to prevent the slider from overflowing
    const minPos = 0 + this.props.sliderWidth / 2;
    const maxPos = this.state.imageWidth - this.props.sliderWidth / 2;

    if (pos < minPos) pos = minPos;
    if (pos > maxPos) pos = maxPos;

    this.setState({
      sliderPositionPercentage: pos / this.state.imageWidth,
    });
  };

  render = () => {
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
        clip: `rect(auto, ${this.state.imageWidth *
          this.state.sliderPositionPercentage}px, auto, auto)`,
        display: 'block',
        height: '100%', // fit to the height of under image
        objectFit: 'cover', // protrudes is hidden
        position: 'absolute',
        top: 0,
        width: '100%',
      },
      slider: {
        backgroundColor: 'white',
        cursor: 'ew-resize',
        height: '100%',
        left:
          this.state.imageWidth * this.state.sliderPositionPercentage -
          this.props.sliderWidth / 2 +
          'px',
        position: 'absolute',
        top: 0,
        width: `${this.props.sliderWidth}px`,
        zIndex: 9,
      },
    };

    return (
      <div
        style={styles.container}
        ref={ref => {
          this.containerRef = ref;
        }}
      >
        <img
          alt="left"
          className="img-comp-under"
          ref={ref => {
            this.underImageRef = ref;
          }}
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
  };
}

ReactCompareImage.propTypes = propTypes;
ReactCompareImage.defaultProps = defaultProps;

export default ReactCompareImage;
