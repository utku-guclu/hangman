import React, { useState, useEffect } from "react";

import data from "../src/data/words.json";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [result, setResult] = useState({ chosenWord: "", winOrLose: "" });
  const [words, setWords] = useState([...data.words]);
  const [chosenWord, setChosenWord] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [lives, setLives] = useState(7);
  const [guessingWord, setGuessingWord] = useState([]);

  // const wordAPI = process.env.REACT_APP_WORD_API_KEY;
  const wordAPI = "xsssqika68we3i42asc34zq1mgxmt56i2g8wjskbhscutoox7";

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
    "-",
  ];

  //
  const winState = chosenWord === guessingWord.join("");
  const loseState = lives < 1;
  //

  // const resetWords = () => {
  //   setWords
  // }

  const getWord = () => {
    fetch(`https://api.wordnik.com/v4/words.json/randomWord?api_key=${wordAPI}`)
      .then((res) => res.json())
      .then((data) => setWords([...words, data.word]));
  };

  useEffect(() => {
    setChosenWord(chooseWord(words));
  }, [words]);

  const chooseWord = (words) => {
    const randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  };

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
    !isAlreadyTaken(guess) && setGuesses([...guesses, guess]);
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

  const createLetters = () => {
    return letters.map((letter, index) => {
      return (
        <li key={index} onClick={activate} className={`hangman__letter`}>
          {letter}
        </li>
      );
    });
  };

  const reset = () => {
    setGuessingWord("LOADING".split(""));
    getWord();
    setLives(7);
    setChosenWord(chooseWord(words)); // update after fetch
    // setGuessingWord(Array(chosenWord.length).fill("_"));
    setGuesses([]);

    console.log(words);
  };

  return (
    <Context.Provider
      value={{
        lives,
        setLives,
        guessingWord,
        guesses,
        setGuesses,
        createLetters,
        chosenWord,
        setChosenWord,
        setGuessingWord,
        winState,
        loseState,
        result,
        setResult,
        words,
        reset,
        getWord,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
