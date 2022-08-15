import React from "react";
import { Link } from "react-router-dom";
import { sound } from "../data/sound";

function Home() {
  return (
    <div>
      <h1 className="hangman__title">Hangman</h1>
      <Link
        onClick={() => sound.click.play()}
        style={{ textDecoration: "none" }}
        to="/start"
      >
        <button className="button start">New Game</button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/instructions">
        <button
          onClick={() => sound.click.play()}
          className="button instructions"
        >
          Instructions
        </button>
      </Link>
    </div>
  );
}

export default Home;
