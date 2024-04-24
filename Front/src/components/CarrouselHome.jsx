import React from "react";
import { Carousel } from "antd";

export default function CarrouselHome() {
  return (
    <Carousel autoplay>
      <div className="relative lg:h-[calc(100vh-5rem)] items-center justify-center flex">
        <img
          src="https://sydney.pe/wp-content/uploads/2023/09/ropa-de-otono.png"
          alt=""
          className="w-full h-full"
        />
        <div className="flex flex-col w-72 absolute top-20 lg:right-72 right-0 z-10 items-center justify-center">
          <h1 className="lg:text-[50px] font-myfont font-bold mb-3">
            EXPLORA EL OTOÑO
          </h1>
          <h3 className="lg:mb-10 mb-3 lg:text-3xl">
            Y CONECTA CON LA NATURALEZA
          </h3>
          <button className="px-3 py-2 rounded-xl bg-gray-300 text-black lg:text-3xl font-myfont hover:bg-gray-700 hover:text-white">
            Explorar mas
          </button>
        </div>
      </div>
      <div className="relative lg:h-[calc(100vh-5rem)] items-center justify-center flex">
        <img
          src="https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="w-full h-full"
        />
        <div className="text-black bg-opacity-50 bg-gray-300 absolute top-20 left-36 z-10 flex flex-col items-center justify-center lg:p-7 p-2 rounded-xl">
          <h1 className="lg:text-5xl font-bold font-myfont mb-3">
            CONOCE LO ULTIMO EN
          </h1>
          <h3 className="lg:mb-8 mb-3 lg:text-3xl">
            EQUIPAMIENTO DE BICICLETAS
          </h3>
          <button className="px-3 py-2 rounded-xl font-myfont bg-gray-700 text-white lg:text-3xl hover:bg-gray-800">
            Ver productos
          </button>
        </div>
      </div>
      <div className="relative lg:h-[calc(100vh-5rem)] items-center justify-center flex">
        <img
          src="https://statics-cuidateplus.marca.com/cms/2022-12/running-consejos-principiantes.jpg"
          alt=""
          className="w-full h-full"
        />
        <div className="absolute top-20 right-56 z-10 flex flex-col items-center justify-center p-7 rounded-xl">
          <h1 className="lg:text-5xl font-bold mb-3 font-myfont">
            20% OFF EN RUNNING
          </h1>
          <button className="px-3 py-2 rounded-xl bg-white opacity-85 text-black lg:text-3xl font-myfont">
            Conoce mas
          </button>
        </div>
      </div>
    </Carousel>
  );
}
