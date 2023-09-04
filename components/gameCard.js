import Link from "next/link";
import React from "react";
import GameLinks from "./GameLinks";
import Image from "next/image";

function GameCard({ game, name }) {
  console.log(game.image);
  const DynamicComponent = React.lazy(
    () => import(`./${name}`) // Replace './${name}' with the actual module path
  );
  return (
    <div
      className={`w-full min-h-[250px]  shadow-inner shadow-white md:min-h-[500px] relative flex flex-col items-center justify-start border rounded-md p-4')]`}
    >
      {/* new badge top left corner */}
      {/* <Image src={`/img/${game.image}`} width={300} height={200} /> */}
      {/* respence next image */}
      <div className="w-full h-full relative flex ali">
       <img src={`/img/${game.image}`} className="w-full h-full object-cover rounded-t-md" />
      </div>
      <div className="absolute top-1 left-1 bg-yellow-600  text-white px-2 rounded-md">
        New
      </div>
      <div className="p-5 w-full h-full md:min-h-[300px] flex flex-col items-center justify-between ">
        <div>
          <h2 className="text-center rounded-md w-full text-xl lg:text-2xl  font-bold   text-white">
            {game.name}
          </h2>
          <p className="text-md px-2 rounded-md text-white my-4">
            {game.description}
          </p>
        </div>

        {game.hasmulti ? (
          <div className="flex gap-2 flex-col w-full items-center justify-center">
            <GameLinks link_game={game.link} name={name} type="Singleplayer" />
            <GameLinks link_game={game.link} name={name} type="Multiplayer" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <GameLinks link_game={game.link} name={name} type="Play" />
          </div>
        )}
      </div>
    </div>
  );
}
export default GameCard;
