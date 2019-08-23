import React, { Component } from 'react';
import './App.css';
import './prism/prism';
import './prism/prism.css';
import ReactCompareImage from './ReactCompareImage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      DynamicLeftImg: '/forest1.jpg',
      DynamicRightImg: '/forest2.jpg',
    };
  }

  render() {
    const { DynamicLeftImg, DynamicRightImg, position } = this.state;

    return (
      <div className="demo-page">
        <h1>
          <a href="https://github.com/junkboy0315/react-compare-image">
            React Compare Image
          </a>
        </h1>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '200px' }}>
  <ReactCompareImage
    leftImage="/cat1.jpg"
    rightImage="/cat2.jpg"
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '200px' }}>
          <ReactCompareImage leftImage="/cat1.jpg" rightImage="/cat2.jpg" />
        </div>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '300px' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/forest2.jpg"
    skeleton={<div>loading</div>}
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '300px' }}>
          <ReactCompareImage
            leftImage={DynamicLeftImg}
            rightImage={DynamicRightImg}
            skeleton={<div>loading</div>}
          />
        </div>
        <br />
        <button
          onClick={() =>
            this.setState({ DynamicLeftImg: 'https://picsum.photos/300/450' })
          }
          type="button"
        >
          update left image
        </button>
        <button
          onClick={() =>
            this.setState({
              DynamicRightImg: 'https://picsum.photos/600/900',
            })
          }
          type="button"
        >
          update right image
        </button>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '500px' }}>
  <ReactCompareImage
    leftImage="/cat1.jpg"
    leftImageLabel="Before"
    rightImage="/cat2.jpg"
    rightImageLabel="After"
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage
            leftImage="/cat1.jpg"
            leftImageLabel="Before"
            rightImage="/cat2.jpg"
            rightImageLabel="After"
          />
        </div>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '500px' }}>
  <ReactCompareImage
    leftImage="/cat1.jpg"
    rightImage="/forest2.jpg"
    hover
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage
            leftImage="/cat1.jpg"
            rightImage="/forest2.jpg"
            hover
          />
        </div>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '100%' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/cat2.jpg"
    sliderLineWidth={5}
    handleSize={80}
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '100%' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/cat2.jpg"
            sliderLineWidth={5}
            handleSize={80}
          />
        </div>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '500px' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/cat2.jpg"
    leftImageCss={{ filter: 'brightness(50%) blur(10px)' }}
    rightImageCss={{ filter: 'sepia(100%)' }}
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/cat2.jpg"
            leftImageCss={{ filter: 'brightness(50%) blur(10px)' }}
            rightImageCss={{ filter: 'sepia(100%)' }}
          />
        </div>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '500px' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/cat2.jpg"
    onSliderPositionChange={position => this.setState({ position })}
  />
  <h5>Position: {this.state.position}</h5>
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/cat2.jpg"
            onSliderPositionChange={pos => this.setState({ position: pos })}
          />
          <h5>Position: {position}</h5>
        </div>

        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '500px' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/cat2.jpg"
    handle={<button className="customHandle" />}
  />
</div>
          `}
          </code>
        </pre>
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/cat2.jpg"
            handle={<button className="customHandle" type="button" />}
          />
        </div>
      </div>
    );
  }
}

export default App;
