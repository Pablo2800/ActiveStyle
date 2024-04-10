import { Button } from "antd";
import React from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useNavigation from "../hooks/useNavigate";
export default function Navbar() {
  const { goToLogin } = useNavigation();
  return (
    <div className="flex items-center justify-center w-full p-2">
      <div className="flex w-2/12 justify-center">
        <img
          src="/LogoSinFondo.png"
          className="w-20 h-20 bg-gray-200 object-cover"
          alt="logo"
        />
      </div>
      <div className="flex w-6/12 items-center justify-center">
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
      <div className="flex w-4/12 justify-center ">
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
          icon={<ShoppingCartOutlined className="p-2" />}
        />
        <Button
          className="bg-transparent text-black hover:text-gray-600"
          size="large"
          type="link"
          icon={<UserOutlined />}
          onClick={goToLogin}
        >
          Iniciar Sesion/Registrarse
        </Button>
      </div>
    </div>
  );
}
