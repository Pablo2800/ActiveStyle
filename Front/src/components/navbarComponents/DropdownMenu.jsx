import React from "react";
import Products from "./Products";
import Locales from "./Locates";
import Promos from "./Promos";
import Contactos from "./Contactos";

export default function DropdownMenu() {
  return (
    <div className="lg:w-full lg:flex justify-center items-center hidden ">
      <Products />
      <Locales />
      <Promos />
      <Contactos />
    </div>
  );
}
