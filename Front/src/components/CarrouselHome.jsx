import React from "react";
import { Carousel } from "antd";
import { SlArrowRight } from "react-icons/sl";
import { GrFormNextLink } from "react-icons/gr";
import useProducts from "../hooks/useProducts";
export default function CarrouselHome() {
  const {renderAllProducts } = useProducts()
  return (
    <div className="relative lg:h-[calc(100vh-5rem)] h-72 items-center justify-center flex ">
      <img
        src="https://sydney.pe/wp-content/uploads/2023/09/ropa-de-otono.png"
        alt=""
        className="object-cover w-full h-full"
        />
      <div className="flex flex-col absolute top-20 lg:right-[170px] right-0 items-center justify-center">
        <h1 className="lg:text-[50px] font-myfont font-bold mb-3">
          EXPLORA EL OTOÑO
        </h1>
        <h3 className="lg:mb-10 mb-3 lg:text-3xl">
          Y CONECTA CON LA NATURALEZA
        </h3>
        <button
          onClick={() => renderAllProducts("allProducts")}
          className="flex justify-center items-center px-3 py-2 rounded-xl bg-gray-300 text-black lg:text-3xl font-myfont hover:bg-gray-700 hover:text-white"
        >
          Explorar mas <SlArrowRight />
        </button>
      </div>
    </div>
  );
}

  // <Carousel autoplay>
  //   <div className="relative lg:h-[calc(100vh-5rem)] h-72 items-center justify-center flex ">
  //     <img
  //       src="https://sydney.pe/wp-content/uploads/2023/09/ropa-de-otono.png"
  //       alt=""
  //       className="object-cover w-full h-full"
  //     />
  //     <div className="flex flex-col w-72 absolute top-20 lg:right-72 right-0 items-center justify-center">
  //       <h1 className="lg:text-[50px] font-myfont font-bold mb-3">
  //         EXPLORA EL OTOÑO
  //       </h1>
  //       <h3 className="lg:mb-10 mb-3 lg:text-3xl">
  //         Y CONECTA CON LA NATURALEZA
  //       </h3>
  //       <button className="flex justify-center items-center px-3 py-2 rounded-xl bg-gray-300 text-black lg:text-3xl font-myfont hover:bg-gray-700 hover:text-white">
  //         Explorar mas <SlArrowRight />
  //       </button>
  //     </div>
  //   </div>
  //   <div className="lg:h-[calc(100vh-5rem)] h-72 items-center justify-center flex">
  //     <img
  //       src="./Untitled.png"
  //       alt=""
  //       className="object-cover w-full h-full"
  //     />
  //   </div>
  //   <div className="relative lg:h-[calc(100vh-5rem)] h-72 flex items-center justify-center">
  //     <div className="w-full h-full">
  //       <img
  //         src="https://statics-cuidateplus.marca.com/cms/2022-12/running-consejos-principiantes.jpg"
  //         alt=""
  //         className="object-cover w-full h-full"
  //       />
  //     </div>
  //     <div className="absolute top-10 right-10 lg:right-20 flex flex-col items-end justify-center lg:p-7">
  //       <h1 className="lg:text-5xl font-bold mb-3 font-myfont">
  //         20% OFF EN RUNNING
  //       </h1>
  //       <button className="flex items-center lg:px-3 lg:py-2 p-1 rounded-xl bg-white opacity-85 text-black lg:text-3xl font-myfont">
  //         Conoce mas
  //       </button>
  //     </div>
  //   </div>
  // </Carousel>