import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import {convertFromHTML, ContentState, EditorState} from 'draft-js';
import'medium-editor/dist/css/medium-editor.css';
// import'medium-editor/dist/css/themes/default.css';
// import Editor from 'react-medium-editor';


import {Editor,createEditorState} from 'medium-draft'
import 'medium-draft/lib/index.css'
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';


import {updateUser, logoutUser, updateDisplay} from '../../ducks/reducer';
import trash from '../../assets/trash.svg';
let note;
var change = false;


class TextEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      open: false,
      editorState: createEditorState()
    }

    this.onChange = (editorState) => {
      this.setState({ editorState });
      
     var html = stateToHTML(this.state.editorState.getCurrentContent())
     this.setState({content: html})
      // var contentState = stateFromHTML(html)
      // editorState: EditorState.createWithContent(contentState)
    };

    document.body.onkeydown = (e => {
      console.log('jam', e.target.innerHTML)
    if (e.keyCode === 17){
        this.setState({open: !this.state.open, content: e.target.innerHTML})
      }
  if (e.target.innerHTML){
    
      if (e.keyCode === 13){
        
        var html = stateToHTML(this.state.editorState.getCurrentContent())
        this.setState({content: html})
         
         const {title, content} = this.state
       
         axios.put('/api/note', {title: title, content: content, note_id: this.props.displayNote.note_id})
         .then(res => {
           
          axios.get('/api/notes').then( notes => {
           
            if (notes.data[0]){
              console.log(notes.data)
            this.props.updateUser({notes: notes.data})}})

         })
      }}
    }) 
  }


 
  componentDidMount(){
    //see if we have a user
    axios.get('/api/user-data').then(res => {
      if (res.data.user){
    //see if they are active
        axios.get('/api/verify').then(res => {
          
          if (res.data === 'notactive'){
   
           this.props.history.push("/subscription");
          }
          else if (res.data === 'noaccount'){

            this.props.history.push("/plan")
          }
        })
      
     
        
      const {user} = res.data;
      this.props.updateUser(user)

      axios.get('/api/notes').then( notes => {
        
      if (notes.data[0]){
       
      this.props.updateUser({notes: notes.data, displayNote: notes.data[0]})
     
      // this.props.updateDisplay({displayName: notes.data[0]})
      this.setState({
        title: this.props.notes[0].title,
        // content: this.props.notes[0].content
               }
              )
            }
        })
   } 

   else {
    //user is not in our DB.
    
      this.props.history.push("/")
    
    // axios.post('/api/auth/register')
  }

  }).catch(error => {
      console.log('CDM/Axios/GET:', error);
    })
  
    // this.refs.editor.focus();
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
   // var contentState = stateFromHTML(html)
      // editorState: EditorState.createWithContent(contentState)

      // let contentState = stateFromHTML('<p>Hello</p>');
      // return {
      //   editorState: EditorState.createWithContent(contentState)

      // const blocksFromHTML = convertFromHTML(html);
      // const content = ContentState.createFromBlockArray(
      //   blocksFromHTML.contentBlocks,
      //   blocksFromHTML.entityMap
      // );

    //   const blocksFromHTML = convertFromHTML(props.content);
    //   const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    //   editorState = EditorState.createWithContent(contentState);
    // }
  componentWillReceiveProps = (nextProps) => {
    
    if (nextProps.displayNote.note_id !== this.props.displayNote.note_id){
      console.log('cashew', String(nextProps.displayNote.content))
    const blocksFromHTML = convertFromHTML(String(nextProps.displayNote.content))
   
    const contentState = ContentState.createFromBlockArray(blocksFromHTML)
    this.setState({
      title: nextProps.displayNote.title,
      editorState: EditorState.createWithContent(contentState)
    })
  }
  }

  handleChangeTitle = (e) => {
    this.setState({title: e.target.value})
  }

  handleKeyDownTitle(e){
    
    if (e.keyCode === 13){
      this.setState({title: e.target.value})
     
      const {title} = this.state
   
      axios.put('/api/note/title', {title: title, note_id: this.props.displayNote.note_id}).then( res => {
       
        this.props.updateDisplay({displayNote: res.data[0]})
        axios.get('/api/notes').then( notes => {
           
          if (notes.data[0]){
          this.props.updateUser({notes: notes.data})}})
          
      })
    }
  }
  
  // handleChange = (text, medium) => {
    
  //   this.setState({content: text})
  // }


  render() {
    const { editorState } = this.state;
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
      
      <Motion style={{x: spring(this.state.open ? -20 : 0),
      y: spring(this.state.open ? 95 : 75), z: spring(this.state.open ? 90 : 65)}}>

       {({x, y, z}) => 
      

      <div className='editorFrame' style={{marginLeft: x + 'vw'}}>

        <Sidebar/>

         <div className='editor'>
        
             <input type="text" 
             className="titlebox"
            style={{width: z + 'vw'}}
            onChange={this.handleChangeTitle}
            onKeyDown={(e) => this.handleKeyDownTitle(e)}
            value={this.state.title}
           />

            <img className='trash' src={trash} alt='trash'
            onClick={() => this.deleteNote()}/>
       
            <Link to ='/'><img className='profilepic' alt="profilepic" src={image}
            onClick={() => this.logout()}/></Link>
            
            {/* <Editor text={this.props.displayNote.content}
            onChange={this.handleChange}
            style={{width: y + 'vw'}}/> */}

            <Editor
              ref="editor"
              editorState={editorState}
              onChange={this.onChange}
               />
         
         </div>
         
      </div> }
     </Motion>
    )
  }
}

function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}
export default connect(mapStateToProps, {updateUser, logoutUser, updateDisplay})(TextEditor)