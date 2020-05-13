import React from "react";
import { Link } from "react-router-dom";

const UsersList = (props) => {
  return (
    <div>
      <h1>User List</h1>
      {props.users.length > 0 && <h2>Users:</h2>}

      {props.users.map((user) => {
        return (
          <div key={user._id}>
            <h3>
              <Link to={`/users/${user._id}`}>
                <img src={user.imageUrl} style={{ width: "150px" }} />
              </Link>
              <Link to={`/users/${user._id}`}>
                {user.name}
                {user.surname}
              </Link>
              <p>{user.description}</p>
              {user.specialization.map((spezi) => {
                return <p>{spezi}</p>;
              })}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
