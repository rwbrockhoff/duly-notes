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
      const {user} = res.data;
      this.props.updateUser(user)
    }).catch(error => {
      console.log('CDM/Axios/GET:', error);
    })
    
    axios.get('/api/auth/checkuser').then( res => {
      if (!res.data[0]){
        //user is not in our DB.
        axios.post('/api/auth/register')
      }
      else {
        axios.get('/api/notes')
      }
    })
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