import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ProjectDetails from "../components/ProjectDetails";

class ProjectList extends Component {
  state = {
    project1: false,
    project2: false,
    project3: false,
  };

  handleProject1 = (event) => {
    this.setState({
      project1: event.target.checked,
    });
  };
  handleProject2 = (event) => {
    this.setState({
      project2: event.target.checked,
    });
  };
  handleProject3 = (event) => {
    this.setState({
      project3: event.target.checked,
    });
  };

  deleteProject = (projectID) => {
    // const id = this.props.projects.map((project) => project._id);
    // console.log(id.map((id) => id));

    axios
      .delete(`/api/projects/${projectID}`)
      .then((response) => {
        this.props.history.go("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    //   let projectusers = this.filter((student) =>
    //   student.contributors.map((userid) => userid._id).includes(id)
    // );
    // const contribIDs = this.props.projects.map((project) =>
    //   project.contributors
    //     .map((contrib) => contrib._id)
    //     .includes(this.props.user._id)
    // );

    // console.log(this.props.projects.map((project) => project._id));

    // project.contributors.map((contrib) =>
    //   console.log(contrib._id.includes(this.props.user._id))
    // );

    return (
      <div>
        <Link to="/addprojects">add project</Link>
        <label htmlFor="search">Project 1</label>
        <input
          type="checkbox"
          id="project1"
          name="project1"
          checked={this.state.project1}
          onChange={this.handleProject1}
        />
        <label htmlFor="search">Project 2</label>
        <input
          type="checkbox"
          id="project2"
          name="project2"
          checked={this.state.project2}
          onChange={this.handleProject2}
        />
        <label htmlFor="search">Project 3</label>
        <input
          type="checkbox"
          id="project3"
          name="project3"
          checked={this.state.project3}
          onChange={this.handleProject3}
        />

        {this.props.projects.length > 0 && <h2>Projects:</h2>}

        {this.props.projects
          .filter((project) => {
            if (
              this.state.project1 &&
              this.state.project2 &&
              this.state.project3
            ) {
              return true;
            } else if (this.state.project1 && this.state.project2) {
              return project.number === "1" || project.number === "2";
            } else if (this.state.project1 && this.state.project3) {
              return project.number === "1" || project.number === "3";
            } else if (this.state.project2 && this.state.project3) {
              return project.number === "2" || project.number === "3";
            } else if (this.state.project1) {
              return project.number === "1";
            } else if (this.state.project2) {
              return project.number === "2";
            } else if (this.state.project3) {
              return project.number === "3";
            }
            return true;
          })
          .map((project) => {
            console.log(project);
            return (
              <div key={project._id}>
                <img src={project.imageUrl} style={{ width: "150px" }} alt="" />
                <h3>{project.title}</h3>
                <p>Project Category: {project.number}</p>
                <p>Contributors:</p>
                <ul>
                  {project.contributors.map((contrib) => (
                    <li key={contrib._id}> {contrib.name}</li>
                  ))}
                </ul>
                <p>Description: {project.description}</p>
                <p>Github repo: {project.github}</p>
                <p>Heroku link:{project.heroku}</p>
                {project.contributors.map((contrib) =>
                  contrib._id.includes(this.props.user._id) ? (
                    <>
                      <Link to={`/editproject/${project._id}`}>Edit</Link>
                      <button onClick={() => this.deleteProject(project._id)}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <></>
                  )
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(ProjectList);
