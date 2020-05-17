import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectDetails from "../components/ProjectDetails";

class ProjectList extends Component {
  deleteProject = (projectID) => {
    // const id = this.props.projects.map((project) => project._id);
    // console.log(id.map((id) => id));

    axios
      .delete(`/api/projects/${projectID}`)
      .then((response) => {
        this.props.history.push("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    //   let projectusers = this.filter((student) =>
    //   student.contributors.map((userid) => userid._id).includes(id)
    // );
    const contribIDs = this.props.projects.map((project) =>
      project.contributors
        .map((contrib) => contrib._id)
        .includes(this.props.user._id)
    );

    console.log(this.props.projects.map((project) => project._id));
    return (
      <div>
        {this.props.projects.length > 0 && <h2>Projects:</h2>}

        {this.props.projects.map((project) => {
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

export default ProjectList;
