"use client"; // This is a client component 👈🏽
import SelectGameType from "@/components/SelectGameType";
import TicTacToe from "@/components/TicTacToe";
import React, { useState } from "react";



function page({ params }) {

  const [name, setName] = useState(params.username[1]);
  const [isNameSet, setIsNameSet] = useState(true);

  const handleNameChange = (e) => {
    localStorage.setItem("name", name);
    setIsNameSet(true);
  };

  return (
    <div className="homebg">
      {params.username[1] ? (
        <div>
          <TicTacToe />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="w-1/2 mb-8 gap-2 flex flex-col items-center justify-center">
            <input
              className="border rounded-md p-2 w-full md:w-1/2 mt-4 text-center"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button
              className={`border text-white text-center hover:bg-yellow-600 rounded-md p-2 w-1/2 mt-4  ${
                name == ""
                  ? "pointer-events-none select-none cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNameChange}
            >
              Submit
            </button>
          </div>

          <SelectGameType game="tictactoe" />
        </div>
      )}
    </div>
  );
}

export default page;
