import Link from "next/link";
import React from "react";

function Page() {
  const linkclass = "text-2xl uppercase font-semibold tracking-[0.375rem] text-center text-white bg-blue-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline";
  return (
    <div className="flex w-full items-center justify-center h-screen gap-8">
     <Link className={linkclass} href="/games/drawing/single">
        single
      </Link>
      <Link className={linkclass} href="/games/drawing/multi">
        multiplayer
      </Link>
    </div>
  );
}

export default Page;
