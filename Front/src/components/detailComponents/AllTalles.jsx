import React, { useState } from "react";
import {
  IoIosAddCircle,
  IoMdRemoveCircle,
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import { PiRuler } from "react-icons/pi";
import TallesButton from "./TallesButton";
import ModalTablaTalles from "./ModalTablaTalles";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
export default function Talles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const {
    select,
    allTalles,
    contador,
    tallesDisp,
    // cantTalles,
    handleSelect,
    aumentarContador,
    disminuirContador,
  } = useCart();
  const { product, allTallesIndumentaria } = useProducts();
  return (
    <div className="w-full h-full bg-white flex items-center justify-center flex-col">
      <h1 className="text-black text-xl mb-4 font-myfont">
        Seleccionar talle argentino
      </h1>
      <div className="flex flex-wrap w-[90%] self-center items-center justify-center">
        {product.indumentaria === "Zapatillas" ||
        product.indumentaria === "Botines"
          ? allTalles.map((talle) => (
              <TallesButton
                key={talle}
                talle={talle}
                onClick={() => handleSelect(talle)}
                isSelected={talle === select}
                isDisabled={!tallesDisp.includes(talle)}
              />
            ))
          : allTallesIndumentaria.map((talle) => (
              <TallesButton
                key={talle}
                talle={talle}
                onClick={() => handleSelect(talle)}
                isSelected={talle === select}
                isDisabled={!tallesDisp.includes(talle)}
              />
            ))}
      </div>

      <button
        onClick={showModal}
        className="text-black self-end pr-7 pt-3 flex items-center justify-center underline underline-offset-2"
      >
        <PiRuler className="text-black pr-1" />
        Tabla de talles
      </button>
      <ModalTablaTalles isVisible={isModalOpen} onCancel={handleOk} />
      <div className="bg-white w-full flex py-3 items-center ">
        <p className="px-2 text-xl ml-6 text-black">Cantidad: </p>
        <div
          className={`w-24 h-12 border-2 rounded-full flex items-center justify-around ${
            select ? "border-black text-black" : "border-gray-500 text-gray-500"
          }`}
        >
          {contador > 1 ? (
            <button
              className="rounded-full p-1 flex items-center justify-center text-black"
              onClick={disminuirContador}
            >
              <IoMdRemoveCircle className="w-7 h-7" />
            </button>
          ) : (
            <button
              disabled={true}
              className="rounded-full p-1 flex items-center justify-center text-gray-500"
              onClick={disminuirContador}
            >
              <IoIosRemoveCircleOutline className="w-7 h-7" />
            </button>
          )}
          <p>{contador}</p>
          {select ? (
            <button
              className="rounded-full p-1 flex items-center justify-center"
              onClick={aumentarContador}
            >
              <IoIosAddCircle className="w-7 h-7" />
            </button>
          ) : (
            <button
              disabled={true}
              className="rounded-full p-1 flex items-center justify-center text-gray-500"
              onClick={aumentarContador}
            >
              <IoIosAddCircleOutline className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
