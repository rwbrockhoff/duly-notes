import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';

import'medium-editor/dist/css/medium-editor.css';
import'medium-editor/dist/css/themes/default.css';

import Editor from 'react-medium-editor';
import {updateUser, logoutUser, updateDisplay} from '../../ducks/reducer';
import trash from '../../assets/trash.svg';
let note;
var change = false;


class TextEditor extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      content: '',
      open: false
    }

    document.body.onkeydown = (e => {
    
      if (e.keyCode === 13){
         this.setState({content: e.target.innerHTML})
         
         const {title, content} = this.state

         axios.put('/api/note', {title: title, content: content, note_id: this.props.displayNote.note_id})
         .then(res => {
           
          axios.get('/api/notes').then( notes => {
        
            if (notes.data[0]){
            this.props.updateUser({notes: notes.data})}})



            // this.props.updateDisplay({displayNote: res.data[0]})
         })



        // this.setState({open: !this.state.open})
      }
    }) 
   
  }
 
  componentDidMount(){
    
    axios.get('/api/user-data').then(res => {
      if (res.data.user){

      const {user} = res.data;
      this.props.updateUser(user)

      axios.get('/api/notes').then( notes => {
        
      if (notes.data[0]){
      this.props.updateUser({notes: notes.data, displayNote: notes.data[0]})
     
      // this.props.updateDisplay({displayName: notes.data[0]})
      // this.setState({
      //   title: this.props.notes[0].title,
      //   content: this.props.notes[0].content
      //          }
      //         )
            }
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

    console.log('props cont', nextProps.displayNote.content)
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
  
  handleChange = (text, medium) => {
    this.setState({content: text})
  }




  // handleSave = (e) => {
  //   console.log('going in', this.state.content)

  //   if (e.keyCode === 13 || 17 || 190){
  //     const {title, content} = this.state
  //     axios.put('/api/note', {title: title, content: content, note_id: this.props.displayNote.note_id})
  //   }
  // }

    
      // axios.put('/api/note', {title: title, content: content, note_id: this.props.displayNote.note_id}).then( res => {
        
      //   this.props.updateUser({notes: res.data})
      //   this.props.updateDisplay({displayNote: res.data[0]})
      //   console.log('after props in change')
      //   this.setState({title: res.data[0].title})
      //  })

        
    
 
  
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
      
      // <Motion style={{x: spring(this.state.open ? -20 : 0),
      // y: spring(this.state.open ? 80 : 65)}}>
      //  {({x, y}) => 
      // style={{marginLeft: x + 'vw'}}
      <div className='editorFrame' >

        <Sidebar/>

         <div className='editor'>
         {/* style={{width: y + 'vw', marginLeft: 0}} */}
             <input type="text" 
            onChange={this.handleChangeTitle}
            onKeyDown={(e) => this.handleKeyDownTitle(e)}
            value={this.state.title}/>

            <img className='trash' src={trash} alt='trash'
            onClick={() => this.deleteNote()}/>
       
            <Link to ='/'><img className='profilepic' alt="profilepic" src={image}
            onClick={() => this.logout()}/></Link>
            
            <Editor text={this.state.content}
            onChange={this.handleChange}
           
            />
         
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
export default connect(mapStateToProps, {updateUser, logoutUser, updateDisplay})(TextEditor)