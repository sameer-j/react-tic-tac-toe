/** @format */

import React from "react";

import Square from "./square";

const PLAYERS = {
  true: "X",
  false: "O",
};
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXnext: true,
      winner: null,
    };
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  handleClick(i) {
    if (this.state.winner || this.state.squares[i]) {
      // preventing overwriting
      return;
    }
    let updatedSquares = [...this.state.squares];
    updatedSquares[i] = PLAYERS[this.state.isXnext];
    let winner = this.calculateWinner(updatedSquares);
    this.setState({
      squares: updatedSquares,
      isXnext: !this.state.isXnext,
      winner: winner,
    });
  }
  render() {
    let status;
    if (this.state.winner) {
      status = `Winner is ${this.state.winner}`;
    } else {
      status = `Next Player: ${PLAYERS[this.state.isXnext]}`;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  calculateWinner(squares) {
    let results = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of results) {
      let [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}

export default Board;
