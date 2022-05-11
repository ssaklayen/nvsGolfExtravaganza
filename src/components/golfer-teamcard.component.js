import React from "react";
import Golfer from "./golfer.component";

export default function GolferTeamCard(props) {
  return (
    <div className="col">
      <div className="card customCard">
        <div className="card-header">
          <h3>Team {props.team}</h3>
        </div>
        <table className="card-table table" style={{ marginBottom: 0 }}>
          <thead>
            <tr>
              <th className="w-75">Name</th>
              <th className="w-25">Handicap</th>
            </tr>
          </thead>
          <tbody>
            {props.golfers_team.map((currentGolfer) => {
              return (
                <Golfer
                  golfer={currentGolfer}
                  golfers_all={props.golfers_all}
                  team={props.team}
                  key={currentGolfer._id}
                  renderGolferList={props.renderGolferList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
