import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

export default function RenderProducts({
  selectedIndumentarias,
  selectedMarcas,
  selectedGeneros,
  selectedActividad,
}) {
  const { productsByCategory, filterProduct, filteredProducts } = useProducts();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="w-full sm:w-4/5 bg-white text-black flex flex-col flex-wrap py-5 min-h-screen">
      <p className="w-full items-center flex justify-center my-10">
        {selectedIndumentarias.length === 0 &&
        selectedMarcas.length === 0 &&
        selectedGeneros.length === 0 &&
        selectedActividad === 0
          ? productsByCategory.length
          : filteredProducts.length + " Resultados"}
      </p>
      <div className="flex flex-wrap w-full justify-center items-center">
        {(selectedIndumentarias.length === 0 &&
        selectedMarcas.length === 0 &&
        selectedGeneros.length === 0 &&
        selectedActividad === 0
          ? productsByCategory
          : filteredProducts
        ).map((product) => {
          const transformPorcentage = product.porcentaje / 100;
          const discountPrice = Math.round(
            product.price - product.price * transformPorcentage
          );
          return (
            <div
              key={product.id}
              className="flex flex-row m-3 w-full sm:w-1/4 items-center justify-center shadow-sm shadow-gray-300 hover:scale-105 hover:border-black"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <img
                  alt="example"
                  src="https://nikearprod.vtexassets.com/arquivos/ids/794168-1000-1000?v=638379227989030000&width=1000&height=1000&aspect=true"
                  className="w-full h-full"
                />
                <div className="flex px-3 py-1 w-full flex-col">
                  <p className="w-full text-xl font-myfont overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {product.indumentaria} {product.marca} {product.nameProduct}
                  </p>
                  <p className="text-gray-400">{product.genero}</p>
                </div>
                {product.discount === true ? (
                  <div className="font-bold flex self-start">
                    <p className="w-full text-xl font-myfont px-3 py-1 line-through">
                      ${product.price.toLocaleString()}
                    </p>
                    <p className="w-full text-xl font-myfont py-1">
                      ${discountPrice.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="w-full text-xl font-myfont px-3 py-1">
                    ${product.price.toLocaleString()}
                  </p>
                )}
                <Link
                  to={`/product/${product.id}`}
                  className="bg-black text-white px-1 py-2 w-32 rounded-lg mt-2 mb-3 flex items-center justify-center"
                  onClick={() => filterProduct(product.id)}
                >
                  Mas Info
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
