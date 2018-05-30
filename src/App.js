import React, { Component } from 'react';
import './App.css';
import ReactCompareImage from './ReactCompareImage';
import './prism/prism.css';
import './prism/prism.js';

class App extends Component {
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
          <ReactCompareImage leftImage="/cat1.jpg" rightImage="/cat2.jpg" />
        </div>
        <pre>
          <code className="language-jsx">
            {`
<div style={{ maxWidth: '300px' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/forest2.jpg"
    hover
  />
</div>
          `}
          </code>
        </pre>{' '}
        <div style={{ maxWidth: '300px' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/forest2.jpg"
            hover
          />
        </div>
        <pre>
          <code className="language-jsx">
            {' '}
            {`
<div style={{ maxWidth: '500px' }}>
  <ReactCompareImage
    leftImage="/cat1.jpg"
    rightImage="/forest2.jpg"
  />
</div>
          `}
          </code>
        </pre>{' '}
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage leftImage="/cat1.jpg" rightImage="/forest2.jpg" />
        </div>
        <pre>
          <code className="language-jsx">
            {' '}
            {`
<div style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
  <ReactCompareImage
    leftImage="/forest1.jpg"
    rightImage="/cat2.jpg"
    sliderLineWidth={5}
    handleSize={80}
  />
</div>
          `}
          </code>
        </pre>{' '}
        <div style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/cat2.jpg"
            sliderLineWidth={5}
            handleSize={80}
          />
        </div>
      </div>
    );
  }
}

export default App;
