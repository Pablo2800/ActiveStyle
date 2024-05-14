import { Dropdown, Space } from "antd";
import useProducts from "../../hooks/useProducts";

export default function Products() {
  const {
    handleProductsByGenre,
    handleProductsByActivity,
    handleProductsByIndumentaria,
    allIndumentarias,
    renderAllProducts,
  } = useProducts();

  const generoItems = [
    { id: 1, name: "Hombre", value: "hombre" },
    { id: 2, name: "Mujer", value: "mujer" },
    { id: 3, name: "Niños", value: "niño" },
  ];
  const actividadItems = [
    { id: 1, name: "Futbol", value: "futbol" },
    { id: 2, name: "Basquet", value: "basquet" },
    { id: 3, name: "Running", value: "running" },
    { id: 4, name: "Entrenamiento", value: "entrenamiento" },
    { id: 5, name: "Tenis", value: "tenis" },
    { id: 6, name: "Skate", value: "skate" },
  ];
  return (
    <Dropdown
      overlay={
        <div className="flex bg-white p-3 w-full mt-3">
          <div className="menu-column pl-10 pt-2 px-2">
            <h2 className="text-gray-500 text-sm font-myfont p-2">
              Indumentaria
            </h2>
            {allIndumentarias.map((item) => {
              return (
                <button
                  key={item}
                  onClick={() => handleProductsByIndumentaria(item)}
                  className="font-myfont w-40 text-xl flex items-start justify-start my-1 hover:bg-gray-300 p-2 rounded-xl"
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="menu-column pl-10 pt-2">
            <h2 className="text-gray-500 text-sm font-myfont flex flex-col p-2">
              Genero
            </h2>
            {generoItems.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleProductsByGenre(item.value)}
                  className="font-myfont w-40 text-xl flex items-start justify-start my-1 hover:bg-gray-300 p-2 rounded-xl"
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="menu-column pl-10 pt-2">
            <h2 className="text-gray-500 text-sm font-myfont p-2">Actividad</h2>
            {actividadItems.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleProductsByActivity(item.value)}
                  className="font-myfont w-40 text-xl flex items-start justify-start my-1 hover:bg-gray-300 p-2 rounded-xl"
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      }
      className="text-black mx-5 text-lg p-2 font-myfont"
    >
      <Space
        className="cursor-pointer hover:text-white"
        onClick={() => renderAllProducts("allProducts")}
      >
        Productos
      </Space>
    </Dropdown>
  );
}
