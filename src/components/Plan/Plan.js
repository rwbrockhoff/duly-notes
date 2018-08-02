import React, { Component } from 'react'
import './Plan.css';
import axios from 'axios';

export default class Pricing extends Component {

  componentDidMount(){
    axios.post('/api/createcustomer').then( (res) => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <div className='Pricing'>
        <h1> Plan </h1>
        
        </div>
      </div>
    )
  }
}
