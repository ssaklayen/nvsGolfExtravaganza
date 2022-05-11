import React, { Component } from "react";
import axios from "axios";
import GolferTeamCard from "./golfer-teamcard.component";

export default class GolferList extends Component {
  constructor(props) {
    super(props);
    this.renderGolferList = this.renderGolferList.bind(this);

    this.state = {
      golfers_all: [],
      golfers_team1: [],
      golfers_team2: [],
      golfers_team3: [],
      golfers_team4: [],
    };
  }

  async renderGolferList() {
    await axios
      .get("http://localhost:5000/golfers/")
      .then((res) => {
        this.setState({
          golfers_all: res.data,
          golfers_team1: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 1
          ).sort((a,b) => a.golfer_hdc - b.golfer_hdc),
          golfers_team2: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 2
          ).sort((a,b) => a.golfer_hdc - b.golfer_hdc),
          golfers_team3: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 3
          ).sort((a,b) => a.golfer_hdc - b.golfer_hdc),
          golfers_team4: res.data.filter(
            (currentGolfer) => currentGolfer.golfer_team === 4
          ).sort((a,b) => a.golfer_hdc - b.golfer_hdc),
        });
      })
      .catch((err) => console.log(err));
  }

  async componentDidMount() {
    await this.renderGolferList();
  }

  render() {
    return (
      <div className="container-fluid">
        <h3>NVS Golfers</h3>
        <div className="row">
          <GolferTeamCard
            golfers_team={this.state.golfers_team1}
            golfers_all={this.state.golfers_all}
            team="1"
            renderGolferList={this.renderGolferList}
          />
          <GolferTeamCard
            golfers_team={this.state.golfers_team2}
            golfers_all={this.state.golfers_all}
            team="2"
            renderGolferList={this.renderGolferList}
          />
          <GolferTeamCard
            golfers_team={this.state.golfers_team3}
            golfers_all={this.state.golfers_all}
            team="3"
            renderGolferList={this.renderGolferList}
          />
          <GolferTeamCard
            golfers_team={this.state.golfers_team4}
            golfers_all={this.state.golfers_all}
            team="4"
            renderGolferList={this.renderGolferList}
          />
        </div>
      </div>
    );
  }
}
