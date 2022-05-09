import axios from "axios";
import React, { Component } from "react";

export default class AddGolfer extends Component {
  constructor(props) {
    super(props);

    this.onChangeGolferName = this.onChangeGolferName.bind(this);
    this.onChangeGolferHandicap = this.onChangeGolferHandicap.bind(this);
    this.onChangeGolferTeam = this.onChangeGolferTeam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      golfer_name: "",
      golfer_handicap: "",
      golfer_team: "",
    };
  }

  onChangeGolferName(e) {
    this.setState({
      golfer_name: e.target.value,
    });
  }

  onChangeGolferHandicap(e) {
    this.setState({
      golfer_handicap: e.target.value,
    });
  }

  onChangeGolferTeam(e) {
    this.setState({
      golfer_team: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Golfer Added!`);
    console.log(` Golfer Name     : ${this.state.golfer_name}`);
    console.log(` Golfer Handicap : ${this.state.golfer_handicap}`);
    console.log(` Golfer Team     : ${this.state.golfer_team}`);

    const newGolfer = {
        golfer_name: this.state.golfer_name,
        golfer_handicap: this.state.golfer_handicap,
        golfer_team: this.state.golfer_team
    }

    axios.post("http://localhost:5000/golfers/add", newGolfer)
    .then(res => console.log(res.data));

    this.setState({
      golfer_name: "",
      golfer_handicap: "",
      golfer_team: "",
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="row g-3" onSubmit={this.onSubmit}>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              value={this.state.golfer_name}
              onChange={this.onChangeGolferName}
              placeholder="Golfer Name"
            />
          </div>
          <div className="col-auto">
            <input
              type="number"
              className="form-control"
              value={this.state.golfer_handicap}
              onChange={this.onChangeGolferHandicap}
              placeholder="HC"
              min="0"
              max="50"
            />
          </div>
          <div className="col-auto">
            <input
              type="number"
              className="form-control"
              value={this.state.golfer_team}
              onChange={this.onChangeGolferTeam}
              placeholder="Team"
              min="1"
              max="4"
            />
          </div>
          <div className="col-auto">
              <label className="visually-hidden">Stuff</label>
              <button type="submit" className="btn btn-primary">Add Golfer</button>
          </div>
        </form>
      </div>
    );
  }
}