import React, { Component } from 'react'
import "./Subscription.css";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

export default class Subscription extends Component {

componentDidMount(){
     //do we have a new user, or already a created account
     axios.get('/api/verify').then(res => {
          console.log(res.data)
        if (res.data === 'noaccount'){
             this.props.history.push("/plan");
        } 
      })
}
  render() {
    return (
      <div className='subcontainer'>

            <div className='welcomebar'>
                <h1> Welcome back, Ryan. </h1>
                <h3> We've been together for 4 months. Can you believe it? That's true love, baby. </h3>
            </div>

            <div className='userinfo'>
                <h1> Subscription Info: </h1>

                    <div className='infobox'>

                    <div className ='card'>
                        <h2> Card: ****4242 </h2>
                        <button> Update Card </button>
                    </div>

                        <h2> Status: Active </h2>
                        <h2> Payment Due: 5 days </h2>
                        <button> Cancel </button>
                     </div>
            </div>
      </div>
    )
  }
}
