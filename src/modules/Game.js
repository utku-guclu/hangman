import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import Board from "../modules/Board";

function Game() {
  const {
    winState,
    loseState,
    createLetters,
    guessingWord,
    lives,
    chosenWord,
    reset,
  } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const navigateToEnd = () => {
      navigate("/end");
    };
    if (winState || loseState) {
      // winSound();
      navigateToEnd();
    }
  }, [guessingWord, chosenWord, lives, navigate, loseState, winState]);

  return (
    <div>
      <p className="hangman__stats">
        Lives:
        <span className="hangman__lives">{lives}</span>
      </p>
      <h1 className="hangman__title">Hangman</h1>
      <Board />
      <div className="hangman__word">{guessingWord.join("")}</div>
      <p className="hangman__instructions">
        Pick a letter below to guess the whole word.
      </p>
      <ul className="hangman__letters">{createLetters()}</ul>
      <Link style={{ textDecoration: "none" }} to="/">
        <button onClick={reset} className="button hangman__trigger">
          Main Menu
        </button>
      </Link>
    </div>
  );
}

export default Game;
