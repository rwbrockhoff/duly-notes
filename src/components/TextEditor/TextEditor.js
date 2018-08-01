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
      title: '',
      content: ''
    }
  }
 
  componentDidMount(){
    
    axios.get('/api/user-data').then(res => {
      if (res.data.user){

      const {user} = res.data;
      this.props.updateUser(user)

      axios.get('/api/notes').then( notes => {
       
      if (notes.data[0]){
      this.props.updateUser({notes: notes.data})
      this.setState({
        title: this.props.notes[0].title,
        content: this.props.notes[0].content
               })}
        })
   } 

   else {
    //user is not in our DB.
    axios.post('/api/auth/register')
  }

  }).catch(error => {
      console.log('CDM/Axios/GET:', error);
    })}
  
  componentWillReceiveProps(nextProps){
    this.setState({
      title: nextProps.displayNote.title,
      content: nextProps.displayNote.content
    })
  }
 
  logout(){
    axios.post('/api/logout').then( () => {
      this.props.logoutUser();
    })
  }

  deleteNote(){

    let id = this.props.displayNote.note_id
    axios.delete(`/api/note/${id}`).then( res => {
      
      this.props.updateUser({notes: res.data})
      if (res.data[0]){
      this.setState({title: this.props.notes[0].title,
            content: this.props.notes[0].content })
      }
      
    })
  }

  handleChangeTitle(e){
    this.setState({title: e.target.value})
  }

  handleKeyDownTitle(e){
    if (e.keyCode === 13){
      const {content} = this.state
      axios.put('/api/note', {title: e.target.value, content: content, note_id: this.props.displayNote.note_id}).then( res => {
        this.props.updateUser({notes: res.data})
        this.setState({title: res.data[0].title})
      })
      
    }
  }

  handleChangeContent(e){
    this.setState({content: e.target.value})
  }

  handleKeyDownContent(e){
    if (e.keyCode === 13){
      const {title} = this.state
      axios.put('/api/note', {title: title, content: e.target.value, note_id: this.props.displayNote.note_id}).then( res => {
        this.props.updateUser({notes: res.data})
        this.setState({content: res.data[0].content})
      })
      
    }
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
            onChange={e => this.handleChangeTitle(e)}
            onKeyDown={(e) => this.handleKeyDownTitle(e)}
            value={this.state.title}/>

            <img className='trash' src={trash} alt='trash'
            onClick={() => this.deleteNote()}/>
       
            <Link to ='/'><img className='profilepic' alt="profilepic" src={image}
            onClick={() => this.logout()}/></Link>

            <textarea 
            onChange={e => this.handleChangeContent(e)}
            onKeyDown={e => this.handleKeyDownContent(e)}
            value={this.state.content} />
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