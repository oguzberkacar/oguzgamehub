import Link from "next/link";
import React from "react";

function SelectGameType({game,name}) {
  const linkclass =
    "text-xl md:text-2xl uppercase font-semibold w-full tracking-[0.375rem] text-center text-white bg-blue-500 rounded-md px-4 py-2 my-2 md:m-2 transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline";
  return (
    <div className="flex w-full  items-center justify-center  ">
      <div className="md:max-w-md flex flex-col">
        <Link className={linkclass} href="/games/drawing/single">
          singleplayer
        </Link>
        <Link className={linkclass} href="/games/drawing/multi">
          multiplayer
        </Link>
      </div>
    </div>
  );
}

export default SelectGameType;
