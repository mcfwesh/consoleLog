import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Notes from "./Notes";

export default class UserDetails extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    surname: "",
    role: "Student",
    specialization: [],
    imageUrl: "",
    uploadOn: false,
    description: "",
    github: "",
    codewars: "",
    linkedin: "",
    classroom: "Web Dev",
    teachers: [],
    projects: [],
    // title: "",
    // description: "",
    // editForm: false,
    // taskForm: false,
    // error: null,
  };

  getProject = () => {
    const id = this.props.match.params.id;
    //console.log("the id", id);
    axios
      .get(`/api/projects/`)
      .then((response) => {
        //console.log("projects", response.data[1].contributors[0]._id);
        // console.log(
        //   "projects map 1",
        //   response.data.filter((student) =>
        //     student.contributors.map((userid) => userid._id).includes(id)
        //   ),
        //   id,
        //   response.data
        // );
        let projectusers = response.data.filter((student) =>
          student.contributors.map((userid) => userid._id).includes(id)
        );
        //console.log(projectusers);
        this.getData(projectusers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = (projectusers) => {
    const id = this.props.match.params.id;

    console.log(this.props.myuser);
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        //console.log("this is respons", response.data);
        this.setState({
          username: response.data.username,
          name: response.data.name,
          surname: response.data.surname,
          role: response.data.role,
          description: response.data.description,
          specialization: response.data.specialization,
          imageUrl: response.data.imageUrl,
          uploadOn: false,
          github: response.data.github,
          codewars: response.data.codewars,
          linkedin: response.data.linkedin,
          classroom: response.data.classroom,
          teachers: response.data.teachers,
          projects: projectusers,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  deleteProject = () => {
    const id = this.props.match.params.id;
    axios
      .delete(`/api/projects/${id}`)
      .then(() => {
        this.props.history.push("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm,
    });
  };

  toggleTaskForm = () => {
    this.setState({
      taskForm: !this.state.taskForm,
    });
  };

  componentDidMount = () => {
    console.log(this.props);
    const id = this.props.match.params.id;
    // console.log("banana", id);

    this.getProject();
    //this.getData();

    function generatePDF() {
      const element = document.getElementById("nate");
      console.log(element);

      var opt = {
        margin: 2,
        image: { type: "jpg", quality: 0.95 },
        html2canvas: { dpi: 100, letterRendering: true, useCORS: true },
        jsPDF: { unit: "pt", format: "letter", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    }
    var element = document.getElementById("clickbind");
    element.addEventListener("click", generatePDF);
  };
  render() {
    console.log("this is the props", this.props.user._id);
    console.log("this is the profile", this.props.match.params.id);

    return (
      <div>
        {this.props.user._id == this.props.match.params.id ? (
          <>
            {/* <Link to={`/editproject/${project._id}`}>Edit</Link>
            <button onClick={() => this.deleteProject(project._id)}>
              Delete
            </button> */}
            <button>Edit profile</button>
            <button>Delete profile</button>
          </>
        ) : (
          <></>
        )}
        <div id="nate">
          <div className="overlaySingleUser" key={this.state.name}>
            <div className="userMainInfo">
              <div className="userMainInfoBoxOne">
                <img src={this.state.imageUrl} style={{ width: "120px" }} />

                <h2>
                  {this.state.name} {this.state.surname}
                </h2>
                <p>{this.state.description}</p>
                <h3>Tech Stacks</h3>
                {this.state.specialization.map((spe) => {
                  return (
                    <div>
                      <li>{spe}</li>
                    </div>
                  );
                })}
              </div>
              <div className="userMainInfoBoxTwo">
                <p>Github: {this.state.github}</p>
                <p>Linkedin: {this.state.linkedin}</p>
              </div>
            </div>
            <div className="codeWarsInfo">
              <p>Codewars: {this.state.codewars} </p>
            </div>
            <div className="userProjectView">
              <h2>Projects:</h2>
              {this.state.projects
                .sort((a, b) =>
                  a.number.localeCompare(b.number, undefined, { numeric: true })
                )
                .map((name) => (
                  <div>
                    <h4>{name.title}</h4>
                    <p>{name.description}</p>
                    <p>Project Category: {name.number}</p>
                    <div>
                      <img src={name.imageUrl} />
                    </div>
                    <a href={name.github}>Github repo</a> <br />
                    <a href={name.heroku}>Play Game</a>
                  </div>
                ))}
            </div>
            <div className="userTeachers">
              <table>
                <tr>
                  <th>Teacher</th>
                  <th>Mail</th>
                  <th>Linkedin</th>
                </tr>
                {this.state.teachers.map((spe) => {
                  return (
                    <tr>
                      <td>{spe.name}</td>
                      <td>{spe.mail}</td>
                      <td>{spe.linkedin}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
        <a id="clickbind" href="#">
          Export PDF
        </a>
      </div>
    );
  }
}
