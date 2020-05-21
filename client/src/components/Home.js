import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="overlay-top">

          <img src={process.env.PUBLIC_URL + "/totalconfused.jpg"} />

        </div>
        <div className="overlay-bottom">
          <div className="card">
            <div className="cardImg">
              <img src="https://i.ibb.co/sqZ80gN/webDev.jpg" alt="webdev" />
            </div>
            <div className="cardBody">
              <Link onClick={this.props.handleCourse} id="Web Dev" to="/panel">
                <h2 onClick={this.props.handleCourse} id="Web Dev">
                  Web Dev
                </h2>
              </Link>
              <p>
                <p>Connect with the Web Dev Berlin Cohort (March 2020)</p>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img src="https://i.ibb.co/zsWB8sb/uiux.png" alt="uiux" />
            </div>
            <div className="cardBody">
              <Link to="/panel">
                <h2 onClick={this.props.handleCourse} id="UX/UI">
                  UX/UI
                </h2>
              </Link>
              <p>Connect with the UX/UI Berlin Cohort (March 2020)</p>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img src="https://i.ibb.co/3yn4JZk/datahome.png" alt="data" />
            </div>
            <div className="cardBody">
              <Link to="/panel">
                <h2 onClick={this.props.handleCourse} id="Data">
                  Data
                </h2>
              </Link>
              <p>
                <p>Connect with the Data Berlin Cohort (March 2020)</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
