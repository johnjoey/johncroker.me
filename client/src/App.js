import React, { Component } from 'react';
import './assets/scss/App.scss';
import Portfolio from './components/portfolio/Portfolio';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Contact from './components/contact/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hero/>
        <About/>
        <Portfolio/>
        <Contact/>
      </div>
    );
  }
}

export default App;
