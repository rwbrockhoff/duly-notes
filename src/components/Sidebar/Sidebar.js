import React, { Component } from 'react'
import './Sidebar.css';
import {connect} from 'react-redux';
import {displayNote} from '../../ducks/reducer';
import SideNote from '../SideNote/SideNote';
let listOutNotes = null;


class Sidebar extends Component {
  
  render() {
    if (!this.props.notes){
      listOutNotes = null;
      console.log('nothing here, mate');
    }
    else {

      listOutNotes = this.props.notes.map((e,i) => {
        return (
        <SideNote note={e} index={i} />
        )
    })
        
  }
    
    return (
      <div className='sidebar'>
            <div className="iconbar">
                <p>Icons</p>
            </div>

            <div className="noteContainer">
             {listOutNotes}
            </div>
            
      </div>
    )
  }

  }

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps, {displayNote})(Sidebar)
