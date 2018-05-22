import React, { Component } from 'react';
import ReactCompareImage from './ReactCompareImage';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ maxWidth:'100%', background: 'lightgray' }}><ReactCompareImage leftImage="/cat1.jpg" rightImage="/cat2.jpg" /></div>
        <div style={{ maxWidth:'500px', background: 'lightgray' }}><ReactCompareImage  leftImage="/forest1.jpg" rightImage="/forest2.jpg" /></div>
      </div>
    );
  }
}

export default App;
