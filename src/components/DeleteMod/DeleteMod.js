import React, { Component } from 'react'
import './DeleteMod.css'
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import axios from 'axios';

class DeleteMod extends Component {
    constructor(){
        super()

    }

    deleteNote = () => {
      
        var id = this.props.displayNote.note_id
        axios.delete(`/api/note/${id}`).then( res => {
          
          this.props.updateUser({notes: res.data, deleteToggle: false})
          if (res.data[0]){
            this.props.updateUser({displayNote: res.data[0], deleteToggle: false})
          this.setState({title: this.props.notes[0].title,
                content: this.props.notes[0].content })
          }
          
        })
      }

    handleClose = () => {
        this.props.updateUser({deleteToggle: false})
    }

  render() {
    
    return (
        <div className='deletecheckframe'>
        <div className='cancel'><i className="fas fa-times-circle" onClick={this.handleClose}/></div>
            <div className='deletecheck'>
              <h2> Are you sure? </h2>
              <button onClick={this.deleteNote}> <i className="far fa-trash-alt"/> &thinsp; Delete </button>
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

export default connect(mapStateToProps, {updateUser})(DeleteMod)


