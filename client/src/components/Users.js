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
        {/* <ul class="ks-cboxtags">
      <li><input type="checkbox" id="checkboxTwo" value="Cotton Candy" checked><label for="checkboxTwo">Cotton Candy</label></input></li>
      <li><input type="checkbox" id="checkboxThree" value="Rarity" checked><label for="checkboxThree">Rarity</label></input></li>
      <li><input type="checkbox" id="checkboxFour" value="Moondancer"><label for="checkboxFour">Moondancer</label></input></li>
      <li><input type="checkbox" id="checkboxFive" value="Surprise"><label for="checkboxFive">Surprise</label></input></li>
      <li><input type="checkbox" id="checkboxSix" value="Twilight Sparkle" checked><label for="checkboxSix">TwilightSparkle</label></input></li>
      <li><input type="checkbox" id="checkboxSeven" value="Fluttershy"><label for="checkboxSeven">Fluttershy</label></input></li>
      <li><input type="checkbox" id="checkboxEight" value="Derpy Hooves"><label for="checkboxEight">Derpy Hooves</label></input></li>
      <li><input type="checkbox" id="checkboxNine" value="Princess Celestia"><label for="checkboxNine">Princess
                      Celestia</label></input></li>
      <li><input type="checkbox" id="checkboxTen" value="Gusty"><label for="checkboxTen">Gusty</label></input></li>
      <li class="ks-selected"><input type="checkbox" id="checkboxEleven" value="Discord"><label for="checkboxEleven">Discord</label></input></li>
      <li><input type="checkbox" id="checkboxTwelve" value="Clover"><label for="checkboxTwelve">Clover</label></input></li>
      <li><input type="checkbox" id="checkboxThirteen" value="Baby Moondancer"><label for="checkboxThirteen">Baby
                      Moondancer</label></input></li>
      <li><input type="checkbox" id="checkboxFourteen" value="Medley"><label for="checkboxFourteen">Medley</label></input></li>
      <li><input type="checkbox" id="checkboxFifteen" value="Firefly"><label for="checkboxFifteen">Firefly</label></input></li>
    </ul> */}
          <ul className="ks-cboxtags">
          <li>
          <input
            id="checkboxOne"
            type="checkbox"
            name="Frontend"
            checked={this.state.specialization.includes("Frontend")}
            onChange={this.handleSpecialization}
          ></input><label for="checkboxOne">Frontend</label></li>
          <li>
          <input
            id="checkboxTwo"
            type="checkbox"
            name="Backend"
            checked={this.state.specialization.includes("Backend")}
            onChange={this.handleSpecialization}
          ></input><label for="checkboxTwo">Backend</label></li>
          <li>
          <input
            id="checkboxThree"
            type="checkbox"
            name="CSS"
            checked={this.state.specialization.includes("CSS")}
            onChange={this.handleSpecialization}
          ></input><label for="checkboxThree">CSS</label></li>
          <li>
          <input
            id="checkboxFour"
            type="checkbox"
            name="React"
            checked={this.state.specialization.includes("React")}
            onChange={this.handleSpecialization}
          ></input><label for="checkboxFour">React</label></li>
          
          <br></br>
          <li>
          <input
            id="checkboxFive"
            type="checkbox"
            name="Bootstrap"
            checked={this.state.specialization.includes("Bootstrap")}
            onChange={this.handleSpecialization}
          ></input>
          <label for="checkboxFive">Bootstrap</label>
          </li>
          <li>
          <input
            id="checkboxSix"
            type="checkbox"
            name="Managment"
            checked={this.state.specialization.includes("Managment")}
            onChange={this.handleSpecialization}
          ></input>
          <label for="checkboxSix">Managment</label></li>
          <li>
          <input
            id="checkboxSeven"
            type="checkbox"
            name="API"
            checked={this.state.specialization.includes("API")}
            onChange={this.handleSpecialization}
          ></input>
          <label for="checkboxSeven">API</label></li>
<li>
          <input
            id="checkboxEight"
            type="checkbox"
            name="Mongo DB"
            checked={this.state.specialization.includes("Mongo DB")}
            onChange={this.handleSpecialization}
          ></input>
          <label for="checkboxEight">Mongo DB</label></li></ul>
        </div>
        <div className="overlay-userlist">
          <UsersList users={this.state.filteredUsers} />
        </div>
      </div>
    );
  }
}
