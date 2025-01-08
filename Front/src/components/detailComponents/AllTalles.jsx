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
import useProducts from "../../hooks/useProducts";
export default function Talles({
  talleSelected,
  setTalleSelected,
  count,
  setCount,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const { product } = useProducts();

  return (
    <div className="w-full h-full bg-white flex items-center justify-center flex-col">
      <h1 className="text-black text-xl mb-4 font-myfont">
        Seleccionar talle argentino
      </h1>
      <div className="flex flex-wrap w-[90%] self-center items-center justify-center">
        {Object.keys(product.talles).map((talle) => (
          <TallesButton
            key={talle}
            talle={talle}
            onClick={() => {
              setTalleSelected(talle);
              setCount(1);
            }}
            isSelected={talle === talleSelected}
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
            talleSelected
              ? "border-black text-black"
              : "border-gray-500 text-gray-500"
          }`}
        >
          {count > 1 ? (
            <button
              className="rounded-full p-1 flex items-center justify-center text-black"
              onClick={() => setCount(count - 1)}
            >
              <IoMdRemoveCircle className="w-7 h-7" />
            </button>
          ) : (
            <button
              disabled={true}
              className="rounded-full p-1 flex items-center justify-center text-gray-500"
              onClick={() => setCount(count - 1)}
            >
              <IoIosRemoveCircleOutline className="w-7 h-7" />
            </button>
          )}
          <p className="text-black">{count}</p>
          {talleSelected && count < product.talles[talleSelected] ? (
            <button
              className="rounded-full p-1 flex items-center justify-center text-black"
              onClick={() => setCount(count + 1)}
            >
              <IoIosAddCircle className="w-7 h-7" />
            </button>
          ) : (
            <button
              disabled={true}
              className="rounded-full p-1 flex items-center justify-center text-gray-500"
              onClick={() => setCount(count + 1)}
            >
              <IoIosAddCircleOutline className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
