import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";
export default function NewProducts() {
  const { filterProduct, filtered } = useProducts();
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
    <div className="w-full flex-col p-3 text-black bg-gray-50">
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
          {filtered.map((product) => {
            const transformPorcentage = product.porcentaje / 100;
            const discountPrice = Math.round(
              product.price - product.price * transformPorcentage
            );
            return (
              <Link to={`/product/${product.id}`}>
                <div
                  key={product.id}
                  className="w-80 h-[420px] mx-1 hover:shadow-md  hover:shadow-gray-400 my-2 rounded-xl flex flex-col justify-center items-center cursor-pointer"
                  onClick={() => filterProduct(product.id)}
                >
                  <div className="flex items-center justify-center w-full h-full z-10 relative duration-300">
                    <img
                      src={product.imageUrls[1] || ""}
                      // src="https://nikearprod.vtexassets.com/arquivos/ids/794168-1000-1000?v=638379227989030000&width=1000&height=1000&aspect=true"
                      className="object-cover rounded-xl w-full h-full"
                      alt=""
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
                  <div className="w-full pl-3 rounded-xl">
                    <p className="text-2xl font-bold font-myfont py-1">
                      {product.nameProduct}
                    </p>
                    <p className="text-gray-600 uppercase font-myfont">
                      {product.genero}
                    </p>
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
