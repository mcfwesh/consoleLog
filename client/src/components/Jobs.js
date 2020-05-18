import React, { Component } from "react";
import axios from "axios";

class Jobs extends Component {
  state = {
    jobs: null,
    search: "",
  };

  handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  getJobs = () => {
    axios.get(`/api/jobs/`).then((response) => {
      console.log("Jobs", response.data);
      let jobs = response.data;
      this.setState({
        jobs: jobs,
      });
    });
  };

  componentDidMount = () => {
    this.getJobs();
  };
  render() {
    console.log(this.state.search);

    return (
      <div>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleSearch}
        />
        {this.state.jobs &&
          this.state.jobs
            .filter((job) => {
              if (this.state.search) {
                return job.title
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase());
              } else {
                return true;
              }
            })
            .map((job) => (
              <ul className="jobs" key={job._id}>
                <li>{job.title}</li>
                <li>{job.company.display_name}</li>
                <li>
                  {job.location.area[1]}, {job.location.area[0]}
                </li>
                <li>
                  <a href={`${job.redirect_url}`}>Go to Job</a>
                </li>
              </ul>
            ))}
      </div>
    );
  }
}

export default Jobs;
