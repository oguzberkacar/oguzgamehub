import React, { useState } from "react";

import "../public/css/tictactoe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameActive, setIsGameActive] = useState(true);
  const [announcer, setAnnouncer] = useState("");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isValidAction = (tile) => {
    return tile === "";
  };

  const handleResultValidation = (newBoard) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        announce(currentPlayer === "X" ? "PLAYERX_WON" : "PLAYERO_WON");
        setIsGameActive(false);
        return;
      }
    }

    if (!board.includes("")) {
      announce("TIE");
    }
  };

  const announce = (type) => {
    switch (type) {
      case "PLAYERO_WON":
        setAnnouncer("Player O Won");
        break;
      case "PLAYERX_WON":
        setAnnouncer("Player X Won");
        break;
      case "TIE":
        setAnnouncer("Tie");
        break;
      default:
        setAnnouncer("");
        break;
    }
  };

  const userAction = (index) => {
    console.log(index);
    if (isValidAction(board[index]) && isGameActive) {
      const newBoard = [...board];
      console.log(newBoard);
      newBoard[index] = currentPlayer;
      console.log(newBoard);
      setBoard(newBoard);
      //    new board has more then to current player
      if (newBoard.filter((tile) => tile === currentPlayer).length > 2) {
        console.log("here");
        handleResultValidation(newBoard);
      }
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(""));
    setIsGameActive(true);
    setAnnouncer("");
    setCurrentPlayer("X");
  };

  return (
    <main className="background tictactoeContainer">
      <section className="title">
        <h1>Tic Tac Toe</h1>
      </section>
      <section className="display">
        Player{" "}
        <span className={`display-player player${currentPlayer}`}>
          {currentPlayer}
        </span>
        's turn
      </section>
      <section className="container">
        {board.map((tile, index) => (
          <div
            key={index}
            className={`tile player${tile}`}
            onClick={() => userAction(index)}
          >
            {tile}
          </div>
        ))}
      </section>
      <section className={`display announcer ${announcer ? "" : "hide"}`}>
        {announcer}
      </section>
      <section className="controls">
        <button id="reset" onClick={resetBoard}>
          Reset
        </button>
      </section>
    </main>
  );
};

export default TicTacToe;
