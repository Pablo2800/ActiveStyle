import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import { IoMdClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

export default function CartComponent({ setOpenCart }) {
  const { cart, handleClearCart, handleRemoveToCart } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [envio, setEnvio] = useState(0);
  const [codigoPostal, setCodigoPostal] = useState("");
  const [inputCompleto, setInputCompleto] = useState(false);

  const envioRandom = () => {
    const aleatorio = Math.round(Math.random() * (7000 - 3000) + 3000);
    setEnvio(aleatorio);
  };

  useEffect(() => {
    let total = 0;
    cart.forEach((product) => {
      total += product.priceDiscount;
    });
    setSubTotal(total);
  }, [cart]);

  useEffect(() => {
    setInputCompleto(codigoPostal.trim() !== "");
  }, [codigoPostal]);

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
          {cart.map((product, index) => (
            <div
              key={`${product.id}-${product.talle}-${index}`}
              className="flex items-center py-4 border-b w-[90%]"
            >
              <img
                src="https://nikearprod.vtexassets.com/arquivos/ids/793832-1000-1000?v=638379223305770000&width=1000&height=1000&aspect=true"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <div className="ml-2 flex-1">
                <p className="font-bold text-xl font-myfont">
                  {product.nameProduct}
                </p>
                <p className="text-sm text-gray-500">Talle: {product.talle}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xl">
                    ${product.priceDiscount.toLocaleString()}
                  </p>
                  <button
                    className="text-red-500"
                    onClick={() =>
                      handleRemoveToCart(product.id, product.talle)
                    }
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
            <TbTruckDelivery className="w-6 h-6 mr-2" />
            <p className="text-lg">Calculá el costo de envío.</p>
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              className="border border-gray-300 rounded-l px-2 py-1 placeholder:text-sm"
              placeholder="Ingresa tu codigo postal"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
            />
            <button
              onClick={envioRandom}
              className={`bg-black text-white px-4 py-1 rounded-r ${
                inputCompleto ? "" : "pointer-events-none opacity-50"
              }`}
              disabled={!inputCompleto}
            >
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
            <p>${envio.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total:</p>
            <p>${(subTotal + envio).toLocaleString()}</p>
          </div>
        </div>
        <div className="px-4 py-2 border-t">
          <button
            className={`bg-black text-white px-4 py-2 rounded-lg w-full mb-2 ${
              envio !== 0 ? "" : "pointer-events-none opacity-50"
            }`}
          >
            Iniciar Compra
          </button>
          <div className="flex justify-between">
            <button
              className="text-xl font-myfont"
              onClick={() => setOpenCart(false)}
            >
              Seguir comprando
            </button>
            <button onClick={handleClearCart}>Vaciar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
