import React from "react";
import Navbar from "../components/Navbar";
import CarrouselHome from "../components/CarrouselHome";
import Popular from "../components/Popular";
import HomeCategories from "../components/HomeCategories";
import Genero from "../components/Genero";
import NewProducts from "../components/NewProducts";
import FilterByDeporte from "../components/FilterByDeporte";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-200 w-full">
      <Navbar />
      <CarrouselHome />
      <Popular />
      <HomeCategories />
      <NewProducts />
      <Genero />
      <FilterByDeporte />
      <Footer />
    </div>
  );
}
