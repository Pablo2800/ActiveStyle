import React from "react";
import Navbar from "../components/Navbar";
import CarrouselHome from "../components/CarrouselHome";
import Popular from "../components/Popular";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-200 w-full">
      <Navbar />
      <CarrouselHome />
      <Popular />
    </div>
  );
}
