import React, { Component } from "react";
import { Link } from 'react-router-dom';
export default class NavbarMain extends Component {

  render() {
    return (
    <div className='navbarMain'>
    <div className='navleft'>
      <div className="logo">
        <img src="https://i.ibb.co/wpQGhGG/Conosole-log-logo.png"/>
      </div>
    </div>
    <div className="navRight">
    <div className="courses">
        <div>
          <Link onClick={this.props.handleCourse} id="Web Dev" to='/panel'>Web Dev</Link>
        </div>
        <div>
          <Link onClick={this.props.handleCourse} id="UX/UI" to='/panel'>UX/UI</Link>
        </div>
        <div>
          <Link onClick={this.props.handleCourse} id="Data" to='/panel'>Data</Link>
        </div>
      </div>
      </div>
    </div>
    )}
}
