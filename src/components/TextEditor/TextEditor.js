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
import DeleteMod from '../DeleteMod/DeleteMod';

import {Editor,createEditorState} from 'medium-draft'
import 'medium-draft/lib/index.css'
import 'medium-draft/lib/basic.css';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import { convertToRaw } from 'draft-js';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import mediumDraftImporter from 'medium-draft/lib/importer';

import {updateUser, logoutUser, updateDisplay} from '../../ducks/reducer';

let note;
var change = false;



class TextEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      open: false,
      openMenu: false,
      editorState: createEditorState(),

      theme: this.props.theme, 
      checked: this.props.theme,
      checkedPomodoro: this.props.pomodoroToggle,
      checkedMg: this.props.checkedMg
    }

    this.onChange = (editorState) => {
      this.setState({ editorState: editorState });
      
     var html = mediumDraftExporter(editorState.getCurrentContent());
     this.setState({content: html})
  
    };

    document.body.addEventListener('click', this.clickBody)
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
            const {user} = res.data;
            this.props.updateUser(user)
        axios.get('/api/verify').then(res => {
          
          if (res.data === 'notactive'){
            const {user} = res.data;
            this.props.updateUser(user)
           this.props.history.push("/subscription");
          }

          else if (res.data === 'noaccount'){
            this.props.history.push("/plan")
          }

          else if (res.data === 'active') {

            const {user} = res.data;
            this.props.updateUser(user)

            axios.get('/api/notes').then( notes => {
              
            if (notes.data[0]){
             
            this.props.updateUser({notes: notes.data, displayNote: notes.data[0], theme: notes.data[0].theme, pomodoroToggle: notes.data[0].pomodoro})
           
            this.setState({
              title: this.props.notes[0].title,
              theme: this.props.theme,
              checked: this.props.theme,
              checkedPomodoro: this.props.pomodoroToggle,
              checkedMg: this.props.displayNote.memorygradient
              // content: this.props.notes[0].content
                     }
                    )
                  }
      
              else {
               this.setState({
                 title: this.props.displayNote.title,
                 theme: this.props.theme,
                 checked: this.props.theme,
                 checkedPomodoro: this.props.pomodoroToggle,
                 checkedMg: this.props.displayNote.memorygradient
                       })
                     }
                  })   
                }
            })
        } 
     })
        // this.refs.editor.focus();
  }
  
  logout(){
    axios.post('/api/logout').then( () => {
      this.props.logoutUser();
    })
  }

 
  
  componentDidUpdate = (prevProps) => {
    if (prevProps.displayNote.note_id !== this.props.displayNote.note_id){
       
    // const blocksFromHTML = convertFromHTML(String(nextProps.displayNote.content))
    // const contentState = ContentState.createFromBlockArray(blocksFromHTML)
    
    const html = this.props.displayNote.content
    const editorState = createEditorState(convertToRaw(mediumDraftImporter(html)))
    
    this.setState({
      title: this.props.displayNote.title,
      editorState: editorState,
      checkedMg: this.props.displayNote.memorygradient
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
    axios.put('/api/memorygradient', {checkedMg: this.state.checkedMg}).then(res => {
      console.log(res)
    })
  }

  handlePomodoroChange = (checkedPomodoro) => {
    
    this.setState({checkedPomodoro})
    this.props.updateUser({pomodoroToggle: checkedPomodoro})
    axios.put('/api/pomodorotoggle', {pomodoroToggle: checkedPomodoro}).then( res => {
      console.log('response: ', res)
    })
  }

  handleMgChange = (checkedMg) => {
    
    this.setState({checkedMg})

    axios.put('/api/memorygradient', {memorygradient: checkedMg, note_id: this.props.displayNote.note_id}).then( notes => {
      this.props.updateUser({notes: notes.data})
    })
  }

  

 
  render() {
    
    const { editorState } = this.state;
    
    var renderDelete = () => {
      if(this.props.deleteToggle){
        return (
          <DeleteMod {...this.props}/>
        )
      }
      
    }

    return (
      
      <div className = 'frame'>
      {renderDelete()}
      <Motion style={{x: spring(this.state.open ? -20 : 0),
      y: spring(this.state.open ? 95 : 75), z: spring(this.state.open ? 90 : 65)}}>

       {({x, y, z}) => 
         
      <div className='editorFrame' style={{marginLeft: x + 'vw', backgroundColor: this.props.theme ? 'black' : 'white', color: this.props.theme ? 'white' : 'black', filter: this.props.deleteToggle ? 'blur(3px)' : 'blur(0px)'}}>

        <Sidebar/>

         <div className='editor'>
        
             <input type="text" 
             className="titlebox"
            style={{width: z + 'vw'}}
            onChange={this.handleChangeTitle}
            onKeyDown={(e) => this.handleKeyDownTitle(e)}
            value={this.state.title}
           />

      <Motion style={{m: spring(this.state.openMenu ? 1 : 0), n: spring(this.state.openMenu ? 0 : 1), o: spring(this.state.openMenu ? -6 : 10) }}>

      
       {({m, n, o}) => 

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

                 
                <li onClick={() => this.logout()}> 
                  <Link to ='/'> 
                  <i className="fas fa-sign-out-alt"/> &nbsp; Logout </Link></li> 
               
            </div>
            
            <div className='notemenu' style={{opacity: n, right: o + 'vh', backgroundColor: this.props.theme ? '#3d3d3d' : '#f7f5f5'}}>

               <li onClick={() => this.props.updateUser({deleteToggle: true})}> <i className="far fa-trash-alt"/>  
                </li>
              
                <li> 
                <i className="fas fa-brain" style={{color: this.props.theme ? '#8B8B8B' : '#3d3d3d'}}/> &nbsp;&thinsp;
                    <Switch
                        checked={this.state.checkedMg}
                        onChange={this.handleMgChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={14}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={10}
                        width={24}
              
                        className="react-switch-memory"
                        id="material-switch"
                      />
                  </li> 
            </div>
        </div>

       }
       </Motion>

            <img className='profilepic' alt="profilepic" src={this.props.picture}
            onClick={() => this.setState({openMenu: !this.state.openMenu})}/>
            
            <Editor ref="editor" editorState={editorState} onChange={this.onChange} />
    
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