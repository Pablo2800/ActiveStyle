import { Button, ConfigProvider, Input, Avatar, Badge } from "antd";
const { Search } = Input;
import React, { useState } from "react";
import {
  CloseOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useNavigation from "../hooks/useNavigate";
import { useSelector } from "react-redux";
import { getAccess } from "../redux/userSlice";
import AccountMenu from "./MenuDesplegabel";
import MobileMenu from "./navbarComponents/MobileMenu";
import DropdownMenu from "./navbarComponents/DropdownMenu";
import { getCart } from "../redux/cartSlice";

export default function Navbar() {
  const [ilgenuOpen, setIlgenuOpen] = useState(false);
  const access = useSelector(getAccess);
  const { goToLogin } = useNavigation();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const cart = useSelector(getCart);
  return (
    <div className="flex items-center bg-gray-200 h-20 w-full p-2 sticky top-0 z-50">
      {/* Contenido del menu en desktop */}
      <div className="w-full flex items-center justify-center">
        <div className="flex w-2/12 justify-center">
          <img
            src="/LogoSinFondo.png"
            className="w-20 h-20 bg-gray-200 object-cover"
            alt="logo"
          />
        </div>
        <DropdownMenu />
        <div className="hidden lg:flex w-4/12 justify-end p-2 items-center">
          <Search
            placeholder="Buscar..."
            allowClear
            onSearch={onSearch}
            className="flex w-60 items-center justify-center mr-2"
          />
          <Badge
            count={cart.length}
            showZero
            onClick={goToLogin}
            className="cursor-pointer"
          >
            <Avatar icon={<ShoppingCartOutlined />} size="default" />
          </Badge>
          {access === true ? (
            <AccountMenu />
          ) : (
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorLinkHover: "#f5222d",
                  },
                },
              }}
            >
              <Button
                className="bg-transparent text-black font-myfont"
                size="large"
                type="link"
                icon={<UserOutlined />}
                onClick={goToLogin}
              >
                Iniciar Sesión/Registrarse
              </Button>
            </ConfigProvider>
          )}
        </div>
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
      {ilgenuOpen && <MobileMenu />}
    </div>
  );
}
