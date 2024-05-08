import React from "react";
import useProducts from "../../hooks/useProducts";
import useCart from "../../hooks/useCart";
import { Button, ConfigProvider, Input, Avatar, Badge } from "antd";
import useNavigation from "../../hooks/useNavigate";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import AccountMenu from "../MenuDesplegabel";
const { Search } = Input;

export default function InfoMenu({ setOpenCart, openCart }) {
  const { goToLogin, access } = useNavigation();
  const { onSearch } = useProducts();
  const { cart } = useCart();
  return (
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
        onClick={() => setOpenCart(!openCart)}
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
  );
}
