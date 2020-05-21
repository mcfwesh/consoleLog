import React, { Component } from "react";
import { signup, handleUpload, saveNewThing } from "../services/auth";

export default class Signup extends Component {
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

  handleClassroom = (event) => {
    //console.log(event.target.name);
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
    //console.log(name);
    //console.log(this.state);
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
    //console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then((response) => {
        // console.log('response is: ', response);
        //console.log(response.secure_url);

        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url, uploadOn: false });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      username,
      password,
      name,
      surname,
      role,
      description,
      specialization,
      imageUrl,
      github,
      codewars,
      linkedin,
      classroom,
    } = this.state;
    //console.log(this.state.specialization);
    if (this.state.uploadOn) return;
    signup(
      username,
      password,
      name,
      surname,
      role,
      description,
      specialization,
      imageUrl,
      github,
      codewars,
      linkedin,
      classroom
    ).then((data) => {
      //console.log(data);
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
          name: "",
          surname: "",
          role: "Student",
          description: "",
          specialization: [],
          imageUrl,
          github: "",
          codewars: "",
          linkedin: "",
          classroom: "Web Dev",
        });
      } else {
        // everything is fine -> log the user in
        this.props.setUser(data);
        this.props.history.push("/users");
      }
    });
  };

  // handleSubmitImage = (e) => {
  //   e.preventDefault();

  //if (this.state.uploadOn) return; // do nothing if the file is still being uploaded

  //   saveNewThing(this.state)
  //     .then((res) => {
  //       console.log("added: ", res);
  //       // here you would redirect to some other page
  //     })
  //     .catch((err) => {
  //       console.log("Error while adding the thing: ", err);
  //     });
  // };

  render() {
    //console.log(this.state.classroom);
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div>
                <input
                  className="form_field"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <textarea
                  className="form_field"
                  type="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="A short description of you, focus it to companies that might like to hire you 😊"
                  style={({ width: "300px" }, { height: "100px" })}
                  required
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
                    required
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
                  Signup
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
