import React from 'react';
import PropTypes from 'prop-types';
import { ResizeSensor } from 'css-element-queries';

const propTypes = {
  leftImage: PropTypes.string.isRequired,
  rightImage: PropTypes.string.isRequired,
  sliderLineWidth: PropTypes.number,
  handleSize: PropTypes.number,
};

const defaultProps = {
  sliderLineWidth: 2,
  handleSize: 40,
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
    const minPos = 0 + this.props.sliderLineWidth / 2;
    const maxPos = this.state.imageWidth - this.props.sliderLineWidth / 2;

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
        overflow: 'hidden',
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
        alignItems: 'center',
        cursor: 'ew-resize',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        left:
          this.state.imageWidth * this.state.sliderPositionPercentage -
          this.props.handleSize / 2 +
          'px',
        position: 'absolute',
        top: 0,
        width: `${this.props.handleSize}px`,
      },
      line: {
        background: 'white',
        boxShadow:
          '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        flex: '0 1 auto',
        height: '100%',
        width: `${this.props.sliderLineWidth}px`,
      },
      handle: {
        alignItems: 'center',
        border: `${this.props.sliderLineWidth}px solid white`,
        borderRadius: '100%',
        boxShadow:
          '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 0 auto',
        height: `${this.props.handleSize}px`,
        justifyContent: 'center',
        width: `${this.props.handleSize}px`,
      },
      leftArrow: {
        border: `inset ${this.props.handleSize * 0.15}px rgba(0,0,0,0)`,
        borderRight: `${this.props.handleSize * 0.15}px solid white`,
        height: '0px',
        marginLeft: `-${this.props.handleSize * 0.25}px`, // for IE11
        marginRight: `${this.props.handleSize * 0.25}px`,
        width: '0px',
      },
      rightArrow: {
        border: `inset ${this.props.handleSize * 0.15}px rgba(0,0,0,0)`,
        borderLeft: `${this.props.handleSize * 0.15}px solid white`,
        height: '0px',
        marginRight: `-${this.props.handleSize * 0.25}px`, // for IE11
        width: '0px',
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
        <div className="img-comp-slider" style={styles.slider}>
          <div style={styles.line} />
          <div style={styles.handle}>
            <div style={styles.leftArrow} />
            <div style={styles.rightArrow} />
          </div>
          <div style={styles.line} />
        </div>
      </div>
    );
  };
}

ReactCompareImage.propTypes = propTypes;
ReactCompareImage.defaultProps = defaultProps;

export default ReactCompareImage;
