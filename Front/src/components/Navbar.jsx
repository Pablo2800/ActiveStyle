import React, { useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import MobileMenu from "./navbarComponents/MobileMenu";
import DropdownMenu from "./navbarComponents/DropdownMenu";
import CartComponent from "./Carrito";
import InfoMenu from "./navbarComponents/InfoMenu";
import useNavigation from "../hooks/useNavigate";

export default function Navbar() {
  const [ilgenuOpen, setIlgenuOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { goToHome } = useNavigation();
  return (
    <div className="flex items-center bg-gray-300 h-20 w-full p-2 sticky top-0 z-50">
      {/* Contenido del menu en desktop */}
      <div className="w-full flex items-center justify-center">
        {openCart === true ? <CartComponent setOpenCart={setOpenCart} /> : ""}
        <div className="flex w-2/12 justify-center " onClick={goToHome}>
          <img
            src="/Logo2.jpg"
            className="w-14 h-14 bg-gray-200 object-cover rounded-xl"
            alt="logo"
          />
        </div>
        <DropdownMenu />
        <InfoMenu setOpenCart={setOpenCart} />
      </div>
      {/* Boton del menu mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setIlgenuOpen(!ilgenuOpen)}
          className="block text-white focus:outline-none"
        >
          {ilgenuOpen ? (
            <CloseOutlined className="text-4xl mr-5" />
          ) : (
            <MenuOutlined className="text-4xl mr-5" />
          )}
        </button>
      </div>
      {/* Contenido del menu en mobile */}
      {ilgenuOpen && <MobileMenu setOpenCart={setOpenCart} />}
    </div>
  );
}
