import React, { Component } from "react";
import axios from "axios";
import UsersList from "./UsersList";
import Notes from "./Notes";

export default class Users extends Component {
  state = {
    users: [],
    specialization: [],
    filteredUsers: [],
  };

  componentDidMount = () => {
    this.getData();

    //console.log("componenet did mount", this.state.specialization);
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
        let boom = response.data.filter(
          (fil) => fil.classroom == this.props.course
        );

        //console.log(boom, response);
        //console.log(response);
        this.setState({
          users: boom,
          filteredUsers: boom,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    //console.log("nate Love you", this.props.course);
    return (
      <div className="overlay-user">
        <p className="filter-header">
          <strong>Filter By Specializations:</strong>
        </p>
        {this.props.course == "Web Dev" ? (
          <div className="overlay-user-filter">
            <ul className="ks-cboxtags">
              <li>
                <input
                  id="checkboxOne"
                  type="checkbox"
                  name="Frontend"
                  checked={this.state.specialization.includes("Frontend")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxOne">Frontend</label>
              </li>
              <li>
                <input
                  id="checkboxTwo"
                  type="checkbox"
                  name="Backend"
                  checked={this.state.specialization.includes("Backend")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxTwo">Backend</label>
              </li>
              <li>
                <input
                  id="checkboxThree"
                  type="checkbox"
                  name="CSS"
                  checked={this.state.specialization.includes("CSS")}
                  onChange={this.handleSpecialization}
                ></input>
                <label for="checkboxThree">CSS</label>
              </li>
              <li>
                <input
                  id="checkboxFour"
                  type="checkbox"
                  name="React"
                  checked={this.state.specialization.includes("React")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxFour">React</label>
              </li>

              <br></br>
              <li>
                <input
                  id="checkboxFive"
                  type="checkbox"
                  name="Bootstrap"
                  checked={this.state.specialization.includes("Bootstrap")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxFive">Bootstrap</label>
              </li>
              <li>
                <input
                  id="checkboxSix"
                  type="checkbox"
                  name="Managment"
                  checked={this.state.specialization.includes("Managment")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxSix">Managment</label>
              </li>
              <li>
                <input
                  id="checkboxSeven"
                  type="checkbox"
                  name="API"
                  checked={this.state.specialization.includes("API")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxSeven">API</label>
              </li>
              <li>
                <input
                  id="checkboxEight"
                  type="checkbox"
                  name="Mongo DB"
                  checked={this.state.specialization.includes("Mongo DB")}
                  onChange={this.handleSpecialization}
                ></input>
                <label htmlFor="checkboxEight">Mongo DB</label>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div className="overlay-userlist">
          <UsersList
            courses={this.props.course}
            myuser={this.props.myuser}
            users={this.state.filteredUsers}
          />
        </div>
      </div>
    );
  }
}
