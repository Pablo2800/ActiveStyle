import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CarrouselHome from "../components/CarrouselHome";
import Popular from "../components/Popular";
import HomeCategories from "../components/HomeCategories";
import Genero from "../components/Genero";
import NewProducts from "../components/NewProducts";
import FilterByDeporte from "../components/FilterByDeporte";
import Footer from "../components/Footer";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const { allProducts, newProducts } = useProducts();
  useEffect(() => {
    allProducts();
    newProducts();
  }, [allProducts]);
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
