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
              <div>
                <img src={user.imageUrl} style={{ width: "150px" }} />
                </div>
              </Link>
              <div>
              <Link to={`/users/${user._id}`}>
                {user.name}
                {user.surname}
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
