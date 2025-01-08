import React from "react";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { useParams } from "react-router-dom";
import { getID } from "../../redux/userSlice";
import { useSelector } from "react-redux";

export default function Compra({ talleSelected, count }) {
  const { handleAddToCart } = useCart();
  const { allProducts } = useProducts();
  const { id } = useParams();
  const clientID = useSelector(getID);
  const productFinded = allProducts.find(
    (product) => product.id === Number(id)
  );
  const productSended = {
    ...productFinded,
    talles: { [talleSelected]: count },
  };
  return (
    <div className="bg-white w-full text-black flex py-5 items-center justify-center">
      <button
        onClick={() =>
          handleAddToCart(clientID, productSended.id, productSended.talles)
        }
        disabled={!talleSelected}
        className={`${
          !talleSelected ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-900"
        } text-white px-4 py-2 rounded-lg font-bold`}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
