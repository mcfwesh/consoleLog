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
    this.getData();
  };

  getData = () => {
    axios
      .get("/api/projects")
      .then((response) => {
        console.log(response);
        this.setState({
          projects: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="projects-container">
        <Link to="/addprojects">add project</Link>

        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}
