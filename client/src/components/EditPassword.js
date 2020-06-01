import React, { Component } from "react";
import axios from "axios";

export default class EditPassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;

    axios
      .post(`/api/auth/editPass/${id}`, {
        oldPassword: this.state.oldPassword,
        password: this.state.newPassword,
      })
      .then((data) => {
        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(
          "Error while password updating: ",
          JSON.stringify(err, null, 4)
        );
      });
  };

  render() {
    return (
      <div className="signup-overlay">
        <div className="signup-sections-change">
          <div className="formBox">
            <form onSubmit={this.handleSubmit}>
              <input
                className="form_field"
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={this.state.oldPassword}
                onChange={this.handleChange}
                id="passwordold"
              />
              <input
                className="form_field"
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={this.state.newPassword}
                onChange={this.handleChange}
                id="passwordnew"
              />
              <br></br>
              <button className="btn-signup" type="submit">
                Change password
              </button>
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
