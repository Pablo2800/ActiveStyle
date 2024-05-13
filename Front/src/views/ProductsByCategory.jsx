import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RenderProducts from "../components/RenderProducts";
import Filters from "../components/Filters";
export default function ProductsByCategory() {
  const [selectedIndumentarias, setSelectedIndumentarias] = useState([]);
  const [selectedMarcas, setSelectedMarcas] = useState([]);
  const [selectedGeneros, setSelectedGeneros] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState([]);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <Filters
          selectedIndumentarias={selectedIndumentarias}
          selectedMarcas={selectedMarcas}
          selectedGeneros={selectedGeneros}
          selectedActividad={selectedActividad}
          setSelectedIndumentarias={setSelectedIndumentarias}
          setSelectedMarcas={setSelectedMarcas}
          setSelectedGeneros={setSelectedGeneros}
          setSelectedActividad={setSelectedActividad}
        />
        <RenderProducts
          selectedIndumentarias={selectedIndumentarias}
          selectedMarcas={selectedMarcas}
          selectedGeneros={selectedGeneros}
          selectedActividad={selectedActividad}
        />
      </div>
      <Footer />
    </div>
  );
}
