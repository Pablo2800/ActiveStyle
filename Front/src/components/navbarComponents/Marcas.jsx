import { Dropdown, Space } from "antd";
import React from "react";
import useProducts from "../../hooks/useProducts";

export default function Marcas() {
  const { allMarcas, handleProductsByMarca } = useProducts();
  return (
    <Dropdown
      overlay={
        <div className="flex bg-white p-3 w-full mt-3 flex-col">
          <div className="menu-column pt-2 px-2">
            <h2 className="text-gray-500 text-sm font-myfont p-2">Marcas</h2>
            {allMarcas.map((item) => {
              return (
                <button
                  key={item}
                  onClick={() => handleProductsByMarca(item)}
                  className="font-myfont w-40 text-xl flex items-start justify-start my-1 hover:bg-gray-300 p-2 rounded-xl"
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      }
      className="text-black mx-5 text-lg p-2 font-myfont"
    >
      <Space>Marcas</Space>
    </Dropdown>
  );
}
