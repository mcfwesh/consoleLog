import React, { Component } from "react";
import { NavLink } from "react-router-dom";
const websiteMap = ["Web Dev", "UX/UI", "Data"];
export default class NavbarMain extends Component {
  render() {
    return (
      <div className="navbarMain">
        <div className="navleft">
          <div className="logo">
            <NavLink exact={true} to="/">
              <img src="https://i.ibb.co/wpQGhGG/Conosole-log-logo.png" />
            </NavLink>
          </div>
        </div>
        <div className="navRight">
          <div className="courses">
            {websiteMap.map((e, i) => {
              return (
                <div>
                  <NavLink
                    exact
                    onClick={this.props.handleCourse}
                    id={e}
                    to="/panel"
                    style={{
                      color: this.props.course === e ? "#33c3ff" : "white",
                      borderBottom:
                        this.props.course === e ? "1px solid #33c3ff" : "none",
                    }}
                  >
                    {e}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
