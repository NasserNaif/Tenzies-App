import React from "react";

function Dice(props) {
  const style = { backgroundColor: props.isHeld ? "#3CCF4E" : "white" };
  return (
    <div className="Dice" style={style} onClick={props.holdDice}>
      <h1>{props.value}</h1>
    </div>
  );
}

export default Dice;
