import React, { Component } from 'react'
import './Pomodoro.css'
import { connect } from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import axios from 'axios';


var myVisualTimer;
var totalToday = 0;
var totalWeek = 0;

class Pomodoro extends Component {
    constructor(props){
        super(props)

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
        if (totalToday === 0){
        var total = usersPomodoros.data.length

        usersPomodoros.data.map(e => {

            if (e.date === 0){
                totalToday +=1
                totalWeek +=1
            }
            else if (e.date <= 7){
                totalWeek +=1
            }
            
        })
        
            this.props.updateUser({pomodoro: {today: totalToday, week: totalWeek, total: total}})
         }
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

    axios.put('/api/addpomodoro', {sessionCount: 1}).then( () => {

        axios.get('/api/getpomodoro').then(usersPomodoros => {
            
            var total = usersPomodoros.data.length

            totalToday += 1
            totalWeek += 1
            
            this.props.updateUser({pomodoro: {today: totalToday, week: totalWeek, total: total}})
        })
            
        })
    }}, 2000)

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
        <p> Today: {this.props.pomodoro.today} </p>
        <p> Week: {this.props.pomodoro.week} </p>
        <p> Total: {this.props.pomodoro.total} </p> 
        <p> Timer: {this.state.sessionTimer} </p>
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