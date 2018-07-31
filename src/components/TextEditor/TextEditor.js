import React, { Component } from 'react'
import './TextEditor.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {updateUser, logoutUser} from '../../ducks/reducer';


class TextEditor extends Component {
  constructor(){
    super()

    };
  
 
  componentDidMount(){
    axios.get('/api/user-data').then(res => {
      this.props.updateUser(res.data.user)
    })
    // axios.get('/api/auth/checkuser', {user: res.data.user})
  }

  logout(){
    axios.post('/api/logout').then( () => {
      this.props.logoutUser();
    })
  }
  
  render() {
    let image = this.props.picture
    if (this.props.user){
      image = this.props.picture
    }


    return (
      <div className='editorFrame'>

        <Sidebar/>

         <div className='editor'>
            <input placeholder='Title'/>
            <Link to ='/'><img className='profilepic' alt="profilepic" src={image}
            onClick={() => this.logout()}/></Link>
            <textarea placeholder='Begin typing...'/>
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
export default connect(mapStateToProps, {updateUser, logoutUser})(TextEditor)