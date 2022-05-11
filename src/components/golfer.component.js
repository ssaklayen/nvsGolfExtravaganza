import React, { useState } from "react";
import GolferSelect from "./golfer-select.component";

export default function Golfer(props) {
  const [isClicked, setClick] = useState(false);

  function handleGolferClick() {
    setClick(true);
  }

  function handleOnBlur() {
    setClick(false);
  }

  function handleGolferSelect() {
    setClick(false);
    props.renderGolferList();
  }

  return (
    <tr>
      <td id={props.golfer._id} onClick={handleGolferClick} className="w-75">
        {isClicked ? ( 
            <GolferSelect
              golferList={props.golfers_all}
              team={props.team}
              id={props.golfer._id}
              handleGolferSelect={handleGolferSelect}
              handleOnBlur={handleOnBlur}
            />
        ) : (
          props.golfer.golfer_name
        )}
      </td>
      <td className="w-25 text-center">{props.golfer.golfer_hdc}</td>
    </tr>
  );
}
