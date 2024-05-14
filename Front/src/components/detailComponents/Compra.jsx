import React from "react";
import useCart from "../../hooks/useCart";

export default function Compra() {
  const { handleAddToCart, select } = useCart();

  return (
    <div className="bg-white w-full text-black flex py-5 items-center justify-center">
      <button
        onClick={handleAddToCart}
        disabled={select === 0}
        className={`${
          select === 0 ? "bg-gray-500" : "bg-red-600 hover:bg-red-900"
        } text-white px-4 py-2 rounded-lg font-bold`}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
