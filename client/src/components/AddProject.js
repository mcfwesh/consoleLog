import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { project, handleUpload, saveNewThing } from "../services/auth";

export default class AddProject extends Component {
  state = {
    title: "",
    description: "",
    number: "Any",
    imageUrl: "",
    github: "",
    heroku: "",
    contributors: [],
    contributorsList: null,
    contributorsName: [],
  };

  componentDidMount() {
    axios.get("/api/users").then(({ data }) => {
      this.setState({
        contributorsList: data,
      });
    });
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
    //console.log(name);
    //console.log(this.state);
  };

  handleSelect = (event) => {
    //console.log(event.target.key);
    const name = document.getElementById(event.target.value).innerText;
    const target = event.target;
    const value = target.value;
    this.setState({
      contributors: [...this.state.contributors, value],
      contributorsName: [...this.state.contributorsName, name],
    });
  };

  handleFileUpload = (e) => {
    //console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({ uploadOn: true });
    handleUpload(uploadData)
      .then((response) => {
        // console.log('response is: ', response);
        //console.log(response.secure_url);

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
      .post("/api/projects", {
        title: this.state.title,
        description: this.state.description,
        number: this.state.number,
        imageUrl: this.state.imageUrl,
        github: this.state.github,
        heroku: this.state.heroku,
        contributors: this.state.contributors,
      })
      .then(() => {
        this.setState({
          title: "",
          description: "",
          number: "",
          imageUrl: "",
          github: "",
          heroku: "",
          contributors: "",
        });
        // update state in Projects by executing getData()
        this.props.history.push("/projects");
        this.props.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    //console.log(this.props.course);

    return (
      <div className="signup-overlay">
        <div className="add-project">
          <div className="formBox">
            <Form onSubmit={this.handleSubmit}>
              {/* all groups (label + input) are grouped in a Form.Group */}
              {/* <label></label> */}
              {/* <input /> */}
              <input
                className="form_field"
                placeholder="Project Title"
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <input
                className="form_field"
                placeholder="Description"
                type="text"
                name="description"
                id="description"
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
                <option value="Any">Select a project</option>
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
                  onChange={(e) => this.handleFileUpload(e)}
                />
              </div>
              <input
                className="form_field"
                placeholder="Github Username"
                type="text"
                name="github"
                id="github"
                value={this.state.github}
                onChange={this.handleChange}
              />
              <input
                className="form_field"
                placeholder="Deploy Link"
                type="text"
                name="heroku"
                id="heroku"
                value={this.state.heroku}
                onChange={this.handleChange}
              />
              {this.state.contributorsName &&
                this.state.contributorsName.map((name) => {
                  return <p>{name}</p>;
                })}
              <select
                className="form_field"
                name="contributors"
                onChange={this.handleSelect}
              >
                <option value="">Select a contributor</option>
                {this.state.contributorsList &&
                  this.props.course &&
                  this.state.contributorsList.map((contrib) => {
                    return (
                      <option
                        id={contrib._id}
                        value={contrib._id}
                        key={contrib._id}
                      >
                        {contrib.name}
                      </option>
                    );
                  })}
              </select>

              <Button
                className="btn-signup"
                type="submit"
                disabled={this.state.uploadOn}
              >
                Add Project
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
