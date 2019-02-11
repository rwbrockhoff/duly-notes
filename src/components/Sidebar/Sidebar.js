import React, { Component } from 'react'
import './Sidebar.css';
import { connect } from 'react-redux';
import { displayNote, updateUser } from '../../ducks/reducer';
import SideNote from '../SideNote/SideNote';
import axios from 'axios';
import Pomodoro from '../Pomodoro/Pomodoro';
import { Motion, spring } from 'react-motion';

let listOutNotes = null;

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      open: true,
      syncToggle: false
    }
  }

  createNote() {
    axios.post('/api/note', { title: 'Title', content: 'Shall we start?' }).then(res => {
      this.props.updateUser({ notes: res.data })

    })
  }

  localSave() {
    this.setState({ syncToggle: !this.state.syncToggle })
    this.props.saveNote()
    this.setState({ syncToggle: !this.state.syncToggle })
  }

  getColor = memory => {
    if (memory === 0) {
      return '#4D76FF'
    }
    else if (memory === 1) {
      return '#C34CFF'
    }
    else if (memory === 2) {
      return '#FF4CEA'
    }
    else {
      return '#FF4C4C'
    }
  }

  render() {
    if (!this.props.notes) {
      listOutNotes = null;
    }
    else {

      listOutNotes = this.props.notes.map((e, i) => {
        let memoryGradient;

        if (e.memorygradient === true) {
          memoryGradient = this.getColor(e.memory)
        } else {
          memoryGradient = this.props.theme ? '#8B8B8B' : '#3d3d3d'
        }

        return (
          <SideNote key={i} note={e} index={i} color={memoryGradient} />
        )
      })

    }

    return (

      <div className='sidebar' style={{ backgroundColor: this.props.theme ? '#3d3d3d' : '#f7f5f5' }}>

        <Motion style={{ w: spring(this.props.pomodoroToggle ? 0 : -18) }}>
          {({ w }) =>
            <Pomodoro style={{ marginTop: w + 'vh' }} />
          }
        </Motion>
        <div className="iconbar">
          <div className='addnote'><i className="far fa-sticky-note" onClick={() => this.createNote()} /></div>

          <div className='pomodoro'>
            <i className="fas fa-stopwatch" onClick={() => this.props.updateUser({ pomodoroToggle: !this.props.pomodoroToggle })} />
          </div>

          <Motion style={{ team: spring(this.state.syncToggle ? 360 : 0, { damping: 100 }) }}>
            {({ team }) =>

              <div className='sync'>
                <i className="fas fa-sync"
                  style={{
                    transform: `rotate(${team}deg)`
                  }}
                  onClick={() => this.localSave()} />
              </div>
            }
          </Motion>
        </div>

        <div className="noteContainer" backgroundcolor='blue'>
          {listOutNotes}
        </div>

      </div>

    )
  }

}

function mapStateToProps(state) {
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps, { displayNote, updateUser })(Sidebar)