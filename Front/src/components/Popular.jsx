import React from "react";

export default function Popular() {
  return (
    <div className="flex flex-col w-full items-center justify-center py-5  bg-gray-300">
      <h1 className="flex text-5xl my-5 font-myfont border-b-4 border-red-600 pb-3">
        Popular Ahora
      </h1>
      <div className="flex justify-around flex-wrap">
        <button className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black hover:underline hover:underline-offset-2">
          Zapatillas
        </button>
        <button className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black hover:underline hover:underline-offset-2">
          Buzos
        </button>
        <button className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black hover:underline hover:underline-offset-2">
          Pantalones
        </button>
        <button className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black hover:underline hover:underline-offset-2">
          Camperas
        </button>
      </div>
    </div>
  );
}
