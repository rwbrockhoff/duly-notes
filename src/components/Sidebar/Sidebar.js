import React, { Component } from 'react'
import './Sidebar.css';
import {connect} from 'react-redux';
import {displayNote, updateUser} from '../../ducks/reducer';
import SideNote from '../SideNote/SideNote';
import axios from 'axios';
import add from '../../assets/add.svg';
let listOutNotes = null;


class Sidebar extends Component {

  createNote(){
    axios.post('/api/note', {title: 'Title', content: 'Shall we start?'}).then(res => { 
      this.props.updateUser({notes: res.data})

    })
  }


  render() {
    if (!this.props.notes){
      listOutNotes = null;
      
    }
    else {

      listOutNotes = this.props.notes.map((e,i) => {
        return (
        <SideNote key ={i} note={e} index={i} />
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

export default connect(mapStateToProps, {displayNote, updateUser})(Sidebar)
