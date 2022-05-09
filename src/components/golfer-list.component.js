import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Golfer = (props) => (
  <tr>
    <td className="w-75">{props.golfer.golfer_name}</td>
    <td className="w-25 text-center">{props.golfer.golfer_handicap}</td>
  </tr>
);

const GolferTeamCard = (props) => (
  <div className="col">
    <div className="card customCard">
      <div className="card-header">
        <h3>Team {props.team}</h3>
      </div>
      <table className="card-table table" style={{marginBottom: 0}}>
        <thead>
          <tr>
            <th className="w-75">Name</th>
            <th className="w-25">Handicap</th>
          </tr>
        </thead>
        <tbody>
          {props.golfers.map((currentGolfer) => {
            return <Golfer golfer={currentGolfer} key={currentGolfer._id} />;
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default class GolferList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      golfers_all: [],
      golfers_team1: [],
      golfers_team2: [],
      golfers_team3: [],
      golfers_team4: [],
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:5000/golfers/")
      .then((res) => {
        this.setState({
          golfers_all: res.data,
          golfers_team1: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 1
          ),
          golfers_team2: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 2
          ),
          golfers_team3: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 3
          ),
          golfers_team4: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 4
          ),
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container-fluid">
        <h3>NVS Golfers</h3>
        <div className="row">
          <GolferTeamCard golfers={this.state.golfers_team1} team="1" />
          <GolferTeamCard golfers={this.state.golfers_team2} team="2" />
          <GolferTeamCard golfers={this.state.golfers_team3} team="3" />
          <GolferTeamCard golfers={this.state.golfers_team4} team="4" />
        </div>
      </div>
    );
  }
}
