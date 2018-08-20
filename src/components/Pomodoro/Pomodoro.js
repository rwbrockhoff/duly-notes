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
            sessionTimer: 8,
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
    var timer = 8;
    this.setState({sessionTimer: 8})
	

    myVisualTimer = setInterval( () => {
        timer -= 2; 
        this.setState({sessionTimer: timer})
    }, 2000)

    setInterval( () => {
        if (this.state.sessionTimer === 0){
            this.setState({sessionCount: this.state.sessionCount + 1, sessionTimer: 8, start: true})
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
    this.setState({sessioncomplete: false, start: true, sessionTimer: 8})
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

        <div className='timer' onClick={() => this.handleClick()}>
        <i className="fas fa-stopwatch"/> &nbsp; &nbsp;
        <p> {this.state.sessionTimer}  seconds </p>
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