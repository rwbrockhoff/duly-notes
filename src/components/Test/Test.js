import React, { Component } from 'react'
import {Editor,createEditorState} from 'medium-draft'
import 'medium-draft/lib/index.css'
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';


export default class EditorNew extends Component {
  constructor(props){
    super(props)

    this.state = {
      editorState: createEditorState(), // for empty content
    };
 
    this.onChange = (editorState) => {
      this.setState({ editorState });
      
     
      // var html = stateToHTML(this.state.editorState.getCurrentContent())
      // var contentState = stateFromHTML(html)
    };

    // this.onKey = (editorState) => {
    //   console.log(editorState)
    // }

    this.savingState = (editorState) => {

    }
   
  }

  componentDidMount() {
    this.refs.editor.focus();
  }
 


  render() {
    const { editorState } = this.state;
    return (
      <div>
            <Editor
              ref="editor"
              editorState={editorState}
              onChange={this.onChange}
              onKeyDown={this.onKey} />

              <button onClick={this.savingState}>Save</button>
      </div>
    )
  }
}
