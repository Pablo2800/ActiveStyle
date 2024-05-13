import React from "react";
import Products from "./Products";
import Promos from "./Promos";
import Contactos from "./Contactos";
import Marcas from "./Marcas";

export default function DropdownMenu() {
  return (
    <div className="lg:w-full lg:flex justify-center items-center hidden ">
      <Products />
      <Marcas />
      <Promos />
      <Contactos />
    </div>
  );
}
