import React, { Component } from "react";
import axios from "axios";
import UsersList from "./UsersList";

export default class Users extends Component {
  state = {
    users: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <UsersList users={this.state.users} />
      </div>
    );
  }
}
