/** @format */

import React from "react";

import Square from "./square";

class Board extends React.Component {
  render() {
    let status = "Next Player: X";
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    );
  }
}

export default Board;
