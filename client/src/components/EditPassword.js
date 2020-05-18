import React, { Component } from "react";
import axios from "axios";

export default class EditPassword extends Component {
  state = {
    oldpassword: "",
    newpassword: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.match.params.id);
    axios
      .post(`/api/auth/${this.props.match.params.id}`, {
        oldpassword: this.state.oldpassword,
        password: this.state.newpassword,
      })
      .then((data) => {
        console.log(data);
        this.props.history.push("/users");
      })
      .catch((err, data) => {
        console.log("Error while uploading the file: ", err, data);
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
            name="oldpassword"
            placeholder="Password"
            value={this.state.oldpassword}
            onChange={this.handleChange}
            id="passwordold"
          />
          <p>new password</p>
          <input
            type="password"
            name="newpassword"
            placeholder="New Password"
            value={this.state.newpassword}
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
