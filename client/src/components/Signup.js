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
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
    console.log(name);
    console.log(this.state);
  };

  handleSpecialization = (event) => {
    const name = event.target.name;
    if (event.target.checked) {
      if (!this.state.specialization.includes(name)) {
        //console.log("hiertrue");
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
    } = this.state;
    console.log(this.state.specialization);
    if (this.state.uploadOn) return;
    signup(
      username,
      password,
      name,
      surname,
      role,
      description,
      specialization,
      imageUrl
    ).then((data) => {
      console.log(data);
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
          name: "",
          surname: "",
          role: "",
          description: "",
          specialization: [],
          imageUrl,
        });
      } else {
        // everything is fine -> log the user in
        this.props.setUser(data);
        this.props.history.push("/projects");
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
    console.log(this.state.specialization);
    return (
      <>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Mail: </label>
            <input
              type="email"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
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
            />
          </div>
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="surname">surname</label>
            <input
              type="text"
              name="surname"
              value={this.state.surname}
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="name">role</label>
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
            <label>Spezialization:</label>
            <br></br>
            <input
              type="checkbox"
              name="Frontend"
              // checked={this.state.specialization}
              onChange={this.handleSpecialization}
            ></input>
            <label>Frontend</label>
            <input
              type="checkbox"
              name="Backend"
              onChange={this.handleSpecialization}
            ></input>
            <label>Backend</label>
            <input
              type="checkbox"
              name="CSS"
              onChange={this.handleSpecialization}
            ></input>
            <label>CSS</label>
            <input
              type="checkbox"
              name="React"
              onChange={this.handleSpecialization}
            ></input>
            <label>React</label>
            <br></br>
            <input
              type="checkbox"
              name="Bootstrap"
              onChange={this.handleSpecialization}
            ></input>
            <label>Bootstrap</label>
            <input
              type="checkbox"
              name="Managment"
              onChange={this.handleSpecialization}
            ></input>
            <label>Managment</label>
            <input
              type="checkbox"
              name="API"
              onChange={this.handleSpecialization}
            ></input>
            <label>API</label>
            <input
              type="checkbox"
              name="Mongo DB"
              onChange={this.handleSpecialization}
            ></input>
            <label>Mongo DB</label>
          </div>

          <div id="image-uploads">
            <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          </div>

          <div>
            {this.state.message && (
              <alert variant="danger">{this.state.message}</alert>
            )}
          </div>
          <div>
            <button type="submit" disabled={this.state.uploadOn}>
              Signup
            </button>
          </div>
        </form>
      </>
    );
  }
}
