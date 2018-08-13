import React, { Component } from 'react'
import './LandingFeatures.css';
import typeDown from '../../assets/typeDown.svg';
import'medium-editor/dist/css/medium-editor.css';
import'medium-editor/dist/css/themes/default.css';



export default class LandingFeatures extends Component {
  register(){
    let {REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID
  } = process.env;

  let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

  window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
}

    render() {
      

    return (
      <div className ='LandingFeatures'>

        <div className='intro'>
        <h1> get a better grasp</h1>
        <h5> on how you take notes</h5>
        <button onClick={this.register}>sign up </button>
        </div>

        <div className='features'>
            <h1> Features </h1>

            <div className='grid'>
           <div className='gridItem'>
           <i className="fas fa-outdent"/>
            <h2>Inline Editing</h2>
            <p>No more toolbar clutter. Focus more on writing--less on clicking.</p>
            </div>
            
             <div className='gridItem'>
             <i className="fab fa-markdown"/>
            <h2>Markdown</h2>
            <p>The markdown you're used to, updating as you type. </p>
            </div>

             <div className='gridItem'>
             <i className="far fa-list-alt"/>
            <h2>Minimalist Design</h2>
            <p>80% of the screen is what you're working on. </p>
            </div>

             <div className='gridItem'>
             <i className="fas fa-brain"/>
            <h2>Memory Gradient</h2>
            <p>Keep track of what you need to review.</p>
            </div>

            <div className='gridItem'>
            <i className="fas fa-moon"/>
            <h2>Dark Theme</h2>
            <p>One click and you're in a different world. Imagine that.</p>
            </div>


            </div>

        
        </div>
           

            <footer> 
              <h2>note</h2> &nbsp;&nbsp;<h2>|</h2> &nbsp; www.note.com
            </footer>
      </div>
    )
  }
}
