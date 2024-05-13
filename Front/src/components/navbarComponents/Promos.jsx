import { Dropdown, Space } from "antd";
import useProducts from "../../hooks/useProducts";

export default function Promos() {
  const { handleDiscountProducts } = useProducts();
  return (
    <button
      onClick={() => handleDiscountProducts("discount")}
      className="text-black mx-5 text-lg flex items-center p-2 font-myfont"
    >
      <Space>Promos y Cuotas</Space>
    </button>
  );
}
