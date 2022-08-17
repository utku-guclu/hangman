import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [result, setResult] = useState({ chosenWord: "", winOrLose: "" });
  const [words, setWords] = useState(["apple", "ball", "orange"]);
  const [chosenWord, setChosenWord] = useState("word"); //
  const [guesses, setGuessess] = useState([]);
  const [lives, setLives] = useState(7);
  const [guessingWord, setGuessingWord] = useState([]);

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
        return "WIN";
      }
      return "LOSE";
    };
    setResult({ chosenWord, winOrLose: `${finalResult()}` });
  }, [winState, loseState, chosenWord, setResult]);

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
    <Context.Provider
      value={{
        lives,
        setLives,
        guessingWord,
        createLetters,
        chosenWord,
        chooseWord,
        setChosenWord,
        setGuessingWord,
        winState,
        loseState,
        result,
        words,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
