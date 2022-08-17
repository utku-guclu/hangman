import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="hangman__title">Hangman</h1>
      <Link style={{ textDecoration: "none" }} to="/start">
        <button className="button start">New Game</button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/instructions">
        <button className="button instructions">Instructions</button>
      </Link>
    </div>
  );
}

export default Home;
