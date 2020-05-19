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
    console.log(id);
    axios
      .post(`/api/auth/editPass/${id}`, {
        oldPassword: this.state.oldPassword,
        password: this.state.newPassword,
      })
      .then((data) => {
        console.log(data);

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
    console.log(this.state);
    return (
      <div>
        <h1>EDIT PASSWORD</h1>

        <form onSubmit={this.handleSubmit}>
          <p>old password</p>
          <input
            type="password"
            name="oldPassword"
            placeholder="Password"
            value={this.state.oldPassword}
            onChange={this.handleChange}
            id="passwordold"
          />
          <p>new password</p>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={this.state.newPassword}
            onChange={this.handleChange}
            id="passwordnew"
          />
          <br></br>
          <button type="submit">Change password</button>
        </form>
      </div>
    );
  }
}
