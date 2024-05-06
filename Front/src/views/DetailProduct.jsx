import React from "react";
import Descriptions from "../components/detailComponents/Descriptions";
import Navbar from "../components/Navbar";
import Compra from "../components/detailComponents/Compra";
import Talles from "../components/detailComponents/AllTalles";
import Images from "../components/detailComponents/Images";
import NewProducts from "../components/NewProducts";
import Footer from "../components/Footer";
export default function DetailProduct() {
  return (
    <div className="bg-white w-full min-h-screen h-full flex flex-col text-white">
      <div className="hidden lg:flex lg:flex-col">
        <Navbar />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-8/12 bg-white flex items-center justify-center">
            <Images />
          </div>
          <div className="flex flex-col h-full w-full lg:w-4/12">
            <Descriptions />
            <Talles />
            <Compra />
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-black font-bold text-3xl font-myfont ml-7">
            Productos recomendados
          </h3>
          <NewProducts />
          <Footer />
        </div>
      </div>
      <div className="lg:hidden">
        <Navbar />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full bg-white flex items-center justify-center">
            <Descriptions />
          </div>
          <div className="flex flex-col h-full w-full">
            <Images />
            <Talles />
            <Compra />
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-black font-bold text-3xl font-myfont ml-7">
            Productos recomendados
          </h3>
          <NewProducts />
          <Footer />
        </div>
      </div>
    </div>
  );
}
