import { Dropdown, Space } from "antd";

export default function Contactos() {
  const items = [
    {
      key: "1",
      type: "group",
      label: "Group title",
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
  return (
    <Dropdown
      menu={{
        items,
      }}
      className="text-black mx-5 text-lg flex items-center p-2 font-myfont"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>Contactos</Space>
      </a>
    </Dropdown>
  );
}
