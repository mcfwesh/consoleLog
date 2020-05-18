import React from "react";
import { Link, Switch } from "react-router-dom";

const UsersList = (props) => {
  console.log(props.course);
  return (

    <div className="overlay-users">
      {props.users.length > 0}

      {props.users.map((user) => {
        return (
          <div className="userCard" key={user._id}>
          <div className="userCardRed">
              <Link to={`/users/${user._id}`}>
              <div className="userCardImg">
                <img src={user.imageUrl} />
                </div>
              </Link>
              <div className="userCardBody">
                <div className="userCardBodyTitle">
                  <Link to={`/users/${user._id}`}>
                  <h2>{user.name} {user.surname}</h2>
                  </Link>
                </div>
                <div className="userCardDesctiption">
                  <p>{user.description}</p>
                </div>
                <div className="userCarSpecialization">
              <p>Specialization: </p> {user.specialization.map((spezi) => {
                return <p>{spezi}</p>;
              })}
              </div>
              </div>
              </div>
          </div>
        )
      })}
      </div>
  );
};

export default UsersList;
