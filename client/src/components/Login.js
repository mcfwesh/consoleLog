import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../services/auth";
import VideoInput from "./VideoInput";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    loginMethod: "true"
  };


  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleLoginMethodFace = (event) => {
    this.setState({
      loginMethod: "false"
    })
  };
  handleLoginMethodNormal = (event) => {
    this.setState({
      loginMethod: "true"
    })
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
          loginMethod: ""
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
              {console.log(this.state.loginMethod)}
              {this.state.loginMethod == "true"
              ?
              <>
              <h2>Login</h2>
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
                </Button>
                <Button className="btn-login" onClick={this.handleLoginMethodFace}>
                  Login with Facial Recognition
                </Button>
                </>
              :
              <VideoInput normal={this.handleLoginMethodNormal} setUser={this.props.setUser} />
              }
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
