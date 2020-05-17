import React, { Component } from "react";
import { Button } from "react-bootstrap";
import EditProject from "./EditProject";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import axios from "axios";

export default class ProjectDetails extends Component {
  state = {
    project: null,
    title: "",
    description: "",
    github: "",
    editForm: false,
    taskForm: false,
    error: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/projects/${id}`, {
        title: this.state.title,
        description: this.state.description,
        github: this.state.github,
      })
      .then((response) => {
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
          github: response.data.github,
          editForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData = () => {
    const id = this.props.match.params.id;
    console.log(id);
    axios
      .get(`/api/projects/${id}`)
      .then((response) => {
        console.log(response);

        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
          github: response.data.github,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  deleteProject = () => {
    const id = this.props.match.params.id;
    console.log(id);

    axios
      .delete(`/api/projects/${id}`)
      .then(() => {
        this.props.history.push("/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm,
    });
  };

  toggleTaskForm = () => {
    this.setState({
      taskForm: !this.state.taskForm,
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    console.log(this.state.taskForm);
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.project) return <></>;

    let allowedToDelete = false;
    const user = this.props.user;
    const owner = this.state.project.owner;
    if (user && user._id === owner) allowedToDelete = true;
    console.log(this.state.title);

    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.project.description}</p>
        {allowedToDelete && (
          <Button variant="danger" onClick={this.deleteProject}>
            Delete this project
          </Button>
        )}
        <Button onClick={this.toggleEditForm}>Show edit form</Button>
        <Button onClick={this.toggleTaskForm}>Show task form</Button>
        {this.state.editForm && (
          <EditProject
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
        {this.state.taskForm && (
          <AddTask
            projectId={this.state.project._id}
            getData={this.getData}
            hideForm={() => this.setState({ taskForm: false })}
          />
        )}
        <TaskList tasks={this.state.project.tasks} />
      </div>
    );
  }
}
