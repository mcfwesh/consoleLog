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
      let jobs = response.data;
      let jobSorted = [...jobs];
      jobSorted.sort((a, b) => new Date(b.created) - new Date(a.created));
      this.setState({
        jobs: jobSorted,
      });
    });
  };

  componentDidMount() {
    this.getJobs();
  }
  render() {
    return (
      <>
        <div className="jobs-search">
          <label htmlFor="search">
            <span className="blue-color">S</span>earch By Company or Job Title :
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={this.state.search}
            onChange={this.handleSearch}
            placeholder="Ex: programmer, ux,data... "
          />
          <img clasName="link-job" src="../search.png"></img>
        </div>
        <ul className="jobs black blue-color">
          <h3>Job Title</h3>
          <h3>Company</h3>
          <h3>City</h3>
          <h3>Date Posted</h3>
        </ul>
        {this.state.jobs ? (
          this.state.jobs
            .filter(
              (job) =>
                job.title.includes("IT") ||
                job.title.includes("UX") ||
                job.title.includes("Data") ||
                job.category.label === "IT-Stellen"
            )
            .filter((job) => {
              if (this.state.search) {
                return (
                  job.title
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ||
                  job.company.display_name
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                );
              } else {
                return true;
              }
            })
            .map((job) => {
              return (
                <ul className="jobs job-line" key={job._id}>
                  <li>{job.title}</li>
                  <li>{job.company.display_name}</li>
                  <li>
                    {job.location.area[2]} {job.location.area[1]}
                  </li>
                  <li>{job.created.slice(0, 10)}</li>

                  <li>
                    <div class="container">
                      <a href={`${job.redirect_url}`}>
                        <img clasName="link-job" src="../link.png"></img>Go to
                        Job
                      </a>
                    </div>
                  </li>
                </ul>
              );
            })
        ) : (
          <img className="loading" src={process.env.PUBLIC_URL + "/4V0b.gif"} />
        )}
      </>
    );
  }
}

export default Jobs;
