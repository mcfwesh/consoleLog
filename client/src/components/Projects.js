import React, { Component } from "react";
import axios from "axios";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import { Link, Route, Redirect, Switch } from "react-router-dom";

export default class Projects extends Component {
  state = {
    projects: [],
  };

  componentDidMount = () => {
    console.log(this.props.user);
    this.getData();
  };

  getData = () => {
    axios
      .get("/api/projects")
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className="projects-container">
          <ProjectList
            projects={this.state.projects}
            user={this.props.user}
            course={this.props.course}
          />
        </div>
      </>
    );
  }
}
