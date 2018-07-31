import React, { Component } from 'react'
import './Landing.css';
import {Link} from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
      <div className='landing'>
        
        <div className='headerbar'>
            <div className='logo'>note</div>
            <nav>
                <Link to='/texteditor'><li>Text Editor</li></Link>
                <li>features</li>
                <li>pricing</li>
                <li>contact</li>
                <li className='login'>login</li>
            </nav>
        </div>

        <div className='intro'>
        <h1> get a better grasp</h1>
        <h5> on how you take notes</h5>
        <button>remember more </button>

        </div>
        

      </div>
    )
  }
}
