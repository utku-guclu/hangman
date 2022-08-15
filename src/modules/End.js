import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

function End() {
  const { result } = useContext(Context);

  return (
    <div>
      <h1 class="hangman__title">GAME OVER</h1>
      <p className="result">
        You {result.winOrLose.toUpperCase()}!<br />
        The word is ✏ {result.chosenWord.toUpperCase()}.
      </p>
      <Link style={{ textDecoration: "none" }} to="/">
        <button className="button hangman__trigger">Main Menu</button>
      </Link>
    </div>
  );
}

export default End;
