import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class extends Component {
  state = {
    name: "",
    surname: "",
  };

  getData = (projectusers) => {
    const id = this.props.match.params.id;
    console.log(projectusers);
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        console.log("this is respons", response.data);
        this.setState({
          name: response.data.name,
          surname: response.data.surname,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  render() {
    return (
      <div>
        <h1>VAMOS NATE</h1>

        <div>
          <h2>Title:</h2>
          <Form.Control
            type="text"
            name="title"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <h2>Description:</h2>
          <Form.Control
            type="text"
            name="description"
            value={this.state.surname}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
