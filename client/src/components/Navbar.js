import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div>
          <Link to="/">Users</Link>
        </div>
        <div>
          <Link to="/">Jobs</Link>
        </div>
        <div>
          <Link to="/">Notes</Link>
        </div>
        <div>
          <Link to="/">Alumni</Link>
        </div>
      </div>
      <div className="navbar-right">
        {props.user ? (
          <>
            {/* <Nav.Brand>
            <Link to='/projects'>Projects</Link>
          </Nav.Brand> */}
            <div>
              <Link to="/" onClick={() => handleLogout(props)}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/signup">Signup</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
