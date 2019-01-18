import React, { Component } from 'react'
import './LandingFeatures.css';
import headerImage from '../../assets/takingNotes.svg'
import swoop from '../../assets/swoop.svg'

export default class LandingFeatures extends Component {
  register() {
    let { REACT_APP_AUTH0_DOMAIN,
      REACT_APP_AUTH0_CLIENT_ID
    } = process.env;

    let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

    window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
  }

  render() {


    return (
      <React.Fragment>
        <img src={swoop} className="swoop" />
        <div className='intro flex-center column'>
          <img src={headerImage} alt='computerdemo' />
          <h1> du more with duly</h1>
          <h5>productive notes for productive people </h5>
          <button onClick={this.register}>sign up </button>
        </div>

        <div className='features flex column'>
          <div className='grid'>
            <div className='grid-item flex-center column'>
              <i className="fas fa-outdent" />
              <h2>Inline Editing</h2>
              <p>No more toolbar clutter. Focus more on writing.</p>
            </div>

            <div className='grid-item flex-center column'>
              <i className="fab fa-markdown" />
              <h2>Markdown</h2>
              <p>The markdown you're used to, updating as you type. </p>
            </div>

            <div className='grid-item flex-center column'>
              <i className="fas fa-stopwatch" />
              <h2>Pomodoro</h2>
              <p>One click away from starting  a pomodoro. Stay on task. </p>
            </div>

            <div className='grid-item flex-center column'>
              <i className="fas fa-brain" />
              <h2>Memory Gradient</h2>
              <p>The science of learning has a color scheme. </p>
            </div>

            <div className='grid-item flex-center column'>
              <i className="fas fa-moon" />
              <h2>Dark Theme</h2>
              <p>One click and you're in a different world. </p>
            </div>


          </div>


        </div>


        <footer className="flex-center">
          <h2>duly notes</h2> &nbsp;&nbsp;<h2>|</h2> &nbsp; www.dulynotes.com
            </footer>
      </React.Fragment>
    )
  }
}
