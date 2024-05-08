import React from "react";
import useCart from "../../hooks/useCart";

export default function Descriptions() {
  const { product, cantTalles, cuotas, handleClearCart, discountPrice } =
    useCart();

  return (
    <div className="w-full h-full bg-white p-3 text-gray-600 pt-10 pb-6 ">
      <h1 className="text-3xl font-bold font-myfont text-black my-3">
        {product.nameProduct}
      </h1>
      <h3 className="text-gray-600 my-3">{product.description}</h3>
      {product.discount === true ? (
        <div className="font-bold flex justify-start">
          <div className="p-1 w-16 h-10 rounded-md mr-4 bg-red-600 text-sm text-white flex items-center justify-center">
            <p className="mr-1">{product.porcentaje}%</p>
            <p>OFF</p>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <p className="font-bold text-black text-3xl font-myfont line-through mr-4">
                ${product.price.toLocaleString()}
              </p>
              <p className="font-bold text-black text-3xl font-myfont">
                ${discountPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold text-black text-3xl font-myfont">
            ${product.price.toLocaleString()}
          </p>
          <span className="my-3 text-red-500">
            o en hasta 3 cuotas de ${cuotas.toLocaleString()}
          </span>
        </div>
      )}
      <p className="my-3">Producto en stock: {product.talles.length}</p>
      {cantTalles.length > 0 ? <p>Talle en stock: {cantTalles.length}</p> : ""}
      <button onClick={handleClearCart}>Vaciar carrito</button>
    </div>
  );
}
