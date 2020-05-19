import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../services/auth";
import VideoInput from "./VideoInput";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password, "Markus").then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        console.log(data);
        localStorage.setItem(data.username, data.password);
        this.props.setUser(data);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <>
        <div className="overlay-login">
          <div class="square">
            <span></span>
            <span></span>
            <span></span>
            <form onSubmit={this.handleSubmit}>
              <div className="loginContainer">
              <VideoInput setUser={this.props.setUser} />
                {/* <h2>Login</h2>
                <Form.Group>
                  <div className="inputBox">
                    <input
                      type="text"
                      name="username"
                      placeholder="Email"
                      value={this.state.username}
                      onChange={this.handleChange}
                      id="username"
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="inputBox">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      id="password"
                    />
                  </div>
                </Form.Group>
                {this.state.message && (
                  <Alert variant="danger">{this.state.message}</Alert>
                )}
                <Button className="btn-login" type="submit">
                  Login
                </Button> */}
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
