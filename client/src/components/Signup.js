import React, { Component } from "react";
import { signup } from "../services/auth";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    surname: "",
    message: "",
    role: "Student",
    specialization: [],
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
        console.log("hiertrue");
        this.setState({
          specialization: [...this.state.specialization, name],
        });
      }
    } else {
      console.log(this.state.specialization);
      console.log("name", name);
      console.log(this.state.specialization.indexOf(name));
      let crazy = [...this.state.specialization];
      crazy.splice(this.state.specialization.indexOf(name), 1);
      this.setState({
        specialization: crazy,
      });
    }
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
      frontend,
      specialization,
    } = this.state;
    console.log(this.state.specialization);
    signup(
      username,
      password,
      name,
      surname,
      role,
      description,
      frontend,
      specialization
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
        });
      } else {
        // everything is fine -> log the user in
        this.props.setUser(data);
        this.props.history.push("/projects");
      }
    });
  };

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
          </div>

          <div>
            {this.state.message && (
              <alert variant="danger">{this.state.message}</alert>
            )}
          </div>
          <div>
            <button type="submit">Signup</button>
          </div>
        </form>
      </>
    );
  }
}
