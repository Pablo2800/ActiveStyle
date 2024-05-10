import { Dropdown, Space } from "antd";
import useProducts from "../../hooks/useProducts";

export default function Products() {
  const {
    handleProductsByGenre,
    handleProductsByActivity,
    handleProductsByIndumentaria,
  } = useProducts();
  const items = [
    {
      key: "1",
      type: "group",
      children: [
        {
          key: "1-1",
          label: (
            <button
              onClick={() => handleProductsByIndumentaria("zapatillas")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Zapatillas
            </button>
          ),
        },
        {
          key: "1-2",
          label: (
            <button
              onClick={() => handleProductsByIndumentaria("Campera")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Camperas
            </button>
          ),
        },
        {
          key: "1-3",
          label: (
            <button
              onClick={() => handleProductsByIndumentaria("pantalones")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Pantalones
            </button>
          ),
        },
        {
          key: "1-4",
          label: (
            <button
              onClick={() => handleProductsByIndumentaria("buzos")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Buzos
            </button>
          ),
        },
        {
          key: "1-5",
          label: (
            <button
              onClick={() => handleProductsByIndumentaria("botines")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Botines
            </button>
          ),
        },
        {
          key: "1-6",
          label: (
            <button
              onClick={() => handleProductsByGenre("hombre")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Hombre
            </button>
          ),
        },
        {
          key: "1-7",
          label: (
            <button
              onClick={() => handleProductsByGenre("mujer")}
              className="font-myfont w-96 text-xl flex items-start justify-start"
            >
              Mujer
            </button>
          ),
        },
      ],
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      className="text-black mx-5 text-lg p-2 font-myfont"
    >
      <Space>Productos</Space>
    </Dropdown>
  );
}
