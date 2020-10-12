import React, { Component } from 'react';
import './../game/game.css';
import Board from './../board/Board'

export default class Game extends Component {
  state = {
    xIsNext: true,
    stepNumber: 0,
    history: [{ squares: Array(9).fill(null) }],
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = checkWinner(squares);
    if(winner || squares[i]){
        return;
    }
    squares[i] = !this.state.xIsNext ? "O" : "X";

    this.setState({
      history: history.concat({ squares: squares }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner is " + winner;
    } else {
      status = "Next Player is " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <h1 className="title"> Tic Tac Toe </h1>
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          />
          <h1 className="win"> {status} </h1>
          <button className="btn primary ui button" onClick={() => window.location.reload()} > Play Again! </button>
        </div>
      </div>
    );
  }
}

const checkWinner = (squares) => {
    const combinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7], 
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let i=0;i<combinations.length;i++){
        const [a,b,c] = combinations[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a];
        }
    }
    return null;
}