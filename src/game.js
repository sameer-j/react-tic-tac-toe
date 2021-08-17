/** @format */

import React from "react";
import Board from "./board";

const PLAYERS = {
  true: "X",
  false: "O",
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      isXNext: true,
      showStep: 0,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.showStep + 1);
    const current = history[this.state.showStep];
    if (this.state.winner || current[i]) {
      // preventing overwriting
      return;
    }
    let updatedSquares = [...current.squares];
    updatedSquares[i] = PLAYERS[this.state.isXNext];
    let winner = this.calculateWinner(updatedSquares);
    this.setState({
      history: [...history, { squares: updatedSquares }],
      isXNext: !this.state.isXNext,
      winner: winner,
      showStep: history.length,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.showStep];

    let status = this.getStatus();
    let moves = this.getMoves();

    return (
      <div>
        <h1> Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getStatus() {
    if (this.state.winner) {
      return `Winner is ${this.state.winner}`;
    } else {
      return `Next Player: ${PLAYERS[this.state.isXNext]}`;
    }
  }

  getMoves() {
    const history = this.state.history;
    let buttonDesc;
    return history.map((move, step) => {
      if (step === 0) {
        buttonDesc = "Go to game start";
      } else {
        buttonDesc = `Go to move #${step}`;
      }
      return (
        <li key={"step" + step}>
          <button onClick={() => this.jumpTo(step)}>{buttonDesc}</button>
        </li>
      );
    });
  }

  jumpTo(step) {
    this.setState({
      winner: this.calculateWinner(this.state.history[step].squares),
      showStep: step,
      isXNext: step % 2 === 0,
    });
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

export default Game;
