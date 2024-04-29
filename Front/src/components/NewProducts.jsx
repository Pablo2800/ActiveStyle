import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
export default function NewProducts() {
  const products = [
    {
      id: 1,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/793832-1000-1000?v=638379223305770000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: "$239.999",
    },
    {
      id: 2,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/880628-1000-1000?v=638467320930270000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: "$239.999",
    },
    {
      id: 3,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/794168-1000-1000?v=638379227989030000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: "$239.999",
    },
    {
      id: 4,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: "$239.999",
    },
    {
      id: 5,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: "$239.999",
    },
    {
      id: 6,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: "$239.999",
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
          Lo nuevo en ActiveStyle
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
      <div
        className="overflow-x-scroll bg-scroll flex max-w-screen-2xl "
        ref={scrollContainer}
      >
        <div className="flex">
          {products.map((product) => {
            return (
              <div key={product.id} className="p-2 w-72 h-96 flex flex-col">
                <img
                  src={product.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <p className="text-lg font-bold">{product.description}</p>
                <p className="text-gray-600">{product.category}</p>
                <p className="font-bold">{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
