import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import {convertFromHTML, ContentState, EditorState} from 'draft-js';
import Switch from 'react-switch';
import Pomodoro from '../Pomodoro/Pomodoro';

import {Editor,createEditorState} from 'medium-draft'
import 'medium-draft/lib/index.css'
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

import { convertToRaw } from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import mediumDraftImporter from 'medium-draft/lib/importer';
import 'medium-draft/lib/basic.css';

import {updateUser, logoutUser, updateDisplay} from '../../ducks/reducer';

let note;
var change = false;
var displayPomodoro;


class TextEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      open: false,
      openMenu: false,
      openNoteMenu: false,
      editorState: createEditorState(),
      theme: this.props.theme, 
      checked: this.props.theme,
      checkedPomodoro: this.props.pomodoroToggle
    }

    this.onChange = (editorState) => {
      this.setState({ editorState: editorState });
      
     var html = mediumDraftExporter(editorState.getCurrentContent());
     this.setState({content: html})
      
    };

    this.clickBody = () => {
      this.setState({openNoteMenu: false, openMenu: false })
    }
    document.body.addEventListener('click', this.clickBody)
    document.body.onkeydown = (e => {
      
    if (e.keyCode === 17){
        this.setState({open: !this.state.open, content: e.target.innerHTML})
      }
  if (e.target.innerHTML){
    
      if (e.keyCode === 13){
        
        
        // var html = stateToHTML(this.state.editorState.getCurrentContent())
        // this.setState({content: html})

        var html = mediumDraftExporter(this.state.editorState.getCurrentContent());
       
     this.setState({content: html})
         
         const {title, content} = this.state
       
         axios.put('/api/note', {title: title, content: content, note_id: this.props.displayNote.note_id})
         .then(res => {
           
          axios.get('/api/notes').then( notes => {
           
            if (notes.data[0]){
              
            this.props.updateUser({notes: notes.data})}})

         })
      }
      
        else if(e.keyCode === 40){
          this.props.updateUser({pomodoroToggle: true})
        }
        else if (e.keyCode === 38){
          this.props.updateUser({pomodoroToggle: false})
        }
      
    
    }
    }) 
    
  }


 
  componentDidMount(){
    

    //see if we have a user
    axios.get('/api/user-data').then(res => {
      if (res.data.user){
    //see if they are active
        axios.get('/api/verify').then(res => {
          
          if (res.data === 'notactive'){
          console.log('not active!')
           this.props.history.push("/subscription");
          }
          else if (res.data === 'noaccount'){

            this.props.history.push("/plan")
          }
        })
      
     
        
      const {user} = res.data;
      
      this.props.updateUser(user)
      
      axios.get('/api/notes').then( notes => {
        console.log('getnotesnotes', notes)
      if (notes.data[0]){
       
      this.props.updateUser({notes: notes.data, displayNote: notes.data[0], theme: notes.data[0].theme, pomodoroToggle: notes.data[0].pomodoro})
     

      // this.props.updateDisplay({displayName: notes.data[0]})
      this.setState({
        title: this.props.notes[0].title,
        theme: this.props.theme,
        checked: this.props.theme,
        checkedPomodoro: this.props.pomodoroToggle
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

  // componentWillReceiveProps = (nextProps) => {
    
  //   if (nextProps.displayNote.note_id !== this.props.displayNote.note_id){
     
  //   // const blocksFromHTML = convertFromHTML(String(nextProps.displayNote.content))
  //   // const contentState = ContentState.createFromBlockArray(blocksFromHTML)
    
  //   const html = nextProps.displayNote.content
  //   const editorState = createEditorState(convertToRaw(mediumDraftImporter(html)))
    
  //   this.setState({
  //     title: nextProps.displayNote.title,
  //     editorState: editorState
  //   })
  //   var html2 = mediumDraftExporter(editorState.getCurrentContent());
    
  // }
  // }

  componentDidUpdate = (prevProps) => {
    if (prevProps.displayNote.note_id !== this.props.displayNote.note_id){
       
    // const blocksFromHTML = convertFromHTML(String(nextProps.displayNote.content))
    // const contentState = ContentState.createFromBlockArray(blocksFromHTML)
    
    const html = this.props.displayNote.content
    const editorState = createEditorState(convertToRaw(mediumDraftImporter(html)))
    
    this.setState({
      title: this.props.displayNote.title,
      editorState: editorState
    })
    var html2 = mediumDraftExporter(editorState.getCurrentContent());
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

  handleThemeChange = (checked) => {
    this.setState({ checked })
    this.props.updateUser({theme: checked})
    axios.put('/api/theme', {theme: this.state.checked}).then(res => {
      console.log(res)
    })
  }

  handlePomodoroChange = (checkedPomodoro) => {
    console.log(checkedPomodoro)
    this.setState({checkedPomodoro})
    this.props.updateUser({pomodoroToggle: checkedPomodoro})
    axios.put('/api/pomodorotoggle', {pomodoroToggle: checkedPomodoro}).then( res => {
      console.log(res)
    })
  }

 
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
      <div className = 'frame'>
      <Motion style={{x: spring(this.state.open ? -20 : 0),
      y: spring(this.state.open ? 95 : 75), z: spring(this.state.open ? 90 : 65)}}>

       {({x, y, z}) => 
      

      <div className='editorFrame' style={{marginLeft: x + 'vw', backgroundColor: this.props.theme ? 'black' : 'white', color: this.props.theme ? 'white' : 'black'}}>
        {displayPomodoro}
        <Sidebar/>

         <div className='editor'>
        
             <input type="text" 
             className="titlebox"
            style={{width: z + 'vw'}}
            onChange={this.handleChangeTitle}
            onKeyDown={(e) => this.handleKeyDownTitle(e)}
            value={this.state.title}
           />

      <Motion style={{m: spring(this.state.openMenu ? 1 : 0), n: spring(this.state.openNoteMenu ? 1 : 0) }}>

      
       {({m, n}) => 

        <div>
            <div className='usermenu' style={{opacity: m}}>
                <li > <b> Hey, {this.props.given_name} </b></li>
                <li> 
                <Link to="/subscription">
                  <i className="fas fa-credit-card"/> &nbsp; Subscription </Link></li>

                  <li> 
                    <i className="fas fa-moon"/> &nbsp; Dark Theme: &nbsp;
                    <Switch
                        checked={this.state.checked}
                        onChange={this.handleThemeChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={10}
                        width={24}
                        className="react-switch"
                        id="material-switch"
                      />
                  </li> 

                   <li> 
                    <i className="fas fa-moon"/> &nbsp; Pomodoro &nbsp;
                    <Switch
                        checked={this.state.checkedPomodoro}
                        onChange={this.handlePomodoroChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={10}
                        width={24}
                        className="react-switch"
                        id="material-switch"
                      />
                  </li> 
                
                <li onClick={() => this.logout()}> 
                  <Link to ='/'> 
                  <i className="fas fa-sign-out-alt"/> &nbsp; Logout </Link></li> 
               
            </div>

            <div className='notemenu' style={{opacity: n}}>
               <li onClick={() => this.deleteNote()}> <i className="far fa-trash-alt"/>  
               &thinsp; Delete Note </li>
            </div>
        </div>

       }
       </Motion>

            <div className='menu'>
            <i className="fas fa-ellipsis-h"
            onClick={() => this.setState({openNoteMenu: !this.state.openNoteMenu, openMenu: false})}
            />
            </div>

            
            <img className='profilepic' alt="profilepic" src={image}
           
            onClick={() => this.setState({openMenu: !this.state.openMenu, openNoteMenu: false})}
            />
            
            <Editor
              ref="editor"
              editorState={editorState}
              onChange={this.onChange} />
         
         </div>
         
      </div> }
     </Motion>
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