import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import useUser from "../hooks/useUser";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const MenuDesplegable = () => {
  const { handleLogout } = useUser();
  const items = [
    getItem("Perfil", "sub1", <UserOutlined />, [
      getItem(
        <Button
          className="bg-transparent mx-2"
          size="large"
          type="text"
          onClick={handleLogout}
        >
          Cerrar Sesion
        </Button>
      ),
    ]),
  ];
  return (
    <div>
      <Menu
        className="bg-transparent flex items-center"
        items={items}
        mode="horizontal"
      />
    </div>
  );
};
export default MenuDesplegable;
