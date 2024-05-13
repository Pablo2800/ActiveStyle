import React from "react";
import useProducts from "../hooks/useProducts";

export default function Popular() {
  const { handleProductsByIndumentaria } = useProducts();
  return (
    <div className="flex flex-col w-full items-center justify-center py-5  bg-gray-300">
      <h1 className="flex text-5xl my-5 font-myfont border-b-4 border-red-600 pb-3">
        Popular Ahora
      </h1>
      <div className="flex justify-around flex-wrap">
        <button
          onClick={() => handleProductsByIndumentaria("zapatillas")}
          className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black  cursor-pointer hover:bg-black hover:text-white"
        >
          Zapatillas
        </button>
        <button
          onClick={() => handleProductsByIndumentaria("buzos")}
          className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black   hover:bg-black hover:text-white"
        >
          Buzos
        </button>
        <button
          onClick={() => handleProductsByIndumentaria("pantalones")}
          className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black   hover:bg-black hover:text-white"
        >
          Pantalones
        </button>
        <button
          onClick={() => handleProductsByIndumentaria("campera")}
          className="text-xl my-2 mx-4 px-6 py-1 border-2 w-40 border-black   hover:bg-black hover:text-white"
        >
          Camperas
        </button>
      </div>
    </div>
  );
}
