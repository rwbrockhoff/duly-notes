import React, { Component } from 'react'
import './Pomodoro.css'
import { connect } from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import axios from 'axios';

var pomodoroTimer = 0;
var myVisualTimer;

class Pomodoro extends Component {
    constructor(){
        super()

        this.state = {
            sessioncomplete: false,
            sessionCount: 0,
            sessionTimer: 0,
            break: false,
            breakTimer: 0
        }

    }

componentDidMount(){
    axios.get('/api/getpomodoro').then(usersPomodoros => {
        console.log(usersPomodoros.data)
    })
}

  startPomodoro = () => {
    var timer = 0;
    this.setState({sessionTimer: 0})
	

    myVisualTimer = setInterval( () => {
        timer += 2; 
        this.setState({sessionTimer: timer})
    }, 2000)

    var myStopper = setInterval( () => {
        if (this.state.sessionTimer === 8){
            this.setState({sessionCount: this.state.sessionCount + 1, sessionTimer: 0})
            clearInterval(myVisualTimer)
            axios.put('/api/addpomodoro', {sessionCount: 1})
            //axios.put
                //{sessionCount: }
        }
    }, 2000)

  }
  
  stopPomodoro = () => {
    this.setState({sessioncomplete: false, sessionTimer: 0})
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
function mapStateToProps(state){
    return {
        ...this.props, ...state
    }
}

export default connect(mapStateToProps, {updateUser} )(Pomodoro)