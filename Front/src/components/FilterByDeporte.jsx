import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import useProducts from "../hooks/useProducts";

export default function FilterByDeporte() {
  const { handleProductsByActivity } = useProducts();
  const products = [
    {
      id: 1,
      title: "Entrenamiento",
      value: "entrenamiento",
      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/4541b76d-bb27-453b-a3c5-0a2367a9edd0___ec175361fbf9807422d50d9338c6c1bf.jpg",
    },
    {
      id: 2,
      title: "Futbol",
      value: "futbol",
      url: "https://cdn.artphotolimited.com/images/60913d60bd40b85323893a87/1000x1000/argentinien-england-maradona.jpg",
    },
    {
      id: 3,
      title: "Basquet",
      value: "basquet",
      url: "./basquet.jpg",
    },
    {
      id: 4,
      title: "Running",
      value: "running",
      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/f9d609db-5867-474a-83ed-e570eb397ccb___f01d0e57cdcc3750c568295b36cccf67.jpg",
    },
    {
      id: 5,
      title: "Tenis",
      value: "tenis",
      url: "https://cdn.artphotolimited.com/images/639b03b6bd40b8bcfdfb06bb/1000x1000/roger-federer-steady.jpg",
    },
    {
      id: 6,
      title: "Skate",
      value: "skate",
      url: "https://media.istockphoto.com/id/115086649/es/foto/truco.jpg?s=612x612&w=0&k=20&c=DJmkw8i4lGcZIplEObkw5vqHdCPLMKfOEv4c-q4fxp8=",
    },
  ];
  const scrollContainer = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="w-full flex-col bg-white p-3">
      <div className="w-full flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold font-myfont">
          Filtrar por deporte
        </h2>
        <div className="flex mr-5 mb-2">
          <button
            className="p-3 bg-gray-200 text-gray-700 rounded-full mr-2"
            onClick={() => handleScroll(-100)}
          >
            <FaChevronLeft />
          </button>
          <button
            className="p-3 bg-gray-200 text-gray-700 rounded-full mr-2"
            onClick={() => handleScroll(100)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="overflow-x-scroll bg-scroll flex " ref={scrollContainer}>
        <div className="flex">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                onClick={() => handleProductsByActivity(product.value)}
                className="p-2 w-80 h-[400px] mx-1 hover:shadow-md hover:shadow-gray-400 my-2 rounded-xl flex flex-col justify-center items-center cursor-pointer"
              >
                <img
                  src={product.url}
                  alt=""
                  className="w-full h-full object-cover overflow-hidden rounded-xl"
                />
                <p className="text-xl font-myfont font-bold pt-3">
                  {product.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
