import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function FilterByDeporte() {
  const products = [
    {
      id: 1,
      title: "Entrenamiento",
      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/4541b76d-bb27-453b-a3c5-0a2367a9edd0___ec175361fbf9807422d50d9338c6c1bf.jpg",
    },
    {
      id: 2,
      title: "Running",

      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/f9d609db-5867-474a-83ed-e570eb397ccb___f01d0e57cdcc3750c568295b36cccf67.jpg",
    },
    {
      id: 3,
      title: "Futbol",

      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/1932929e-a1d3-4cc1-9baf-c68b637e1308___837553211fb284f6dbdadf666b73f5a8.jpg",
    },
    {
      id: 4,
      title: "Basquet",

      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/9ea32f03-412a-4ade-8c89-0464f7ebb9b2___9805db5e4131b651f6a3d3dc6f618784.jpg",
    },
    {
      id: 5,
      title: "Skate",

      url: "https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/40e9fe1e-8614-4a58-ae01-540b4727dea5___b869ee808746d73cd772c4878350e5c1.jpg",
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
        <div className="flex mr-5">
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
                className="p-2 w-80 gap-3 flex flex-col justify-center items-center"
              >
                <img
                  src={product.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <p className="text-xl font-myfont font-bold">{product.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
