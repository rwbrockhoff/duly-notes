import React, { Component } from 'react';
import './App.css';
import './Main/Main.css'
import Landing from './components/Landing/Landing';

class App extends Component {
  render(props) {
    return (
      <div className="App">
        <Landing {...props}/>
      </div>
    );
  }
}

export default App;