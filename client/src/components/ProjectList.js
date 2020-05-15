import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ProjectList extends Component {
  deleteProject = () => {
    const id = this.props.projects.map((project) => project._id);
    axios
      .delete(`/api/projects/${id}`)
      .then(() => {
        this.props.history.push("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
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
              <Link to={`/editproject/${project._id}`}>Edit</Link>
              <button onClick={this.deleteProject()}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProjectList;
