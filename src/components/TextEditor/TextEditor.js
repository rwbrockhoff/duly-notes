import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';


export default class TextEditor extends Component {
  render() {
    return (
      <div className='editorFrame'>

        <Sidebar/>

         <div className='editor'>
            <input placeholder='Title'/>
            <textarea placeholder='Begin typing...'/>
         </div>
      </div>
    )
  }
}
