import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import { IoMdClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
// import { TiTruck } from "react-icons/ti";

export default function CartComponent({ setOpenCart }) {
  const { cart, handleClearCart, handleRemoveToCart } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const precioEnvio = 5000;
  useEffect(() => {
    let total = 0;
    cart.forEach((product) => {
      total += product.priceDiscount;
    });
    setSubTotal(total);
  }, [cart]);

  return (
    <div className="fixed top-0 right-0 h-full w-full flex z-20 text-black">
      <div
        className="bg-black opacity-40 w-[75%] z-10"
        onClick={() => setOpenCart(false)}
      ></div>
      <div className="bg-white w-full  lg:w-[25%] min-h-full z-20 flex flex-col">
        <div className="flex justify-between items-center px-4 pt-5 pb-3 border-b">
          <h1 className="text-xl font-bold">Mi Compra</h1>
          <button onClick={() => setOpenCart(false)}>
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto px-4 flex-1 items-center flex flex-col">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center py-2 border-b w-[80%]"
            >
              <img
                src="https://nikearprod.vtexassets.com/arquivos/ids/793832-1000-1000?v=638379223305770000&width=1000&height=1000&aspect=true"
                alt=""
                className="w-16 h-16 object-cover"
              />
              <div className="ml-2 flex-1">
                <p className="font-bold">{product.nameProduct}</p>
                <p className="text-sm text-gray-500">Talle: {product.talle}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xl">
                    ${product.priceDiscount.toLocaleString()}
                  </p>
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveToCart(product)}
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t">
          <div className="flex items-center">
            {/* <TiTruck className="w-6 h-6 mr-2" /> */}
            <p className="text-sm">
              Introducí tu CP y calculá el costo de envío.
            </p>
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-l px-2 py-1"
            />
            <button className="bg-black text-white px-4 py-1 rounded-r">
              Calcular
            </button>
          </div>
        </div>
        <div className="px-4 py-2 border-t">
          <div className="flex justify-between mb-1">
            <p className="font-bold">Subtotal:</p>
            <p>${subTotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between mb-1">
            <p className="font-bold">Envío:</p>
            <p>${precioEnvio.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total:</p>
            <p>${(subTotal + precioEnvio).toLocaleString()}</p>
          </div>
        </div>
        <div className="px-4 py-2 border-t">
          <button className="bg-black text-white px-4 py-2 rounded-lg w-full mb-2">
            Iniciar Compra
          </button>
          <div className="flex justify-between">
            <button onClick={() => setOpenCart(false)}>Seguir comprando</button>
            <button onClick={handleClearCart}>Vaciar carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}
