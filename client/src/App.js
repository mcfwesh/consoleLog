import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Projects from "./components/Projects";
import NavbarMain from "./components/NavbarMain";
import Navbar from "./components/Navbar";
import ProjectDetails from "./components/ProjectDetails";
import ProjectList from "./components/ProjectList";
import TaskDetails from "./components/TaskDetails";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import Panel from "./components/Panel";
import Notes from "./components/Notes";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import EditUsers from "./components/EditUsers";

class App extends React.Component {
  state = {
    user: this.props.user,
    course: "",
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  handleCourse = (event) => {
    this.setState({
      course: event.target.id,
    });
  };

  render() {
    //console.log("this is the user", this.state.user._id);
    return (
      <div className="App">
        <NavbarMain handleCourse={this.handleCourse} />
        <Navbar user={this.state.user} setUser={this.setUser} />

        <Switch>
          <Route
            exact
            path="/users/:id"
            render={(props) => (
              <UserDetails user={this.state.user} {...props} />
            )}
          />

          <Route exact path="/edituser/:id" component={EditUsers} />
          <ProtectedRoute></ProtectedRoute>

          <Route
            exact
            path="/projects"
            render={(props) => {
              return <Projects user={this.state.user} {...props} />;
            }}
          />
          {/* <ProtectedRoute
<<<<<<< HEAD
>>>>>>> 78147e53ce4b32fb33186e827f838f251756853a
=======

>>>>>>> 5a338bf8d377cda4d41371f05738f73784d1b1fb
            exact
            path="/projects"
            // additional='some additional prop'
            user={this.state.user}
            identifcation={this.state.user}
            component={Projects}
          /> */}
          {/* <Route
            exact
            path="/projects"
            //additional='some additional prop'
            user={this.state.user}
            //identifcation={this.state.user}
            component={Projects}
          /> */}
          <Route exact path="/projects/:id" component={ProjectDetails} />

          <ProtectedRoute
            exact
            path="/addprojects"
            user={this.state.user}
            component={AddProject}
          />

          <Route exact path="/editproject/:id" component={EditProject} />
          <Route exact path="/tasks/:id" component={TaskDetails} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />

          <Route
            exact
            path="/users"
            identifcation={this.state.user}
            component={Users}
          />

          <Route exact path="/panel" component={Panel} />
          <Route
            exact
            path="/notes"
            render={(props) => <Notes user={this.state.user} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />

          <Home />
        </Switch>
      </div>
    );
  }
}

export default App;
