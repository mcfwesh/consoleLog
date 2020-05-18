import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { signup, handleUpload, saveNewThing } from "../services/auth";

export default class extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    surname: "",
    message: "",
    role: "Student",
    specialization: [],
    imageUrl: "",
    uploadOn: false,
    github: "",
    codewars: "",
    linkedin: "",
    classroom: "Web Dev",
  };

  getData = (projectusers) => {
    const id = this.props.match.params.id;
    //console.log(projectusers);
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        console.log("this is respons", response.data);
        this.setState({
          name: response.data.name,
          surname: response.data.surname,
          username: response.data.username,
          password: response.data.password,
          description: response.data.description,
          message: "",
          role: response.data.role,
          specialization: response.data.specialization,
          imageUrl: response.data.imageUrl,
          uploadOn: false,
          github: response.data.github,
          codewars: response.data.codewars,
          linkedin: response.data.linkedin,
          classroom: response.data.classroom,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };
  handleClassroom = (event) => {
    //console.log(event.target.name);
    this.setState({
      classroom: event.target.name,
    });
  };

  handleChange = (event) => {
    console.log(event.target.name);
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSpecialization = (event) => {
    const name = event.target.name;
    if (event.target.checked) {
      if (!this.state.specialization.includes(name)) {
        if (this.state.specialization.length > 1) return;
        // console.log("hiertrue");
        this.setState({
          specialization: [...this.state.specialization, name],
        });
      }
    } else {
      //console.log(this.state.specialization);
      //console.log("name", name);
      //console.log(this.state.specialization.indexOf(name));
      let crazy = [...this.state.specialization];
      crazy.splice(this.state.specialization.indexOf(name), 1);
      this.setState({
        specialization: crazy,
      });
    }
  };
  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then((response) => {
        // console.log('response is: ', response);
        console.log(response.secure_url);

        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url, uploadOn: false });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    if (this.state.uploadOn) return;
    axios
      .put(`/api/users/${this.props.match.params.id}`, {
        name: this.state.name,
        surname: this.state.surname,
        github: this.state.github,
        heroku: this.state.heroku,
        codewars: this.state.codewars,
        description: this.state.description,
        linkedin: this.state.linkedin,
        username: this.state.username,
        password: this.state.password,
        message: this.state.message,
        role: this.state.role,
        specialization: this.state.specialization,
        imageUrl: this.state.imageUrl,
        uploadOn: false,
        classroom: this.state.classroom,
      })
      .then(() => {
        // this.setState({
        //   title: "",
        //   description: "",
        //   // number: "",
        //   // imageUrl: "",
        //   // github: "",
        //   // heroku: "",
        //   // contributors: "",
        // });
        // update state in Projects by executing getData()
        this.getData();
        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <div>
        <h1>VAMOS NATE</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Classroom:</label>
            <br></br>
            <input
              type="checkbox"
              name="Web Dev"
              checked={this.state.classroom.includes("Web Dev")}
              onChange={this.handleClassroom}
            ></input>
            <label>Web Dev</label>
            <input
              type="checkbox"
              name="UX/UI"
              checked={this.state.classroom.includes("UX/UI")}
              onChange={this.handleClassroom}
            ></input>
            <label>UX/UI</label>
            <input
              type="checkbox"
              name="Data"
              checked={this.state.classroom.includes("Data")}
              onChange={this.handleClassroom}
            ></input>
            <h2>Name:</h2>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <h2>Surname:</h2>
            <input
              type="text"
              name="surname"
              value={this.state.surname}
              onChange={this.handleChange}
            />

            <div>
              <label htmlFor="username">Mail: </label>
              <input
                type="email"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
                placeholder="email@gmail.com"
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
                placeholder="****"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                type="textarea"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="A short description of you, focus it to companies that might like to hire you 😊"
                style={({ width: "300px" }, { height: "100px" })}
              ></textarea>
            </div>
            <div>
              <label htmlFor="name">Role</label>
              <select
                name="role"
                value={this.state.role}
                onChange={this.handleChange}
              >
                <option id="Student" value="Student">
                  Student
                </option>
                <option id="Teacher" value="Teacher">
                  Teacher
                </option>
              </select>
            </div>

            <div>
              <label>Github id</label>
              <input
                type="text"
                name="github"
                value={this.state.github}
                onChange={this.handleChange}
                placeholder="Git Hub Profile"
              ></input>
            </div>
            <div>
              <label>Codewars id</label>
              <input
                type="text"
                name="codewars"
                value={this.state.codewars}
                onChange={this.handleChange}
                placeholder="Code Wars Profile"
              ></input>
            </div>
            <div>
              <label>Linkedin id</label>
              <input
                type="text"
                name="linkedin"
                value={this.state.linkedin}
                onChange={this.handleChange}
                placeholder="Linkedin User"
              ></input>
            </div>

            <div>
              <label>Spezialization :</label>
              <br></br>
              <input
                type="checkbox"
                name="Frontend"
                checked={this.state.specialization.includes("Frontend")}
                onChange={this.handleSpecialization}
              ></input>
              <label>Frontend</label>
              <input
                type="checkbox"
                name="Backend"
                checked={this.state.specialization.includes("Backend")}
                onChange={this.handleSpecialization}
              ></input>
              <label>Backend</label>
              <input
                type="checkbox"
                name="CSS"
                checked={this.state.specialization.includes("CSS")}
                onChange={this.handleSpecialization}
              ></input>
              <label>CSS</label>
              <input
                type="checkbox"
                name="React"
                checked={this.state.specialization.includes("React")}
                onChange={this.handleSpecialization}
              ></input>
              <label>React</label>
              <br></br>
              <input
                type="checkbox"
                name="Bootstrap"
                checked={this.state.specialization.includes("Bootstrap")}
                onChange={this.handleSpecialization}
              ></input>
              <label>Bootstrap</label>
              <input
                type="checkbox"
                name="Managment"
                checked={this.state.specialization.includes("Managment")}
                onChange={this.handleSpecialization}
              ></input>
              <label>Managment</label>
              <input
                type="checkbox"
                name="API"
                checked={this.state.specialization.includes("API")}
                onChange={this.handleSpecialization}
              ></input>
              <label>API</label>
              <input
                type="checkbox"
                name="Mongo DB"
                checked={this.state.specialization.includes("Mongo DB")}
                onChange={this.handleSpecialization}
              ></input>
              <label>Mongo DB</label>
            </div>
            <div id="image-uploads">
              <input type="file" onChange={(e) => this.handleFileUpload(e)} />
            </div>

            <button type="submit" disabled={this.state.uploadOn}>
              Edit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
