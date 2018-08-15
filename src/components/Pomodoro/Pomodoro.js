import React, { Component } from 'react'
import './Pomodoro.css'
import TimeMe from 'timeme.js';

var pomodoroTimer = 0;
var myVisualTimer;

export default class Pomodoro extends Component {
    constructor(){
        super()

        this.state = {
            sessioncomplete: false,
            sessionTimer: 0,
            break: false,
            sessionCount: 0,
        }

    }

  startPomodoro = () => {
    var timer = 0;
    this.setState({sessionTimer: 0})

    TimeMe.initialize({
      currentPageName: "pomodoro" // our pomdooro timer
    //   idleTimeoutInSeconds: -1 // disables idle
    });		

    myVisualTimer = setInterval( () => {
        timer += 2; 
        this.setState({sessionTimer: timer})
    }, 2000)

    var myStopper = setInterval( () => {
        if (this.state.sessionTimer === 8){
            clearInterval(myVisualTimer)
            console.log('made it here')
        }
    }, 2000)

    TimeMe.callAfterTimeElapsedInSeconds(8, () => { 
      this.setState({sessioncomplete: true, sessionCount: this.state.sessionCount + 1})
      TimeMe.resetRecordedPageTime('pomodoro');
    });
  }
  
  stopPomodoro = () => {
    this.setState({sessioncomplete: false, sessionTimer: 0})
    TimeMe.resetRecordedPageTime('pomodoro');
    clearInterval(myVisualTimer)
  }

  

  render() {
    return (
      <div className='pomodoroframe'>

        <button onClick={() => this.startPomodoro()}>Start</button> 
        <button onClick={() => this.stopPomodoro()}>Stop</button> 
        <p> Made it to 7 Seconds. Sessions: {this.state.sessionCount}. Timer: {this.state.sessionTimer} </p>
      </div>
    )
  }
}
