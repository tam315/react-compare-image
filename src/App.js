import React, { Component } from 'react';
import './App.css';
import ReactCompareImage from './ReactCompareImage';
import './prism/prism.css';
import './prism/prism.js';

class App extends Component {
  state = {
    position: null,
    DynamicLeftImg: '/forest1.jpg',
    DynamicRightImg: '/forest2.jpg',
  };
  render() {
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
          <ReactCompareImage leftImage="/cat1.jpg" rightImage="/cat2.jpg" sliderLineColor="blue"/>
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
            leftImage={this.state.DynamicLeftImg}
            rightImage={this.state.DynamicRightImg}
            skeleton={<div>loading</div>}
          />
        </div>
        <br />
        <button
          onClick={() =>
            this.setState({ DynamicLeftImg: 'https://picsum.photos/300/450' })
          }
        >
          update left image
        </button>
        <button
          onClick={() =>
            this.setState({
              DynamicRightImg: 'https://picsum.photos/600/900',
            })
          }
        >
          update right image
        </button>
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
            onSliderPositionChange={position => this.setState({ position })}
          />
          <h5>Position: {this.state.position}</h5>
        </div>
      </div>
    );
  }
}

export default App;
