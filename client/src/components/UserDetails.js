import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import EditUsers from "./EditUsers";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
    // numPages: null,
    // pageNumber: 1,
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
      //console.log(Array.isArray(katas.data));
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
  // _exportPdf = () => {
  //   html2canvas(document.getElementById("dioni")).then((canvas) => {
  //     document.body.appendChild(canvas); // if you want see your screenshot in body.
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "PNG", 0, 0);
  //     pdf.save("download.pdf");
  //   });
  // };

  // elems = document.getElementById("dioni");
  // pdf = new jsPDF("portrait", "mm", "a4");

  // Fix Graphics Output by scaling PDF and html2canvas output to 2
  // pdf.scaleFactor = 2;

  // addPages = new Promise((resolve,reject)=>{
  //   elems.forEach((elem, idx) => {
  //     // Scaling fix set scale to 2
  //     html2canvas(elem, {scale: "2"})
  //       .then(canvas =>{
  //         if(idx < elems.length - 1){
  //           pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
  //           pdf.addPage();
  //         } else {
  //           pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
  //           console.log("Reached last page, completing");
  //         }
  //   })

  //   setTimeout(resolve, 100, "Timeout adding page #" + idx);
  // })

  // addPages.finally(()=>{
  //    console.log("Saving PDF");
  //    pdf.save();
  // });

  componentDidMount = () => {
    const id = this.props.match.params.id;
    // console.log("banana", id);
    this.getProject();
    //this.getData();
  };

  printDocument() {
    const input = document.getElementById("nate");
    html2canvas(input, {
      useCORS: true,
      scale: 0.9,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  componentWillReceiveProps = () => {
    // console.log("Jan");
    this.getProject();
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
    return (
      <>
        <div
          id="divToPrint"
          className="mt4"
          style={{
            width: "235mm",
            height: "500mm",
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
                  <div className="userMainInfo">
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
                        a.number.localeCompare(b.number, undefined, {
                          numeric: true,
                        })
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
                            <img
                              src="https://i.ibb.co/ssgRjGn/mail.png"
                              alt="mail"
                            />
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
