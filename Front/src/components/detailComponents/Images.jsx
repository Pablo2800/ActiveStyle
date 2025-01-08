import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useProducts from "../../hooks/useProducts";

export default function Images() {
  const [verMas, setVerMas] = useState(false);
  const { product } = useProducts();
  return (
    <div className="flex flex-col items-center w-[98%] h-full mt-10 ">
      <div className="flex w-9/12">
        <div className="flex w-1/2 overflow-hidden">
          <img
            src={
              product.imageUrls[1] ||
              "https://nikearprod.vtexassets.com/arquivos/ids/793392-800-800?width=800&height=800&aspect=true"
            }
            className="w-full h-full ml-1 border-[1px] border-gray-400"
            alt=""
          />
        </div>
        <div className="flex w-1/2 overflow-hidden">
          <img
            src={
              product.imageUrls[5] ||
              "https://nikearprod.vtexassets.com/arquivos/ids/796524-800-800?width=800&height=800&aspect=true"
            }
            className="w-full h-full mr-1 border-[1px] border-gray-400"
            alt=""
          />
        </div>
      </div>
      <div className="flex w-9/12">
        <div className="flex w-1/2">
          <img
            src={
              product.imageUrls[3] ||
              "https://nikearprod.vtexassets.com/arquivos/ids/797856-800-800?width=800&height=800&aspect=true"
            }
            className="w-full h-full ml-1 border-[1px] border-gray-400"
            alt=""
          />
        </div>
        <div className="flex w-1/2">
          <img
            src={
              product.imageUrls[4] ||
              "https://nikearprod.vtexassets.com/arquivos/ids/800968-800-800?width=800&height=800&aspect=true"
            }
            className="w-full h-full mr-1 border-[1px] border-gray-400"
            alt=""
          />
        </div>
      </div>
      <button
        className={`border-2 border-black text-black w-28 p-2 my-3 rounded-xl flex justify-center items-center hover:bg-black hover:text-white ${
          verMas ? "hidden" : ""
        }`}
        onClick={() => {
          setVerMas(!verMas);
        }}
      >
        Ver mas <IoIosArrowDown className="w-5 h-5 pt-1" />
      </button>
      {verMas === true ? (
        <div className="flex w-full items-center flex-col">
          <div className="flex w-9/12 ">
            <div className="flex w-1/2 ml-1">
              <img
                src={product.imageUrls[0]}
                // src="https://nikearprod.vtexassets.com/arquivos/ids/804070-800-800?width=800&height=800&aspect=true"
                className="w-full h-full ml-1 border-[1px] border-gray-400"
                alt=""
              />
            </div>
            <div className="flex w-1/2 mr-1">
              <img
                src={product.imageUrls[2]}
                // src="https://nikearprod.vtexassets.com/arquivos/ids/805340-800-800?width=800&height=800&aspect=true"
                className="w-full h-full mr-1 border-[1px] border-gray-400"
                alt=""
              />
            </div>
          </div>
          <button
            className={`border-2 border-black text-black w-auto p-2 my-3 rounded-xl flex items-center justify-center hover:bg-black hover:text-white ${
              !verMas ? "hidden" : "visible"
            }`}
            onClick={() => {
              setVerMas(!verMas);
              window.scrollTo(0, 0);
            }}
          >
            Ver menos <IoIosArrowUp className="w-5 h-5 ml-1 pt-1" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
