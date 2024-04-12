import { Button } from "antd";
import React from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useNavigation from "../hooks/useNavigate";
import { useSelector } from "react-redux";
import { getAccess } from "../redux/userSlice";
import MenuDesplegable from "./MenuDesplegabel";
export default function Navbar() {
  const access = useSelector(getAccess);
  const { goToLogin } = useNavigation();
  return (
    <div className="flex items-center  w-full p-2">
      <div className="flex w-2/12 justify-center">
        <img
          src="/LogoSinFondo.png"
          className="w-20 h-20 bg-gray-200 object-cover"
          alt="logo"
        />
      </div>
      <div className="flex w-6/12 items-center justify-end">
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
      <div className="flex w-4/12 justify-end ">
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
          <MenuDesplegable />
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
  );
}
