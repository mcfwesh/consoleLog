import React, { Component } from "react";
import axios from "axios";
import UsersList from "./UsersList";

export default class Users extends Component {
  state = {
    users: [],
    specialization: [],
    filteredUsers: [],
  };

  componentDidMount = () => {
    this.getData();
    console.log("componenet did mount", this.state.specialization);
  };

  handleSpecialization = (event) => {
    const name = event.target.name;
    //console.log(name);
    let newSpezialization;
    if (event.target.checked) {
      if (!this.state.specialization.includes(name)) {
        newSpezialization = [...this.state.specialization, name];
      }
    } else {
      let crazy = [...this.state.specialization];
      crazy.splice(this.state.specialization.indexOf(name), 1);
      newSpezialization = crazy;
    }

    if (!newSpezialization.length) {
      return this.setState({
        filteredUsers: this.state.users,
        specialization: newSpezialization,
      });
    }

    let newUsers = [];
    for (let i = 0; i < newSpezialization.length; i++) {
      const currente = newSpezialization[i];
      let filteredUser = this.state.users.filter((user) => {
        return user.specialization.includes(currente);
      });
      newUsers = [...newUsers, ...filteredUser];
    }

    let makeunique = [...new Set(newUsers.map(JSON.stringify))].map(JSON.parse);

    this.setState({
      specialization: newSpezialization,
      filteredUsers: makeunique,
    });
  };

  getData = () => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
          filteredUsers: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    //console.log("State", this.state.specialization);
    // console.log("State, ", this.state);

    return (
      <div className="overlay-user">
        <div className="overlay-user-filter">
          <label>Spezialization (Max 2 options):</label>
          <br></br>
          <input
            type="checkbox"
            name="Frontend"
            checked={this.state.specialization.includes("Frontend")}
            onChange={this.handleSpecialization}
          ></input>
          <label>Frontend</label>
          <input
            type="checkbox"
            name="Backend"
            checked={this.state.specialization.includes("Backend")}
            onChange={this.handleSpecialization}
          ></input>
          <label>Backend</label>
          <input
            type="checkbox"
            name="CSS"
            checked={this.state.specialization.includes("CSS")}
            onChange={this.handleSpecialization}
          ></input>
          <label>CSS</label>
          <input
            type="checkbox"
            name="React"
            checked={this.state.specialization.includes("React")}
            onChange={this.handleSpecialization}
          ></input>
          <label>React</label>
          <br></br>
          <input
            type="checkbox"
            name="Bootstrap"
            checked={this.state.specialization.includes("Bootstrap")}
            onChange={this.handleSpecialization}
          ></input>
          <label>Bootstrap</label>
          <input
            type="checkbox"
            name="Managment"
            checked={this.state.specialization.includes("Managment")}
            onChange={this.handleSpecialization}
          ></input>
          <label>Managment</label>
          <input
            type="checkbox"
            name="API"
            checked={this.state.specialization.includes("API")}
            onChange={this.handleSpecialization}
          ></input>
          <label>API</label>
          <input
            type="checkbox"
            name="Mongo DB"
            checked={this.state.specialization.includes("Mongo DB")}
            onChange={this.handleSpecialization}
          ></input>
          <label>Mongo DB</label>
        </div>
        <div className="overlay-userlist">
      <UsersList users={this.state.filteredUsers} />
      </div>
      </div>
    );
  }
}
