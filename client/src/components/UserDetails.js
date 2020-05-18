import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import EditUsers from "./EditUsers";
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
    codewars: [""],
    linkedin: "",
    classroom: "Web Dev",
    teachers: [],
    projects: [],
    honor: null,
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
        this.getCodeWars(response.data.codewars);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  getCodeWars = (CW) => {
    //console.log("this is CW", CW);
    axios.get(`/api/users/codewars/${CW}`).then((response) => {
      let katas = response.data;
      let nateBoss = [];
      console.log(Array.isArray(katas.data));
      if (Array.isArray(katas.data)) {
        nateBoss = [...katas.data.slice(0, 3)];
      }

      // let nateBoss = JSON.stringify(katas.data.slice(0, 3));
      //let nateBoss = [...katas.data.slice(0, 3)];

      this.setState({
        honor: nateBoss,
      });
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
    this.getProject();
    //console.log(this.props);
    const id = this.props.match.params.id;
    // console.log("banana", id);
    this.getProject();
    //this.getData();
    function generatePDF() {
      const element = document.getElementById("nate");
      //console.log(element);
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
  deleteProject = (userID) => {
    // const id = this.props.projects.map((project) => project._id);
    // console.log(id.map((id) => id));
    //console.log(userID);
    axios
      .delete(`/api/users/${userID}`)
      .then((response) => {
        // this.props.history.go("/");
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    //console.log(this.state.honor);
    return (
      <div>
        {this.props.user._id == this.props.match.params.id ? (
          <>
            <Link to={`/edituser/${this.props.user._id}`}>Edit profile</Link>
            <Link to={`/editpass/${this.props.user._id}`}>Change password</Link>
            <button onClick={() => this.deleteProject(this.props.user._id)}>
              Delete
            </button>
          </>
        ) : (
          <></>
        )}
        <div id="nate">
          <div className="overlaySingleUser" key={this.state.name}>
            <div className="userMainInfo">
              <div className="userMainInfoBoxOne">
                <div className="mainBoxOne">
                  <img src={this.state.imageUrl} style={{ width: "200px" }} />
                </div>
                <div className="mainBoxTwo">
                  <div>
                    <h2>
                      {this.state.name} {this.state.surname}
                    </h2>
                  </div>
                  <div>
                    <p>{this.state.description}</p>
                  </div>
                  <div className="mainBoxTwoSpecial">
                    <p>
                      <b>Specialization: </b>
                    </p>
                    {this.state.specialization.map((spe) => {
                      return <p>{spe}</p>;
                    })}
                  </div>
                  <div className="userMainInfoBoxTwo">
                    <div>
                      <a href={`https://github.com/${this.state.github}`}>
                        <img
                          src="https://i.ibb.co/8NLSrWX/github.png"
                          alt="github"
                        />
                      </a>
                      <a href={`https://github.com/${this.state.github}`}>
                        <p>{this.state.github}</p>
                      </a>
                    </div>
                    <div>
                      <a href={this.state.linkedin}>
                        <img
                          src="https://i.ibb.co/nLKVXQ2/li.png"
                          alt="linkedin"
                        />
                      </a>
                      <a href={this.state.linkedin}>
                        <p>
                          {this.state.name} {this.state.surname}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="codeWarsInfo">
              <div className="codeWarsOverlay">
                <div className="codeWarsImages">
                  <div className="cwLogo">
                    <img
                      src="https://i.ibb.co/bd3Lqgf/codewarspng.png"
                      alt="cwLogo"
                    />
                  </div>
                  <div className="cwBanner">
                    <img
                      src={`https://www.codewars.com/users/${this.state.codewars}/badges/large`}
                      alt="nate"
                    />
                  </div>
                </div>
                <div className="codeWarsMainBox">
                  <div className="codeWarsBoxTwo">
                    <div>
                      <p>Last three katas </p>
                    </div>
                    <div className="lastKatas">
                      {this.state.honor
                        ? this.state.honor.map((kata) => {
                            return <p>{kata.name}</p>;
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="userProjectView">
              <div className="projectHeader">
                <h1>Projects</h1>
              </div>
              {this.state.projects
                .sort((a, b) =>
                  a.number.localeCompare(b.number, undefined, { numeric: true })
                )
                .map((name) => (
                  <div className="project">
                    <div className="projectImg">
                      <img src={name.imageUrl} />
                    </div>
                    <div className="projectBody">
                      <div>
                        <h2>{name.title}</h2>
                      </div>
                      <div>
                        <p>{name.description}</p>
                        <p>Project Category: {name.number}</p>
                      </div>
                      <div className="projectLinks">
                        <a href={name.heroku}>
                          <img
                            src="https://i.ibb.co/bLDW3YD/webbrowserprojects.png"
                            alt="web"
                          />
                          Visit the App
                        </a>
                        <a href={name.github}>
                          <img
                            src="https://i.ibb.co/0fjMyMW/githubproject.png"
                            alt="github"
                          />
                          Github Repo
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="userTeachers">
              <div className="teachersHeader">
                <h1>Teachers</h1>
              </div>
              {this.state.teachers.map((spe) => {
                return (
                  <div className="teacherBox">
                    <span>{spe.name}</span>
                    <span>
                      <img src="https://i.ibb.co/ssgRjGn/mail.png" alt="mail" />
                      {spe.mail}
                    </span>
                    <span>
                      <img
                        src="https://i.ibb.co/C9fNRTF/linkedin-teachers.png"
                        alt="linkedin"
                      />
                      {spe.linkedin}
                    </span>
                  </div>
                );
              })}
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
