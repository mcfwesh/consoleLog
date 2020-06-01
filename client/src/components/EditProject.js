import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import AddProject from "../components/AddProject";
import { project, handleUpload, saveNewThing } from "../services/auth";

export default class EditProject extends Component {
  state = {
    title: "",
    description: "",
    number: "",
    imageUrl: "",
    github: "",
    heroku: "",
  };

  getData = (projectusers) => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/projects/${id}`)
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          number: response.data.number,
          imageUrl: response.data.imageUrl,
          github: response.data.github,
          heroku: response.data.heroku,
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

  handleFileUpload = (e) => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then((response) => {
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url, uploadOn: false });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.uploadOn) return;
    axios
      .put(`/api/projects/${this.props.match.params.id}`, {
        title: this.state.title,
        description: this.state.description,
        number: this.state.number,
        imageUrl: this.state.imageUrl,
        github: this.state.github,
        heroku: this.state.heroku,
      })
      .then(() => {
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
    return (
      <div className="signup-overlay">
        <div className="add-project">
          <div className="formBox">
            <Form onSubmit={this.handleSubmit}>
              <input
                className="form_field"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <input
                className="form_field"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <select
                className="form_field"
                value={this.state.number}
                name="number"
                id="number"
                onChange={this.handleChange}
              >
                <option value="Any">Any Project</option>
                <option value="1">Project 1</option>
                <option value="2">Project 2</option>
                <option value="3">Project 3</option>
              </select>
              <div id="image-uploads">
                <label className="fileLabel" for="file">
                  Upload Project Screen Shot
                </label>
                <input
                  className="input-file"
                  type="file"
                  value={this.imageUrl}
                  onChange={(e) => this.handleFileUpload(e)}
                />
              </div>
              <input
                className="form_field"
                type="text"
                name="github"
                id="github"
                value={this.state.github}
                onChange={this.handleChange}
              />
              <input
                className="form_field"
                type="text"
                name="heroku"
                id="heroku"
                value={this.state.heroku}
                onChange={this.handleChange}
              />
              <Button
                className="btn-signup"
                type="submit"
                disabled={this.state.uploadOn}
              >
                Edit Project
              </Button>
            </Form>
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
