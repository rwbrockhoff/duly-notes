import React, { Component } from 'react'
import './Sidebar.css';
import {connect} from 'react-redux';
import {displayNote} from '../../ducks/reducer';
import SideNote from '../SideNote/SideNote';
import add from '../../assets/add.svg';
let listOutNotes = null;


class Sidebar extends Component {

  createNote(){
    axios.post('/api/post')
  }


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
                <img src={add} alt='new' onClick={() => this.createNote()}/>
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
