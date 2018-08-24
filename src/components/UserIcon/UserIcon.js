import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Switch from 'react-switch';
import axios from 'axios'
import {connect} from 'react-redux'
import './UserIcon.css'
import {updateUser, logoutUser} from '../../ducks/reducer'

class UserIcon extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked: this.props.theme,
            openMenu: false
        }
    }
    handleThemeChange = (checked) => {
        this.setState({ checked })
        this.props.updateUser({theme: checked})
        axios.put('/api/theme', {theme: this.state.checked}).then(res => {
          console.log(res)
        })
      }

      logout(){
        axios.post('/api/logout').then( () => {
          this.props.logoutUser();
        })
      }

  render() {
      
    return (
        <div>
        <img className='profilepic' alt="profilepic" src={this.props.picture}
            onClick={() => this.setState({openMenu: !this.state.openMenu})}/>

        <div className='usermenu' style={{display: this.state.openMenu ? 'flex' : 'none'}}>
                <li > <b> Hey, {this.props.given_name} </b></li>
                <li> 
                <Link to="/subscription">
                  <i className="fas fa-credit-card"/> &nbsp; Subscription </Link></li>

                  <li> 
                    <i className="fas fa-moon"/> &nbsp; Dark Theme: &nbsp;
                    <Switch
                        checked={this.state.checked}
                        onChange={this.handleThemeChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={10}
                        width={24}
                        className="react-switch"
                        id="material-switch"
                      />
                  </li> 

                 
                <li onClick={() => this.logout()}> 
                  <Link to ='/'> 
                  <i className="fas fa-sign-out-alt"/> &nbsp; Logout </Link></li> 
               
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

  export default connect(mapStateToProps, {updateUser, logoutUser})(UserIcon)