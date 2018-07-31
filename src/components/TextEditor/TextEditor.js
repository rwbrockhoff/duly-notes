import React, { Component } from 'react'
import './TextEditor.css';



export default class TextEditor extends Component {
  render() {
    return (
      <div className='editor'>
          <input placeholder='Title'/>
          <textarea placeholder='Begin typing...'/>
      </div>
    )
  }
}
