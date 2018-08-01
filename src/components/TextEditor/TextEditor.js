import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {updateUser, logoutUser} from '../../ducks/reducer';
import trash from '../../assets/trash.svg';
let note;

class TextEditor extends Component {
  constructor(){
    super()
    this.state = {
      title: ''
    }
  }
 
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

  componentWillReceiveProps(nextProps){
    this.setState({title: nextProps.displayNote.title})
  }
 

  logout(){
    axios.post('/api/logout').then( () => {
      this.props.logoutUser();
    })
  }

  handleKeyDown(e){
    if (e.keyCode === 13){
      axios.post('/api/note', {title: e.target.value, note_id: this.props.displayNote.note_id}).then( res => {
        this.props.updateUser({notes: res.data})
        
      })
      
    }
  }

  deleteNote(){
    
    let id = this.props.displayNote.note_id
    axios.delete(`/api/note/${id}`).then( res => {
      this.props.updateUser({notes: res.data})
    })
  }
  
  render() {
    let image = this.props.picture
    if (this.props.user){
      image = this.props.picture
    }

    if (this.props.displayNote.content){
      note = this.props.displayNote;
    }
    else {
      note = '';
    }


    return (
      <div className='editorFrame'>

        <Sidebar/>

         <div className='editor'>
         
            <input type="text" 
            onKeyDown={e => this.handleKeyDown(e)}
            defaultValue={this.state.title}/>

            <img className='trash' src={trash} alt='trash'
            onClick={() => this.deleteNote()}/>
       
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