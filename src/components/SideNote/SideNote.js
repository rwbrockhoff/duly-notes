import React, { Component } from 'react'
import './SideNote.css';
import {connect} from 'react-redux';
import {displayNote} from '../../ducks/reducer';


class SideNote extends Component {
  render(props) {
      
    return (
      <div className='container'
      style={{backgroundColor: this.props.theme ? '#3D3D3D' : '#f7f5f5', color: this.props.theme ? 'white' : 'black'}}
      onClick={() => 
        this.props.displayNote({displayNote: this.props.note})
      }
      >
      <div className='memorybar' style={{backgroundColor: this.props.color}}></div>
        <p className='title'> {this.props.note.title}</p>
        {/* <p className='preview'>{this.props.note.content.split("").splice(0, 75)}...</p> */}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps, {displayNote})(SideNote)
