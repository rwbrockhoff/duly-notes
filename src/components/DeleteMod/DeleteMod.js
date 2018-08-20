import React, { Component } from 'react'
import './DeleteMod.css'
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import axios from 'axios';

class DeleteMod extends Component {
    
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
    var deleteOrCancelMod = () => {
        if(this.props.location.pathname === '/subscription'){
        return (
            <div className='deletecheckframe'>
        <div className='cancelonsub'><i className="fas fa-times-circle" onClick={() => this.props.close()}/></div>
            <div className='cancelcheck'>
              <h2> Are you sure you want to cancel? </h2>
              <p style={{marginTop: '-1vh'}}> You'll still have access until the next billing cycle. You're welcome back anytime. No hard feelings. </p>
              <button style={{marginTop: '1vh'}}onClick={() => this.props.cancelSub() }> Cancel Subscription </button>
            </div>
        </div>
        )
    }
    else {
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
  return (
      <div>
      {deleteOrCancelMod()}
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


