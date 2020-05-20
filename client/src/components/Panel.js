import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Panel extends Component {
  render() {
    return (
      <div className="overlay-panel">
        <div className="overlay-panel-cards">
          <div className="overlay-panel-card">
            <div className="panel-img">
              <div className="squarePanel">
                <span></span>
                <span></span>
                <span></span>

                <Link to="/users" course={this.props.course}>
                  <img src="https://i.ibb.co/N1KGxHZ/476759.png" alt="users" />
                </Link>
                <a href="/users" course={this.props.course}>
                  Users
                </a>
              </div>
            </div>
          </div>
          <div className="overlay-panel-card">
            <div className="panel-img">
              <div className="squarePanel">
                <span></span>
                <span></span>
                <span></span>

                <Link to="/jobs">
                  <img src="https://i.ibb.co/H4G5fyF/1584961.png" alt="jobs" />
                </Link>
                <a href="/jobs">Jobs</a>
              </div>
            </div>
          </div>
          <div className="overlay-panel-card">
            <div className="panel-img">
              <div className="squarePanel">
                <span></span>
                <span></span>
                <span></span>

                <Link to="/notes">
                  <img src="https://i.ibb.co/0VCQ43y/1355461.png" alt="notes" />
                </Link>
                <a href="/notes">Notes</a>
              </div>
            </div>
          </div>
          <div className="overlay-panel-card">
            <div className="panel-img">
              <div className="squarePanel">
                <span></span>
                <span></span>
                <span></span>
                <Link course={this.props.course} to="/projects">
                  {" "}
                  <img
                    src="https://i.ibb.co/wsb3zGB/2247603.png"
                    alt="projects"
                  />
                </Link>
                <a href="/projects">Projects</a>
              </div>
            </div>
          </div>
          <div className="overlay-panel-card">
            <div className="panel-img">
              <div className="squarePanel">
                <span></span>
                <span></span>
                <span></span>

                <Link to={this.props.user ? `/` : "/login"}>
                  {" "}
                  <img src="https://i.ibb.co/c1dLTc0/logo.png" alt="login" />
                </Link>
                <a href={this.props.user ? `/` : "/login"}>
                  {this.props.user ? "Logout" : "Login"}
                </a>
              </div>
            </div>
          </div>
          <div className="overlay-panel-card">
            <div className="panel-img">
              <div className="squarePanel">
                <span></span>
                <span></span>
                <span></span>

                <Link
                  to={
                    this.props.user
                      ? `/users/${this.props.user._id}`
                      : "/signup"
                  }
                >
                  {" "}
                  <img
                    src="https://cdn1.imggmi.com/uploads/2020/5/21/f041b52e7099a62dfc8f67f0ce461975-full.png"
                    alt="register"
                  />
                </Link>
                <a
                  href={
                    this.props.user
                      ? `/users/${this.props.user._id}`
                      : "/signup"
                  }
                >
                  {this.props.user ? "My Account" : "Register"}
                </a>
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
    );
  }
}
