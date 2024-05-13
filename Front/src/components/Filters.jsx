import React, { useEffect, useState, useMemo } from "react";
import { Checkbox, Collapse, ConfigProvider, Slider } from "antd";
import useProducts from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { setFilteredProductsByCategory } from "../redux/productSlice";

export default function Filters({
  selectedIndumentarias,
  setSelectedIndumentarias,
  setSelectedGeneros,
  selectedMarcas,
  setSelectedMarcas,
  selectedGeneros,
  selectedActividad,
  setSelectedActividad,
}) {
  const {
    productsByCategory,
    uniqueIndumentarias,
    uniqueGeneros,
    uniqueMarcas,
    uniqueActividad,
  } = useProducts();
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([20000, 500000]);

  const handleIndumentariaChange = (indumentaria) => {
    setSelectedIndumentarias((prevSelectedIndumentarias) => {
      if (prevSelectedIndumentarias.includes(indumentaria)) {
        return prevSelectedIndumentarias.filter(
          (item) => item !== indumentaria
        );
      } else {
        return [...prevSelectedIndumentarias, indumentaria];
      }
    });
  };
  const handleActividadChange = (actividad) => {
    setSelectedActividad(
      selectedActividad.includes(actividad)
        ? selectedActividad.filter((item) => item !== actividad)
        : [...selectedActividad, actividad]
    );
  };
  const handleGeneroChange = (genero) => {
    setSelectedGeneros(
      selectedGeneros.includes(genero)
        ? selectedGeneros.filter((item) => item !== genero)
        : [...selectedGeneros, genero]
    );
  };
  const handleMarcaChange = (marca) => {
    setSelectedMarcas(
      selectedMarcas.includes(marca)
        ? selectedMarcas.filter((item) => item !== marca)
        : [...selectedMarcas, marca]
    );
  };
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const applyFilters = () => {
    const filteredProducts2 = productsByCategory.filter((product) => {
      if (selectedIndumentarias.length > 0) {
        if (!selectedIndumentarias.includes(product.indumentaria)) {
          return false;
        }
      }
      if (selectedMarcas.length > 0) {
        if (!selectedMarcas.includes(product.marca.toUpperCase())) {
          return false;
        }
      }
      if (selectedGeneros.length > 0) {
        if (!selectedGeneros.includes(product.genero)) {
          return false;
        }
      }
      if (selectedActividad.length > 0) {
        if (!selectedActividad.includes(product.actividad)) {
          return false;
        }
      }
      const productPrice = parseFloat(product.price);
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });
    dispatch(setFilteredProductsByCategory(filteredProducts2));
  };
  useEffect(() => {
    applyFilters();
  }, [
    selectedIndumentarias,
    selectedMarcas,
    selectedGeneros,
    selectedActividad,
    priceRange,
  ]);
  return (
    <div className="w-full sm:w-1/5 bg-gray-500 flex flex-col sticky top-10 z-10">
      <ConfigProvider
        theme={{
          token: {
            colorText: "#fff",
            borderRadius: 0,
          },
          components: {
            Collapse: {
              contentPadding: 10,
              contentBg: "white",
              margin: 10,
              colorText: "black",
              fontSize: 18,
              colorBorder: "transparent",
            },
            Slider: {
              dotActiveBorderColor: "black",
              handleColor: "black",
              handleActiveColor: "black",
              trackBg: "black",
              trackHoverBg: "black",
            },
          },
        }}
      >
        <Collapse className="flex flex-col mt-10 bg-transparent">
          <Collapse.Panel key="1" header="Tipo de Producto" className="mb-2">
            <div className="flex flex-col text-black pl-8 py-1 ">
              {uniqueIndumentarias.map((indumentaria, index) => (
                <Checkbox
                  key={index}
                  className="text-black text-xl font-myfont py-2"
                  checked={selectedIndumentarias.includes(indumentaria)}
                  onChange={() => handleIndumentariaChange(indumentaria)}
                >
                  {indumentaria}
                </Checkbox>
              ))}
            </div>
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Genero" className="mb-2">
            <div className="flex flex-col text-black pl-8 py-1">
              {uniqueGeneros.map((genero, index) => (
                <Checkbox
                  key={index}
                  className="text-black text-xl font-myfont py-2"
                  checked={selectedGeneros.includes(genero)}
                  onChange={() => handleGeneroChange(genero)}
                >
                  {genero}
                </Checkbox>
              ))}
            </div>
          </Collapse.Panel>
          <Collapse.Panel key="3" header="Actividad" className="mb-2">
            <div className="flex flex-col text-black pl-8 py-1 ">
              {uniqueActividad.map((actividad, index) => (
                <Checkbox
                  key={index}
                  className="text-black text-xl font-myfont py-2"
                  checked={selectedActividad.includes(actividad)}
                  onChange={() => handleActividadChange(actividad)}
                >
                  {actividad}
                </Checkbox>
              ))}
            </div>
          </Collapse.Panel>
          <Collapse.Panel
            key="4"
            header="Precio"
            className="mb-2 flex flex-col w-full"
          >
            <div className="text-base w-full flex flex-col items-center justify-center">
              <Slider
                range
                step={1000}
                defaultValue={[20000, 500000]}
                onChangeComplete={handlePriceChange}
                min={20000}
                max={500000}
                className="w-4/5"
              />
              <p>
                Precio: ${priceRange[0].toLocaleString()} - $
                {priceRange[1].toLocaleString()}
              </p>
            </div>
          </Collapse.Panel>
          <Collapse.Panel key="5" header="Marca" className="mb-2">
            <div className="flex flex-col text-black pl-8 py-1">
              {uniqueMarcas.map((marca, index) => (
                <Checkbox
                  key={index}
                  className="text-black text-xl font-myfont py-2"
                  checked={selectedMarcas.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                >
                  {marca}
                </Checkbox>
              ))}
            </div>
          </Collapse.Panel>
        </Collapse>
      </ConfigProvider>
    </div>
  );
}
