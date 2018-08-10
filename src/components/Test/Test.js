import React, { Component } from 'react'
import MediumEditor from 'medium-editor';

var EditorsMed = new MediumEditor('.editable')
var array = [];
array.push(EditorsMed)

export default class EditorMed extends Component {
  render() {
    return (
      <div>
        {array}
      </div>
    )
  }
}

