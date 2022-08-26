import { Link } from "react-router-dom";
import { Context } from "../Context";
import React, { useContext } from "react";

function Home() {
  const { reset } = useContext(Context);
  return (
    <div>
      <h1 className="hangman__title">Hangman</h1>
      <Link style={{ textDecoration: "none" }} to="/start">
        <button onClick={reset} className="button start">
          New Game
        </button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/instructions">
        <button className="button instructions">Instructions</button>
      </Link>
    </div>
  );
}

export default Home;
