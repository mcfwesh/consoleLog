import React, { Component } from "react";
// import { Button } from 'react-bootstrap';
// import EditProject from './EditProject';
// import AddTask from './AddTask';
// import TaskList from './TaskList';
import axios from "axios";
import jsPDF from "jspdf";

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

  //   handleChange = (event) => {
  //     const { name, value } = event.target;

  //     this.setState({
  //       [name]: value,
  //     });
  //   };

  //   handleSubmit = (event) => {
  //     event.preventDefault();
  //     const id = this.props.match.params.id;
  //     axios
  //       .put(`/api/projects/${id}`, {
  //         title: this.state.title,
  //         description: this.state.description,
  //       })
  //       .then((response) => {
  //         this.setState({
  //           project: response.data,
  //           title: response.data.title,
  //           description: response.data.description,
  //           editForm: false,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

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
    const id = this.props.match.params.id;
    console.log("banana", id);

    axios
      .get(`/api/projects/`)
      .then(({ data }) => {
        console.log("projects", data);
        this.setState({
          projects: [...this.state.projects, data.projects],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.getData();

    function onClick() {
      var pdf = new jsPDF("p", "pt", "letter");
      pdf.canvas.height = 72 * 11;
      pdf.canvas.width = 72 * 8.5;

      pdf.fromHTML(document.querySelector(".nate"));
      console.log(document.querySelector(".nate"));

      pdf.save("test.pdf");
    }
    var element = document.getElementById("clickbind");
    element.addEventListener("click", onClick);
  };

  render() {
    // console.log(this.state.taskForm);
    // if (this.state.error) return <div>{this.state.error}</div>;
    // if (!this.state.project) return <></>;

    // let allowedToDelete = false;
    // const user = this.props.user;
    // const owner = this.state.project.owner;

    // if (user && user._id === owner) allowedToDelete = true;

    return (
      <div class="nate">
        <h1>NATE IS THE BOSS</h1>
        <p key={this.state.name}>
          <img src={this.state.imageUrl} />
          {this.state.name} <br />
          {this.state.surname}
          {this.state.description}
          {this.state.specialization.map((spe) => {
            return <li>{spe}</li>;
          })}
          {this.state.github}
          {this.state.linkedin}
          <br></br>
          {this.state.codewars}
          {this.state.teachers.map((spe) => {
            return (
              <div>
                <li>{spe.name}</li>
                <li>{spe.mail}</li>
                <li>{spe.linkedin}</li>
              </div>
            );
          })}
          <p>Projects: {this.state.projects}</p>
        </p>
        {/* <h1>{this.state.user.name}</h1>
        <p>{this.state.project.description}</p>
        {allowedToDelete && (
          <Button variant="danger" onClick={this.deleteProject}>
            Delete this project
          </Button>
        )} */}
        {/* <Button onClick={this.toggleEditForm}>Show edit form</Button>
        <Button onClick={this.toggleTaskForm}>Show task form</Button>
        {this.state.editForm && (
          <EditProject
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
        {this.state.taskForm && (
          <AddTask
            projectId={this.state.project._id}
            getData={this.getData}
            hideForm={() => this.setState({ taskForm: false })}
          />
        )}
        <TaskList tasks={this.state.project.tasks} /> */}

        <a id="clickbind" href="#">
          Export PDF
        </a>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
      </div>
    );
  }
}
