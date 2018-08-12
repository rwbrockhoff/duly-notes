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
           <i class="fas fa-burn"/>
            <h2>Hotkeys</h2>
            <p>Built in hotkeys. Do more with fewer buttons.</p>
            </div>
            
             <div className='gridItem'>
             <i class="fab fa-markdown"/>
            <h2>Markdown</h2>
            <p>The markdown you're used to, updating as you type. </p>
            </div>

             <div className='gridItem'>
             <i class="fas fa-drafting-compass"/>
            <h2>Minimalist Design</h2>
            <p>80% of the screen is what you're working on. </p>
            </div>

             <div className='gridItem'>
             <i class="fas fa-brain"/>
            <h2>Memory Gradient</h2>
            <p>Keep track of what you need to review.</p>
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
