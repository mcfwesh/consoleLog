import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class EditProject extends Component {
  state = {
    title: "",
    description: "",
  };

  getData = (projectusers) => {
    const id = this.props.match.params.id;
    console.log(projectusers);
    axios
      .get(`/api/projects/${id}`)
      .then((response) => {
        console.log("this is respons", response.data);
        this.setState({
          title: response.data.title,
          description: response.data.description,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    axios
      .put(`/api/projects/${this.props.match.params.id}`, {
        title: this.state.title,
        description: this.state.description,
        // number: this.state.number,
        // imageUrl: this.state.imageUrl,
        // github: this.state.github,
        // heroku: this.state.heroku,
        // contributors: this.state.contributors,
      })
      .then(() => {
        // this.setState({
        //   title: "",
        //   description: "",
        //   // number: "",
        //   // imageUrl: "",
        //   // github: "",
        //   // heroku: "",
        //   // contributors: "",
        // });
        // update state in Projects by executing getData()
        this.getData();
        this.props.history.push("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    console.log(this.props.match.params.id);

    console.log(this.state.project);

    return (
      <div>
        <h2>Edit project: </h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit">Edit</Button>
        </Form>
      </div>
    );
  }
}
