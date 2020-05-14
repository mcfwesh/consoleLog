import React, { Component } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

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
  };

  getData = () => {
    const id = this.props.match.params.id;
    //console.log(id);
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
    this.getData();

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
    return (
      <div>
        <div id="nate">
          <p key={this.state.name}>
            <img src={this.state.imageUrl} style={{ width: "120px" }} />

            {this.state.name}
            {this.state.surname}
            {this.state.description}
            {this.state.specialization.map((spe) => {
              return <li>{spe}</li>;
            })}
            {this.state.github}
            {this.state.linkedin}
            <br></br>
            {this.state.codewars}
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
          </p>
        </div>
        <a id="clickbind" href="#">
          Export PDF
        </a>
      </div>
    );
  }
}
