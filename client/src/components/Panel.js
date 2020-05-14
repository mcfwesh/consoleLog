import React, { Component } from "react";
import { Link } from 'react-router-dom';
export default class Panel extends Component {

  render() {
    return (
    <div className='overlay-panel'>
    <div className='overlay-panel-cards'>
    <div className='overlay-panel-card'>
      <div className="panel-img">
      <div class="squarePanel">
        <span></span>
        <span></span>
        <span></span>
        <img src="https://i.ibb.co/N1KGxHZ/476759.png" alt="users"/>
      </div>
    </div>
    </div>
    <div className='overlay-panel-card'>
    <div className="panel-img">
    <div class="squarePanel">
        <span></span>
        <span></span>
        <span></span>
        <img src="https://i.ibb.co/H4G5fyF/1584961.png" alt="users"/>
      </div>
      </div>
    </div>
    <div className='overlay-panel-card'>
    <div className="panel-img">
    <div class="squarePanel">
        <span></span>
        <span></span>
        <span></span>
        <img src="https://i.ibb.co/0VCQ43y/1355461.png" alt="users"/>
      </div>
      </div>
    </div>
    <div className='overlay-panel-card'>
    <div className="panel-img">
    <div class="squarePanel">
        <span></span>
        <span></span>
        <span></span>
        <img src="https://i.ibb.co/wsb3zGB/2247603.png" alt="users"/>
      </div>
      </div>
    </div>
    <div className='overlay-panel-card'>
    <div className="panel-img">
    <div class="squarePanel">
        <span></span>
        <span></span>
        <span></span>
        <img src="https://i.ibb.co/c1dLTc0/logo.png" alt="users"/>
      </div>
      </div>
    </div>
    <div className='overlay-panel-card'>
    <div className="panel-img">
    <div class="squarePanel">
        <span></span>
        <span></span>
        <span></span>
        <img src="https://i.ibb.co/Gx4QKw6/login.png" alt="users"/>
      </div>
      </div>
    </div>
    </div>
    
{/* 
    <div className="">
        <div>
          <Link onClick={this.props.handleCourse} id="webdev" to='/panel'>Web Dev</Link>
        </div>
        <div>
          <Link onClick={this.props.handleCourse} id="uxui" to='/panel'>UX/UI</Link>
        </div>
        <div>
          <Link onClick={this.props.handleCourse} id="data" to='/panel'>Data</Link>
        </div>
      </div> */}
    </div>
    )}
}
