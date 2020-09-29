import React from "react";

const Waiting = (props) => {
  return (
    <div className="waiting" style={props.custome}>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Waiting;
