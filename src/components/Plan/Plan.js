import React, { Component } from 'react'
import './Plan.css';
import axios from 'axios';

export default class Pricing extends Component {

  componentDidMount(){
    axios.get('/api/createcustomer');
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