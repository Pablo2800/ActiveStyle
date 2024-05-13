import React, { useState } from "react";
import { Button } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getAccess } from "../../redux/userSlice";
import AccountMenu from "../MenuDesplegabel";
import useNavigation from "../../hooks/useNavigate";
import Carrito from "../Carrito";
import Promos from "./Promos";
import Marcas from "./Marcas";
import Products from "./Products";

export default function MobileMenu({ setOpenCart, openCart }) {
  const access = useSelector(getAccess);
  const { goToLogin } = useNavigation;

  return (
    <div className="absolute flex right-0 top-20 bg-gray-300 w-full lg:hidden">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex w-full justify-center p-2 bg-gray-400">
          <Button
            className="text-xl bg-transparent mx-2"
            size="large"
            type="text"
            icon={<SearchOutlined className="p-2" />}
          />
          <Button
            className="text-xl bg-transparent mx-2"
            size="large"
            type="text"
            icon={<ShoppingCartOutlined className="p-2 w-full h-full" />}
            onClick={() => {
              setOpenCart(true);
            }}
          />
          {openCart === true ? <Carrito /> : ""}
          {access === true ? (
            <AccountMenu />
          ) : (
            <Button
              className="bg-transparent text-black hover:text-gray-600"
              size="large"
              type="link"
              icon={<UserOutlined />}
              onClick={goToLogin}
            >
              Iniciar Sesion/Registrarse
            </Button>
          )}
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Products />
            <Marcas />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Promos />
            <button
              type="text"
              className="text-black my-3 text-lg flex items-center p-2 "
            >
              Contacto
            </button>
          </div>
        </div>
        <div className="bg-gray-400 w-full flex items-center justify-center p-2 font-myfont text-lg">
          App creada por Pablo y Seviche
        </div>
      </div>
    </div>
  );
}
