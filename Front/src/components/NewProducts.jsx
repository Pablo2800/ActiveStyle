import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getNewProducts } from "../redux/productSlice";
import useProducts from "../hooks/useProducts";
export default function NewProducts() {
  const products = useSelector(getNewProducts);
  const { filterProduct } = useProducts();
  const scrollContainer = useRef(null);

  
  const handleScroll = (scrollOffset) => {
    if (scrollContainer.current) {
      const currentScrollLeft = scrollContainer.current.scrollLeft;
      const containerWidth = scrollContainer.current.clientWidth;
      const scrollWidth = scrollContainer.current.scrollWidth;
      let newScrollLeft = currentScrollLeft + scrollOffset;
      if (newScrollLeft + containerWidth >= scrollWidth) {
        newScrollLeft = 0;
      } else if (newScrollLeft < 0) {
        newScrollLeft = scrollWidth - containerWidth;
      }
      scrollContainer.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full flex-col bg-white p-3 text-black">
      <div className="w-full flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold font-myfont">
          Lo nuevo en ActiveStyle
        </h2>
        <div className="flex mr-5 my-2">
          <button
            className="p-3 bg-gray-200 text-gray-700 rounded-full mr-2"
            onClick={() => handleScroll(-300)}
          >
            <FaChevronLeft />
          </button>
          <button
            className="p-3 bg-gray-200 text-gray-700 rounded-full mr-2"
            onClick={() => handleScroll(300)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div
        className="overflow-x-scroll bg-scroll flex hover:bg-opacity-90"
        ref={scrollContainer}
      >
        <div className="flex">
          {products.map((product) => {
            const transformPorcentage = product.porcentaje / 100;
            const discountPrice = Math.round(
              product.price - product.price * transformPorcentage
            );
            return (
              <div
                key={product.id}
                className="p-2 w-72 h-full flex flex-col relative hover:cursor-pointer mx-1"
                onClick={() => filterProduct(product.id)}
              >
                <div className="flex items-center justify-center w-full h-full z-10 relative duration-300">
                  <img
                    src={product.url}
                    alt=""
                    className="w-72 h-72 object-cover"
                  />
                </div>
                {product.discount === true && (
                  <div className="absolute top-4 right-4 flex flex-col items-center z-20">
                    <div className="p-1 w-12 h-12 rounded-full bg-red-600 text-sm text-white flex flex-col items-center justify-center">
                      <p>{product.porcentaje}%</p>
                      <p>OFF</p>
                    </div>
                  </div>
                )}
                <div className="w-full">
                  <p className="text-lg font-bold">{product.description}</p>
                  <p className="text-gray-600 uppercase">{product.category}</p>
                  {product.discount === true ? (
                    <div className="font-bold flex">
                      <p className="font-bold line-through mr-4">
                        ${product.price.toLocaleString()}
                      </p>
                      <p>${discountPrice.toLocaleString()}</p>
                    </div>
                  ) : (
                    <p className="font-bold">
                      ${product.price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
