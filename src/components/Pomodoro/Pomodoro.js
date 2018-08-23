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
            start: true,
            sessioncomplete: false,
            sessionCount: 0,
            sessionMinutes: 20,
            sessionTimer: 1200,
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
    var timer = 1200;
    this.setState({start: false})
    
    myVisualTimer = setInterval( () => {
        timer -= 1; 

        if (timer%60===0){
            this.setState({
                sessionMinutes: Math.floor(timer/60),
                sessionTimer: timer
            })
        }
        
    }, 1000)

    var myStopper = setInterval( () => {
        if (this.state.sessionTimer === 0){
            this.setState({sessionCount: this.state.sessionCount + 1, sessionTimer: 1200, sessionMinutes: 20, start: true})
            clearInterval(myVisualTimer)
           
    axios.put('/api/addpomodoro', {sessionCount: 1}).then( () => {

        axios.get('/api/getpomodoro').then(usersPomodoros => {
            
            var total = usersPomodoros.data.length

            totalToday += 1
            totalWeek += 1
            
            this.props.updateUser({pomodoro: {today: totalToday, week: totalWeek, total: total}})

            alert("Pomodoro Complete! 💪🏽")
        })
            
        })

    }}, 1000)

  }
  
  stopPomodoro = () => {
    this.setState({sessioncomplete: false, start: true, sessionTimer: 1200, sessionMinutes: 20})
    clearInterval(myVisualTimer)
  }

  handleClick = () => {
      
    this.setState({start: !this.state.start})
        this.state.start ? this.startPomodoro() : this.stopPomodoro()
    this.setState({start: !this.state.start})
  }

  render() {
     
    return (
      <div className='pomodoroframe' style={{marginTop: this.props.style.marginTop}}>

        <div className='timer' style={{color: this.state.start ? '' : '#23CE6B'}}onClick={() => this.handleClick()}>
        <i className="fas fa-stopwatch" /> &nbsp; &nbsp;
        <p> {this.state.sessionMinutes} min</p>
        </div>
        
        <div className='stats'>
        <span><p> Today: </p> {this.props.pomodoro.today}</span>
       <span> <p> Week: </p>{this.props.pomodoro.week} </span>
        </div>
       
       
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