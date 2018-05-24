import React, { Component } from 'react';
import ReactCompareImage from './ReactCompareImage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="demo-page">
        <h1>
          <a href="https://github.com/junkboy0315/react-compare-image">
            React Compare Image
          </a>
        </h1>

        <p>200px width (cat1.jpg | cat2.jpg)</p>
        <div style={{ maxWidth: '200px' }}>
          <ReactCompareImage leftImage="/cat1.jpg" rightImage="/cat2.jpg" />
        </div>

        <p>300px width (forest1.jpg | forest2.jpg)</p>
        <div style={{ maxWidth: '300px' }}>
          <ReactCompareImage
            leftImage="/forest1.jpg"
            rightImage="/forest2.jpg"
          />
        </div>

        <p>500px width (cat1.jpg | forest2.jpg)</p>
        <div style={{ maxWidth: '500px' }}>
          <ReactCompareImage leftImage="/cat1.jpg" rightImage="/forest2.jpg" />
        </div>

        <p>100% width (forest1.jpg | cat2.jpg)</p>
        <div style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          <ReactCompareImage leftImage="/forest1.jpg" rightImage="/cat2.jpg" />
        </div>

        <p>100% width (scene1.jpg | scene2.jpg)</p>
        <div style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          <ReactCompareImage leftImage="/scene1.jpg" rightImage="/scene2.jpg" />
        </div>

        <p>100% width (scene2.jpg | scene1.jpg)</p>
        <div style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
          <ReactCompareImage leftImage="/scene2.jpg" rightImage="/scene1.jpg" />
        </div>
      </div>
    );
  }
}

export default App;
