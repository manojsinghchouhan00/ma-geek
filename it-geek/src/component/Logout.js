import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Logout extends Component {
    handleLogout= ()=>{
        console.log("loutertgh")
        localStorage.clear();
        window.location.pathname="/login";
    }
  render() {
    return (
      <div>
        <button onClick={this.handleLogout}>Logout( )</button>
      </div>
    )
  }
}
