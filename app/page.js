"use client"; // This is a client component 👈🏽

import GameCard from "@/components/gameCard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [isNameSet, setIsNameSet] = useState(true);

  const handleNameChange = (e) => {
    localStorage.setItem("name", name);
    setIsNameSet(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("name")) {
        console.log("name var");
        console.log(localStorage.getItem("name"));
        setName(localStorage.getItem("name"));
        setIsNameSet(true);
      } else {
        setIsNameSet(false);
      }
    }
  }, []);

  useEffect(() => {
    console.log(isNameSet);
  }, [isNameSet]);

  const games = [
    {
      name: "Tic Tac Toe",
      description: "Play Tic Tac Toe with your friends.",
      image: "ticxo.png",
      link: "tictactoe",
      hasmulti: true,
    },
    {
      name: "Tales",
      description: "Your imagination is the limit.",
      image: "tales.png",
      link: "tales",
      hasmulti: false,
    },
    {
      name: "Mathcing Game",
      description: "Play Tic Tac Toe with your friends.",
      image: "matching.png",
      link: "memory",
      hasmulti: true,
    },
    {
      name: "Drawing Game",
      description: "Draw and guess with your friends.",
      image: "headbg.png",
      link: "drawing",
      hasmulti: true,
    },
  ];
  return (
    <main className="flex min-h-screen  homebg flex-col items-center p-8 sm:p-16 md:p-24 md:py-12">
      <div className="text-container my-8 text-2xl sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>Oguz Berk Acar</h1>
      </div>
      {!isNameSet ? (
        <div className="flex w-full z-10 flex-col md:flex-row mb-8 gap-4 items-center justify-center">
          <input
            className="border rounded-md p-2 w-full md:w-1/2 mt-4 text-center"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button
            className="border rounded-md p-2 w-full md:w-1/2 mt-4"
            onClick={() => handleNameChange()}
          >
            Enter
          </button>
        </div>
      ) : (
        ""
      )}

      <div className={`flex w-full flex-col md:grid ${games.length % 2 == 0 ? ' grid-cols-2' : 'md:grid-cols-3'} xl:grid-cols-4  gap-8 items-start justify-center`}>
        {games.map((game) => (
          <GameCard
            className=""
            game={game}
            name={name}
            key={game.name}
          ></GameCard>
        ))}
      </div>

      <div className="backwrap gradient">
        <div className="back-shapes">
          <span
            className="floating circle"
            style={{
              top: "66.59856996935649%",
              left: "13.020833333333334%",
              animationDelay: "-0.9s",
            }}
          ></span>
          <span
            className="floating triangle"
            style={{
              top: "31.46067415730337%",
              left: "33.59375%",
              animationDelay: "-4.8s",
            }}
          ></span>
          <span
            className="floating cross"
            style={{
              top: "76.50663942798774%",
              left: "38.020833333333336%",
              animationDelay: "-4s",
            }}
          ></span>
          <span
            className="floating square"
            style={{
              top: "21.450459652706844%",
              left: "14.0625%",
              animationDelay: "-2.8s",
            }}
          ></span>

          <span
            className="floating cross"
            style={{
              top: "55.87334014300306%",
              left: "27.135416666666668%",
              animationDelay: "-2.25s",
            }}
          ></span>
          <span
            className="floating cross"
            style={{
              top: "49.54034729315628%",
              left: "53.75%",
              animationDelay: "-2s",
            }}
          ></span>

          <span
            className="floating square"
            style={{
              top: "28.19203268641471%",
              left: "25.208333333333332%",
              animationDelay: "-4.45s",
            }}
          ></span>
          <span
            className="floating circle"
            style={{
              top: "39.7344228804903%",
              left: "10.833333333333334%",
              animationDelay: "-3.35s",
            }}
          ></span>
          <span
            className="floating triangle"
            style={{
              top: "77.83452502553627%",
              left: "24.427083333333332%",
              animationDelay: "-2.3s",
            }}
          ></span>

          <span
            className="floating triangle"
            style={{
              top: "71.3993871297242%",
              left: "66.45833333333333%",
              animationDelay: "-1.25s",
            }}
          ></span>
          <span
            className="floating triangle"
            style={{
              top: "31.256384065372828%",
              left: "76.92708333333333%",
              animationDelay: "-0.65s",
            }}
          ></span>
          <span
            className="floating triangle"
            style={{
              top: "71.3993871297242%",
              left: "66.45833333333333%",
              animationDelay: "-0.15s",
            }}
          ></span>
        </div>
      </div>
    </main>
  );
}
