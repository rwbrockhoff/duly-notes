import React, { Component } from 'react'
import './SideNote.css';

export default class SideNote extends Component {
  render(props) {
      console.log('note', this.props.note)
      console.log('index', this.props.index)
    return (
      <div className='container'>
        <p className='title'> {this.props.note.title}</p>
        <p className='preview'>{this.props.note.content.split("").splice(0, 75)}...</p>
      </div>
    )
  }
}
