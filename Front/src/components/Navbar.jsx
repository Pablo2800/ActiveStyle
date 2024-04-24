import { Button } from "antd";
import React, { useState } from "react";
import {
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useNavigation from "../hooks/useNavigate";
import { useSelector } from "react-redux";
import { getAccess } from "../redux/userSlice";
import AccountMenu from "./MenuDesplegabel";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const access = useSelector(getAccess);
  const { goToLogin } = useNavigation();

  return (
    <div className="flex items-center h-20 w-full p-2 sticky">
      <div className="w-full flex items-center justify-center">
        <div className="flex w-2/12 justify-center">
          <img
            src="/LogoSinFondo.png"
            className="w-20 h-20 bg-gray-200 object-cover"
            alt="logo"
          />
        </div>
        <div className="hidden sm:flex w-6/12 items-center justify-end">
          <Button
            type="text"
            className="text-black mx-2 text-lg flex items-center p-6"
          >
            Productos
          </Button>
          <Button
            type="text"
            className="text-black mx-2 text-lg flex items-center p-6"
          >
            Locales
          </Button>
          <Button
            type="text"
            className="text-black mx-2 text-lg flex items-center p-6"
          >
            Promos y cuotas
          </Button>
          <Button
            type="text"
            className="text-black mx-2 text-lg flex items-center p-6"
          >
            Contacto
          </Button>
        </div>
        <div className="hidden sm:flex w-4/12 justify-end p-2 ">
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
          />
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
      </div>
      <div className="sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <CloseOutlined className="text-4xl mr-5" />
          ) : (
            <MenuOutlined className="text-4xl mr-5" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden absolute right-0 top-20 bg-gray-400 w-full z-10">
          <div className="flex flex-col items-center justify-center space-y-2 py-2 px-4">
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
            />
          </div>
        </div>
      )}
    </div>
  );
}
