import { Avatar, Badge, Button, Input } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getAccess } from "../../redux/userSlice";
import AccountMenu from "../MenuDesplegabel";
import useNavigation from "../../hooks/useNavigate";
import Carrito from "../Carrito";
import Promos from "./Promos";
import Marcas from "./Marcas";
import Products from "./Products";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
const { Search } = Input;
export default function MobileMenu({ setOpenCart, openCart }) {
  const access = useSelector(getAccess);
  const { goToLogin } = useNavigation;
  const { cart } = useCart();
  const { onSearch } = useProducts();
  return (
    <div className="absolute flex right-0 top-20 bg-gray-300 w-full lg:hidden">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex w-full justify-center items-center p-2 bg-gray-400">
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
