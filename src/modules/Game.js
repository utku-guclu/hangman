import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sound } from "../data/sound";
import { Context } from "../Context";

function Game() {
  const [words, setWords] = useState(["apple", "ball", "orange"]);
  const [chosenWord, setChosenWord] = useState("fruit");
  const [guesses, setGuessess] = useState([]);
  const [lives, setLives] = useState(7);
  const [guessingWord, setGuessingWord] = useState([]);

  const navigate = useNavigate();

  const { result, setResult } = useContext(Context);

  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  //
  const winState = chosenWord === guessingWord.join("");
  const loseState = lives < 1;
  //

  useEffect(() => {
    const finalResult = (_) => {
      if (winState) {
        return "win";
      } else if (loseState) {
        return "lose";
      } else {
        return "I don't know";
      }
    };
    setResult({ chosenWord, winOrLose: `${finalResult()}` });
  }, [winState, loseState, chosenWord, setResult]);

  useEffect(() => {
    const navigateToEnd = () => {
      navigate("/end");
    };

    if (winState) {
      sound.win.play();
      navigateToEnd();
    } else if (loseState) {
      sound.lose.play();
      navigateToEnd();
    }
  }, [guessingWord, chosenWord, lives, navigate, loseState, winState]);

  useEffect(() => {
    setChosenWord(chooseWord(words));
  }, [words]);

  useEffect(() => {
    setGuessingWord(Array(chosenWord.length).fill("_"));
  }, [chosenWord]);

  const updateGuessingWord = (letter) => {
    chosenWord.split("").forEach((item, index) => {
      if (item === letter) {
        setGuessingWord((prevArr) => {
          prevArr[index] = item;
          return prevArr;
        });
      }
    });
  };

  const isAlreadyTaken = (letter) => {
    return guesses.includes(letter);
  };

  const check = (guess) => {
    !isAlreadyTaken(guess) && setGuessess([...guesses, guess]);
    if (chosenWord.includes(guess)) {
      updateGuessingWord(guess);
    } else {
      setLives((prevLive) => prevLive - 1);
    }
  };

  const activate = (e) => {
    const letter = e.target.innerHTML;
    check(letter);
    if (!isAlreadyTaken(letter)) {
      e.target.className = "hangman__letter hangman__letter--active";
    }
  };

  const chooseWord = (words) => {
    const randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  };

  const createLetters = () => {
    return letters.map((letter, index) => {
      return (
        <li key={index} onClick={activate} className={`hangman__letter`}>
          {letter}
        </li>
      );
    });
  };

  return (
    <div>
      <p className="hangman__stats">
        Lives:
        <span className="hangman__lives">{lives}</span>
      </p>
      <h1 className="hangman__title">Hangman</h1>
      <canvas className="hangman__board" height="155px"></canvas>
      <div className="hangman__word">{guessingWord.join("")}</div>
      <p className="hangman__instructions">
        Pick a letter below to guess the whole word.
      </p>
      <ul className="hangman__letters">{createLetters()}</ul>
      <Link style={{ textDecoration: "none" }} to="/">
        <button
          onClick={() => sound.click.play()}
          className="button hangman__trigger"
        >
          Main Menu
        </button>
      </Link>
    </div>
  );
}

export default Game;
