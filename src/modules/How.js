import React from "react";
import { Link } from "react-router-dom";

function How() {
  return (
    <div>
      <h1 className="hangman__title">Instructions</h1>
      <ul className="how">
        <li>How you play!</li>
        <li>Game will create a random word for you to guess</li>
        <li>You have to guess the word by choosing the letters</li>
        <li>Remember, you only have 7 lives!</li>
        <li>If you run out of your lives, you will be hanged. ☠</li>
      </ul>
      <Link style={{ textDecoration: "none" }} to="/">
        <button className="button hangman__trigger">Main Menu</button>
      </Link>
    </div>
  );
}

export default How;
