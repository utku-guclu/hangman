import React, { useRef, useEffect, useContext } from "react";
import { Context } from "../Context";

function Board() {
  const canvasRef = useRef(null);

  const { lives } = useContext(Context);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const context = canvasObj.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "white";

    const draw = (startX, startY, endX, endY) => {
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    };

    const base = (_) => {
      line1();
      line2();
      line3();
    };

    const head = (_) => {
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI * 2);
      context.stroke();
    };

    const line1 = (_) => draw(0, 150, 150, 150);
    const line2 = (_) => draw(10, 0, 10, 300);
    const line3 = (_) => draw(0, 5, 70, 5);

    const rope = (_) => draw(60, 5, 60, 15);

    const torso = (_) => draw(60, 36, 60, 70);

    const rightArm = (_) => draw(60, 46, 100, 50);

    const leftArm = (_) => draw(60, 46, 20, 50);

    const rightLeg = (_) => draw(60, 70, 100, 100);

    const leftLeg = (_) => draw(60, 70, 20, 100);

    const parts = [
      rightLeg,
      leftLeg,
      rightArm,
      leftArm,
      torso,
      head,
      rope,
      base,
    ];

    const render = (_) => parts[lives]();

    lives && render();
  });

  return (
    <canvas ref={canvasRef} className="hangman__board" height="155px"></canvas>
  );
}

export default Board;
