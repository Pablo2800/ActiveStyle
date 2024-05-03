import { Dropdown, Space } from "antd";

export default function Products() {
  const items = [
    {
      key: "1",
      type: "group",
      children: [
        {
          key: "1-1",
          label: "1st menu item",
        },
        {
          key: "1-2",
          label: "2nd menu item",
        },
      ],
    },
    {
      key: "2",
      label: "sub menu",
      children: [
        {
          key: "2-1",
          label: "3rd menu item",
        },
        {
          key: "2-2",
          label: "4th menu item",
        },
      ],
    },
  ];

  // Estilos personalizados para el menú del Dropdown
  const menuStyle = {
    width: "60%", // 100% del ancho de la ventana
    minWidth: "auto", // Sin ancho mínimo
    maxWidth: "none", // Sin ancho máximo
  };

  return (
    <Dropdown
      overlayStyle={{ ...menuStyle }} // Aplicar estilos personalizados al menú
      menu={{
        items,
      }}
      className="text-black mx-5 text-lg flex items-center p-2 font-myfont"
    >
      <Space>Productos</Space>
    </Dropdown>
  );
}
