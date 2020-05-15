import React from "react";
import { Link } from "react-router-dom";

const ProjectList = (props) => {
  return (
    <div>
      {props.projects.length > 0 && <h2>Projects:</h2>}

      {props.projects.map((project) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
