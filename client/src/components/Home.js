import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="overlay-top">
          <img src="https://i.ibb.co/LRsYPnz/totalconfusion.png" alt="" />
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
                Meet the students of the Berlin, March 2020 cohort who have
                trained to become full-stack web developers. They learnt
                Front-end design and Back-end architecture fundamentals using
                top-notch technologies. They learnt how to code with the
                fundamentals of HTML5, CSS3, JavaScript, NodeJS, Express, and
                React.
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
              <p>
                Meet the students of the Berlin, March 2020 cohort who have
                trained to become UX/UI designers. They learnt user-centered
                design by applying the Design Thinking process and validate
                ideas through user research, prototyping, user testing, and
                heuristic evaluation. They have developed the art of Design
                thinking, agile organization and lean management — these
                methodologies are essential to the ever-evolving tech industry.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="cardImg">
              <img
                src="https://cdn1.imggmi.com/uploads/2020/5/20/da893275d8c19ff03427af217c23535d-full.png"
                alt="data"
              />
            </div>
            <div className="cardBody">
              <Link to="/panel">
                <h2 onClick={this.props.handleCourse} id="Data">
                  Data
                </h2>
              </Link>
              <p>
                Meet the students of the Berlin, March 2020 cohort who have
                trained to become data analysts. They learnt to load, clean,
                explore and extract valuable insights from a wide range of
                datasets as well as cultivate tools and languages such as
                Python, SQL and Tableau. They developed the secret knowledge of
                analytics by developing cross-disciplinary expertise in data.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
