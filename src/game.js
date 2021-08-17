/** @format */

import React from "react";
import Board from "./board";

class Game extends React.Component {
  render() {
    return (
      <div>
        <h1> Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
