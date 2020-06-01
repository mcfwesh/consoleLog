import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import EditUsers from "./EditUsers";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import domtoimage from "dom-to-image";

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
  };

  getProject = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/projects/`)
      .then((response) => {
        let projectusers = response.data.filter((student) =>
          student.contributors.map((userid) => userid._id).includes(id)
        );

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
    axios.get(`/api/users/codewars/${CW}`).then((response) => {
      let katas = response.data;
      let nateBoss = [];

      if (Array.isArray(katas.data)) {
        nateBoss = [...katas.data.slice(0, 3)];
      }

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
  };

  printDocument() {
    const input = document.getElementById("nate");
    html2canvas(input, {
      useCORS: true,
      scale: 0.9,
      y: 100,
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);

      pdf.save("download.pdf");
    });
  }

  componentWillReceiveProps = () => {
    this.getProject();
  };
  deleteProject = (userID) => {
    axios
      .delete(`/api/users/${userID}`)
      .then((response) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <div
          id="divToPrint"
          className="mt4"
          style={{
            width: "235mm",
            // height: "1000mm",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          <div>
            {this.props.user._id == this.props.match.params.id ? (
              <div className="userSettings">
                <div className="userSettingsBox">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/userdetails/edit.png"
                    }
                  />
                  <Link to={`/edituser/${this.props.user._id}`}>
                    Edit Profile
                  </Link>
                </div>
                <div className="userSettingsBox">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/userdetails/changepass.png"
                    }
                  />
                  <Link to={`/editpass/${this.props.user._id}`}>
                    Change Password
                  </Link>
                </div>
                <div className="userSettingsBox">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/userdetails/trash.png"
                    }
                  />
                  <Link onClick={() => this.deleteProject(this.props.user._id)}>
                    Delete
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
            {this.props.course === "UX/UI" && (
              <img
                className="loading"
                style={{ width: "900px" }}
                src={process.env.PUBLIC_URL + "/lara.png"}
              />
            )}
            {this.props.course === "Data" && (
              <img
                className="loading"
                style={{ width: "900px" }}
                src={process.env.PUBLIC_URL + "/anapaula.png"}
              />
            )}

            {this.props.course === "Web Dev" && (
              <div id="nate">
                <div className="overlaySingleUser" key={this.state.name}>
                  {/* <div className="userMainInfo"> */}
                  <div className="userMainInfoBoxOne">
                    <div className="mainBoxOne">
                      <img
                        src={this.state.imageUrl}
                        style={{ width: "200px" }}
                      />
                    </div>
                    <div className="mainBoxTwo">
                      <div className="mainBoxTwoHeader">
                        <h2>
                          {this.state.name} {this.state.surname}
                        </h2>
                      </div>
                      <div>
                        <p>{this.state.description}</p>
                      </div>
                      <div className="mainBoxTwoSpecial" id="tim">
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
                          <div className="codeWarsTitle">
                            <p>let lastThreeKatas = </p>
                          </div>
                          <div className="lastKatas">
                            [
                            {this.state.honor
                              ? this.state.honor.map((kata) => {
                                  return <p>["{kata.name}"],</p>;
                                })
                              : null}
                            ]
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
                        a.number.localeCompare(b.number, undefined, {
                          numeric: true,
                        })
                      )
                      .map((name) => (
                        <div className="projectUser">
                          <div className="projectUserImg">
                            <img src={name.imageUrl} />
                          </div>
                          <div className="projectUserBody">
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

                          {spe.mail !== "" ? (
                            <span>
                              <img
                                src="https://i.ibb.co/ssgRjGn/mail.png"
                                alt="mail"
                              />
                              <p>{spe.mail}</p>
                            </span>
                          ) : (
                            <></>
                          )}
                          {spe.linkedin !== "" ? (
                            <span>
                              <img
                                src="https://i.ibb.co/C9fNRTF/linkedin-teachers.png"
                                alt="mail"
                              />
                              {spe.linkedin}
                            </span>
                          ) : (
                            <span>{spe.linkedin}</span>
                          )}
                          {/* <span>
                            <img
                              src="https://i.ibb.co/C9fNRTF/linkedin-teachers.png"
                              alt="linkedin"
                            />
                            {spe.linkedin}
                          </span> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <a onClick={this.printDocument} class="exportPDF">
              Export To PDF
            </a>
          </div>
        </div>
      </>
    );
  }
}
