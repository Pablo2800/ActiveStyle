import { Dropdown, Space } from "antd";

export default function Products() {
  const items = [
    {
      key: "1",
      type: "group",
      children: [
        {
          key: "1-1",
          label: <p className="font-myfont w-96 text-xl">Zapatillas</p>,
        },
        {
          key: "1-2",
          label: <p className="font-myfont w-96 text-xl">Camperas</p>,
        },
        {
          key: "1-3",
          label: <p className="font-myfont w-96 text-xl">Pantalones</p>,
        },
        {
          key: "1-4",
          label: <p className="font-myfont w-96 text-xl">Buzos</p>,
        },
        {
          key: "1-5",
          label: <p className="font-myfont w-96 text-xl">Botines</p>,
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
