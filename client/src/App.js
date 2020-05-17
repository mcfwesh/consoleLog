import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Projects from "./components/Projects";
import NavbarMain from "./components/NavbarMain";
import Navbar from "./components/Navbar";
import ProjectDetails from "./components/ProjectDetails";
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
    return (
      <div className="App">
        <NavbarMain handleCourse={this.handleCourse} />
        <Navbar user={this.state.user} setUser={this.setUser} />

        {/* <Route
          exact path='/projects'
          component={Projects}
        /> */}
        {/* this route is now protected */}
        {/* <Route
          exact path='/projects'
          render={props => {
            if (this.state.user) return <Projects {...props} />
            else return <Redirect to='/' />
          }}
        /> */}
        <Switch>
          <ProtectedRoute
            exact
            path="/projects"
            // additional='some additional prop'
            user={this.state.user}
            component={Projects}
          />
          <Route
            exact
            path="/projects"
            // additional='some additional prop'
            user={this.state.user}
            component={Projects}
          />
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/addprojects" component={AddProject} />
          <Route exact path="/editproject/:id" component={EditProject} />
          <Route exact path="/tasks/:id" component={TaskDetails} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />
          <Route exact path="/users" myuser={this.state.user} component={Users} />
          <Route exact path="/panel" component={Panel} />
          <Route exact path="/notes" component={Notes} />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />
          <Route exact path="/users/:id" myuser={this.state.user} component={UserDetails} />
          <Home />
        </Switch>
      </div>
    );
  }
}

export default App;
