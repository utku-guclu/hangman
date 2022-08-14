import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import Game from "./modules/Game";
import How from "./modules/How";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="hangman">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/start" element={<Game />}></Route>
            <Route path="/instructions" element={<How />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
