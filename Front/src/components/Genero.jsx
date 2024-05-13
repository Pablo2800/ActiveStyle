import React from "react";
import useProducts from "../hooks/useProducts";

export default function Genero() {
  const { handleProductsByGenre } = useProducts();
  return (
    <div className="w-full flex-wrap flex flex-col sm:flex-row justify-center bg-gray-300 py-5">
      <div className="w-4/5 self-center flex justify-around flex-wrap lg:flex-row">
        <div
          onClick={() => handleProductsByGenre("mujer")}
          className="m-4 lg:mx-3 relative overflow-hidden rounded-lg  cursor-pointer"
        >
          <div className="flex items-center justify-center hover:scale-105 w-full h-full z-10 relative duration-300">
            <img
              src="https://mtg-public.s3.amazonaws.com/home/gender/202404-mujer-montagne.jpg"
              alt=""
              className="w-80 h-80 sm:w-72 sm:h-72 xl:w-80 xl:h-80 object-cover"
            />
          </div>
        </div>
        <div
          onClick={() => handleProductsByGenre("hombre")}
          className="m-4 lg:mx-3 relative overflow-hidden rounded-lg cursor-pointer"
        >
          <div className="flex items-center justify-center hover:scale-105 w-full h-full z-10 relative duration-300">
            <img
              src="https://mtg-public.s3.amazonaws.com/home/gender/202404-hombre-montagne.jpg"
              alt=""
              className="w-80 h-80 sm:w-72 sm:h-72 xl:w-80 xl:h-80 object-cover"
            />
          </div>
        </div>
        <div
          onClick={() => handleProductsByGenre("niño")}
          className="m-4 lg:mx-3 relative overflow-hidden rounded-lg cursor-pointer"
        >
          <div className="flex items-center justify-center hover:scale-105 w-full h-full z-10 relative duration-300">
            <img
              src="https://mtg-public.s3.amazonaws.com/home/gender/202404-ninio-montagne.jpg"
              alt=""
              className="w-80 h-80 sm:w-72 sm:h-72 xl:w-80 xl:h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
