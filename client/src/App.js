import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import ProjectDetails from './components/ProjectDetails';
import TaskDetails from './components/TaskDetails';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render() {
    return (
      <div className="App">
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
        <ProtectedRoute
          exact path='/projects'
          // additional='some additional prop'
          user={this.state.user}
          component={Projects}
        />
        <Route
          exact path='/projects/:id'
          component={ProjectDetails}
        />
        <Route
          exact path='/tasks/:id'
          component={TaskDetails}
        />
        <Route
          exact path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact path='/login'
          render={props => <Login setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
