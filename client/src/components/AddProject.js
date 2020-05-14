import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default class AddProject extends Component {
  state = {
    title: "",
    description: "",
    number: "",
    imageUrl: "",
    github: "",
    heroku: "",
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/projects", {
        title: this.state.title,
        description: this.state.description,
        number: this.state.number,
        imageUrl: this.state.imageUrl,
        github: this.state.github,
        heroku: this.state.heroku,
      })
      .then(() => {
        this.setState({
          title: "",
          description: "",
          number: "",
          imageUrl: "",
          github: "",
          heroku: "",
        });
        // update state in Projects by executing getData()
        this.props.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* all groups (label + input) are grouped in a Form.Group */}
        <Form.Group>
          {/* <label></label> */}
          <Form.Label htmlFor="title">Title: </Form.Label>
          {/* <input /> */}
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description">Description: </Form.Label>
          <Form.Control
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="number">Number: </Form.Label>
          <Form.Control
            type="text"
            name="number"
            id="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="imageUrl">ImageUrl: </Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="github">github: </Form.Label>
          <Form.Control
            type="text"
            name="github"
            id="github"
            value={this.state.github}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="heroku">heroku: </Form.Label>
          <Form.Control
            type="text"
            name="heroku"
            id="heroku"
            value={this.state.heroku}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button type="submit">Add Project</Button>
      </Form>
    );
  }
}
