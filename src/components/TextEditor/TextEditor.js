import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {updateUser, logoutUser} from '../../ducks/reducer';


class TextEditor extends Component {

 
  componentDidMount(){
    axios.get('/api/user-data').then(res => {
      const {user} = res.data;
      this.props.updateUser(user)
    }).catch(error => {
      console.log('CDM/Axios/GET:', error);
    })
    
    axios.get('/api/auth/checkuser').then( res => {
      if (!res.data[0]){
        //user is not in our DB.
        axios.post('/api/auth/register')
      }
      else {
        axios.get('/api/notes').then( notes => {
          this.props.updateUser({notes: notes.data})
        })
      }
    })
  }

  componentDidUpdate(){
    axios.get('/api/notes').then( notes => {
      this.props.updateUser({notes: notes.data})
    })
  }

  logout(){
    axios.post('/api/logout').then( () => {
      this.props.logoutUser();
    })
  }

  handleKeyDown(e){
    if (e.keyCode === 13){
      axios.post('/api/note', {title: e.target.value, note_id: this.props.displayNote.note_id})
    }
  }
  
  render() {
    let image = this.props.picture
    if (this.props.user){
      image = this.props.picture
    }

    let note;
    
    if (this.props.displayNote){
      note = this.props.displayNote;
    }
    else {
      note = '';
    }


    return (
      <div className='editorFrame'>

        <Sidebar/>

         <div className='editor'>
            <input placeholder='Title' defaultValue={note.title}
            onKeyDown={e => this.handleKeyDown(e)}/>
            <Link to ='/'><img className='profilepic' alt="profilepic" src={image}
            onClick={() => this.logout()}/></Link>
            <textarea placeholder='Begin typing...'
            value={note.content} />
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
export default connect(mapStateToProps, {updateUser, logoutUser})(TextEditor)