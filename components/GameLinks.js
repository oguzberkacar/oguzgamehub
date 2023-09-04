import Link from 'next/link'
import React from 'react'

function GameLinks({link_game, name, type}) {
  return (
    <Link
        href={`/games/${link_game}/singleplayer/${name}`}
        className={`border text-white text-center bg-yellow-400 hover:bg-yellow-600 rounded-md p-2 w-1/2 md:w-full  mt-4  ${
          name == "" ? "pointer-events-none select-none cursor-not-allowed" : ""
        }`}
      >{type}</Link>
  )
}

export default GameLinks