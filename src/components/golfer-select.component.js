import axios from "axios";
import React from "react";

export default function GolferSelect(props) {
  const golferIndex = props.golferList.findIndex((e) => e._id === props.id);

  async function handleGolferSelect(e) {
    const oldUpdateGolferID = props.id;
    const newUpdateGolferID = props.golferList[e.target.value]._id;

    const updateOldGolfer = {
      golfer_name: props.golferList[golferIndex].golfer_name,
      golfer_hdc: props.golferList[golferIndex].golfer_hdc,
      golfer_team: props.golferList[e.target.value].golfer_team,
    };
    const updateNewGolfer = {
      golfer_name: props.golferList[e.target.value].golfer_name,
      golfer_hdc: props.golferList[e.target.value].golfer_hdc,
      golfer_team: props.team,
    };

    await axios
      .post(
        `http://localhost:5000/golfers/update/${oldUpdateGolferID}`,
        updateOldGolfer
      )
      .then(
        await axios.post(
          `http://localhost:5000/golfers/update/${newUpdateGolferID}`,
          updateNewGolfer
        )
      )
      .then(props.handleGolferSelect());
  }

  return (
    <select
      className="w-75"
      defaultValue={golferIndex}
      onChange={handleGolferSelect}
      autoFocus
      onBlur={props.handleOnBlur}     
    >
      {props.golferList.map((currentGolfer, i) => {
        return (
          <option value={i} key={currentGolfer._id}>
            {currentGolfer.golfer_name}
          </option>
        );
      })}
    </select>
  );
}
