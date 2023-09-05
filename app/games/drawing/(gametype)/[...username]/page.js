"use client";

import useDraw from "@/hooks/useDraw";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import html2canvas from "html2canvas";

function Page() {
  const [color, setColor] = useState("#000");
  const [drawIdea, setDrawIdea] = useState("");
  const [seconds, setSeconds] = useState(60);

  // changing time when start game

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [stopCanvas, setStopCanvas] = useState(false);

  useEffect(() => {
    // Your initialization logic here (e.g., card shuffling, event listeners)
    // wait 1 second before starting the game
    if (isGameStarted == true) {
      if (seconds >= 0 && seconds !== 1) {
        setTimeout(() => {
          let newSeconds = parseInt(seconds) - 1;

          setSeconds(newSeconds);
        }, 1000);
      } else {
        setIsGameStarted(false);
        setSeconds(60);
        // stop canvas from drawing
        setStopCanvas(true);
      }
    }
  }, [seconds, isGameStarted]);

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine, stopCanvas);

  const generateRandomDrawIdea = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setDrawIdea(items[randomIndex]);
    setIsGameStarted(true);
  };

  // 20 random object to give client to draw
  const items = [
    "Car",
    "House",
    "Tree",
    "Dog",
    "Cat",
    "Bird",
    "Fish",
    "Bike",
    "Boat",
    "Plane",
    "Train",
    "Bus",
    "Truck",
    "Computer",
    "Phone",
    "Tablet",
    "Chair",
    "Couch",
    "Bed",
    "Lamp",
  ];

  const handleScreenshot = () => {
    // Get the canvas element
    const canvas = canvasRef.current;

    // Use html2canvas to capture the canvas
    html2canvas(canvas)
      .then((canvas) => {
        // Convert the captured canvas to a data URL
        const dataUrl = canvas.toDataURL();

        // Create a download link
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "oba_drawing_game_ss.png";

        // Trigger a click event to download the image
        a.click();
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };

  function drawLine({ prevPoint, curentPoint, ctx }) {
    const { x: currX, y: currY } = curentPoint;
    const lineColor = color;
    const lineWidth = 5;

    // let startPoint = prevPoint ?? curentPoint;

    let startPoint = prevPoint !== undefined ? prevPoint : curentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center ">
      <div className="flex flex-col gap-8 mr-8">
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button className="p-2 px-4 bg-black text-white " onClick={clear}>
          Clear
        </button>

        {!isGameStarted ? (
          <button
            className="p-2 px-4 bg-black text-white "
            onClick={generateRandomDrawIdea}
          >
            Start Game
          </button>
        ) : (
          <button
            className="p-2 px-4 bg-black text-white "
            onClick={handleScreenshot}
          >
            Download you drawing
          </button>
        )}
      </div>
      <div className="relative">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-center text-2xl font-semibold">{drawIdea}</h2>
          {drawIdea == "" ? (
            <p className="text-center text-xl font-semibold">
              Click start game to begin
            </p>
          ) : (
            <p className="text-center text-xl font-semibold">
              Try to draw this in 60 seconds
            </p>
          )}
        </div>
        <span className="absolute text-3xl top-0 right-0">{seconds}</span>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          className="border border-black rounded-md"
        />
      </div>
    </div>
  );
}

export default Page;
