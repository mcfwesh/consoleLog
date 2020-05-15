import React from "react";
import { Link, Switch } from "react-router-dom";

const UsersList = (props) => {
  return (
    <div className="overlay-users">
      {props.users.length > 0}

      {props.users.map((user) => {
        return (
          <div className="userCard" key={user._id}>
              <Link to={`/users/${user._id}`}>
              <div className="userCardImg">
                <img src={user.imageUrl} />
                </div>
              </Link>
              <div className="userCardBody">
              <Link to={`/users/${user._id}`}>
              <h2>{user.name} {user.surname}</h2>
              </Link>
              <p>{user.description}</p>
              {user.specialization.map((spezi) => {
                return <p>{spezi}</p>;
              })}
              </div>
          </div>
        );
      })}
      </div>
  );
};

export default UsersList;
