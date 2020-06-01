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

    axios
      .get(`/api/users/${id}`)
      .then((response) => {
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
    this.setState({
      classroom: event.target.name,
    });
  };

  handleChange = (event) => {
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

        this.setState({
          specialization: [...this.state.specialization, name],
        });
      }
    } else {
      let crazy = [...this.state.specialization];
      crazy.splice(this.state.specialization.indexOf(name), 1);
      this.setState({
        specialization: crazy,
      });
    }
  };
  handleFileUpload = (e) => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then((response) => {
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url, uploadOn: false });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
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
      <div className="signup-overlay">
        <div className="signup-sections">
          <div className="formBox">
            <form onSubmit={this.handleSubmit}>
              <div className="sectionOne">
                <ul className="ks-cboxtags">
                  <li>
                    <input
                      id="checkboxOne"
                      type="checkbox"
                      name="Web Dev"
                      checked={this.state.classroom.includes("Web Dev")}
                      onChange={this.handleClassroom}
                    />
                    <label for="checkboxOne">Web Dev</label>
                  </li>
                  <li>
                    <input
                      id="checkboxTwo"
                      type="checkbox"
                      name="UX/UI"
                      checked={this.state.classroom.includes("UX/UI")}
                      onChange={this.handleClassroom}
                    ></input>
                    <label for="checkboxTwo">UX/UI</label>
                  </li>
                  <li>
                    <input
                      id="checkboxThree"
                      type="checkbox"
                      name="Data"
                      checked={this.state.classroom.includes("Data")}
                      onChange={this.handleClassroom}
                    ></input>
                    <label for="checkboxThree">Data</label>
                  </li>
                </ul>
              </div>
              <div>
                <input
                  className="form_field"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="First Name"
                ></input>
              </div>
              <div>
                <input
                  className="form_field"
                  type="text"
                  name="surname"
                  value={this.state.surname}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                ></input>
              </div>
              <div>
                <input
                  className="form_field"
                  type="email"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  placeholder="email@gmail.com"
                />
              </div>
              {/* <div>
                <input
                  className="form_field"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  placeholder="Password"
                />
              </div> */}

              <div>
                <textarea
                  className="form_field"
                  type="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="A short description of you, focus it to companies that might like to hire you 😊"
                  style={({ width: "300px" }, { height: "100px" })}
                ></textarea>
              </div>
              <div className="sectionTwo">
                <div>
                  <label htmlFor="name">Role</label>
                  <select
                    className="form_field"
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
                  <label>Spezialization(Max 2)</label>
                  <ul className="ks-cboxtags">
                    <li>
                      <input
                        id="checkboxFour"
                        type="checkbox"
                        name="Frontend"
                        checked={this.state.specialization.includes("Frontend")}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxFour">Frontend</label>
                    </li>
                    <li>
                      <input
                        id="checkboxFive"
                        type="checkbox"
                        name="Backend"
                        checked={this.state.specialization.includes("Backend")}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxFive">Backend</label>
                    </li>
                    <li>
                      <input
                        id="checkboxSix"
                        type="checkbox"
                        name="CSS"
                        checked={this.state.specialization.includes("CSS")}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxSix">CSS</label>
                    </li>
                    <li>
                      <input
                        id="checkboxSeven"
                        type="checkbox"
                        name="React"
                        checked={this.state.specialization.includes("React")}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxSeven">React</label>
                    </li>
                    <li>
                      <input
                        id="checkboxEight"
                        type="checkbox"
                        name="Bootstrap"
                        checked={this.state.specialization.includes(
                          "Bootstrap"
                        )}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxEight">Bootstrap</label>
                    </li>
                    <li>
                      <input
                        id="checkboxNine"
                        type="checkbox"
                        name="Managment"
                        checked={this.state.specialization.includes(
                          "Managment"
                        )}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxNine">Managment</label>
                    </li>
                    <li>
                      <input
                        id="checkboxTen"
                        type="checkbox"
                        name="API"
                        checked={this.state.specialization.includes("API")}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxTen">API</label>
                    </li>
                    <li>
                      <input
                        id="checkboxEleven"
                        type="checkbox"
                        name="Mongo DB"
                        checked={this.state.specialization.includes("Mongo DB")}
                        onChange={this.handleSpecialization}
                      ></input>
                      <label for="checkboxEleven">Mongo DB</label>
                    </li>
                  </ul>
                </div>
                <div id="image-uploads">
                  <label className="fileLabel" for="file">
                    Upload Avatar
                  </label>
                  <input
                    id="file"
                    className="input-file"
                    type="file"
                    onChange={(e) => this.handleFileUpload(e)}
                  />
                </div>
                <div>
                  <input
                    className="form_field"
                    type="text"
                    name="github"
                    value={this.state.github}
                    onChange={this.handleChange}
                    placeholder="Git Hub Profile Username"
                  ></input>
                </div>
                <div>
                  <input
                    className="form_field"
                    type="text"
                    name="codewars"
                    value={this.state.codewars}
                    onChange={this.handleChange}
                    placeholder="Code Wars Profile Username"
                  ></input>
                </div>
                <div>
                  <input
                    className="form_field"
                    type="text"
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    placeholder="Linkedin User Url"
                  ></input>
                </div>
                <div>
                  {this.state.message && (
                    <alert variant="danger" style={{ color: "red" }}>
                      {this.state.message}
                    </alert>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="btn-signup"
                  type="submit"
                  disabled={this.state.uploadOn}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul class="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
