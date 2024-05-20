import React from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

export default function FormNewObject() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const campos = [
    {
      id: 1,
      name: "nameProduct",
      label: "Nombre del producto",
      type: "text",
      required: true,
      message: "Ingrese el nombre del producto",
    },
    {
      id: 2,
      name: "description",
      label: "Descripcion",
      type: "text",
      required: true,
      message: "Ingrese la descripcion del producto",
    },
    {
      id: 3,
      name: "price",
      label: "Precio",
      type: "number",
      required: true,
      message: "Ingrese el precio del producto",
    },
    {
      id: 4,
      name: "marca",
      label: "Marca",
      type: "text",
      required: true,
      message: "Ingrese la marca del producto",
    },
    {
      id: 5,
      name: "stock",
      label: "Stock",
      type: "number",
      required: true,
      message: "Ingrese el stock del producto",
    },
    {
      id: 7,
      name: "indumentaria",
      label: "Indumentaria",
      type: "boolean",
      required: true,
      message: "Ingrese el tipo de indumentaria que es el producto",
    },
    {
      id: 8,
      name: "genero",
      label: "Genero",
      type: "text",
      required: true,
      message: "Ingrese el genero del producto",
    },
    {
      id: 9,
      name: "actividad",
      label: "Actividad",
      type: "text",
      required: true,
      message: "Ingrese la actividad del producto",
    },
    {
      id: 6,
      name: "discount",
      label: "Tiene descuento?",
      type: "boolean",
      required: true,
      message: "Ingrese si el producto tiene descuento o no",
    },
  ];

  return (
    <Form
      name="basic"
      className="bg-blue-200 flex flex-col items-center justify-center p-3 rounded-xl w-2/4 mt-10 h-full"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {campos.map((campo) => {
        return (
          <Form.Item
            className="w-1/2 my-3"
            key={campo.id}
            name={campo.name}
            rules={[
              {
                required: true,
                message: campo.message,
              },
            ]}
          >
            {campo.id === 6 ? (
              <Select placeholder={campo.label} allowClear>
                <Option value={true}>Sí</Option>
                <Option value={false}>No</Option>
              </Select>
            ) : campo.id === 7 ? (
              <Select placeholder={campo.label} allowClear>
                <Option value={"zapatilla"}>zapatilla</Option>
                <Option value={"botines"}>botines</Option>
                <Option value={"remera"}>remera</Option>
                <Option value={"camiseta"}>camiseta</Option>
                <Option value={"campera"}>campera</Option>
                <Option value={"pantalon"}>pantalon</Option>
                <Option value={"short"}>short</Option>
                <Option value={"abrigo"}>abrigo</Option>
                <Option value={"mochila"}>mochila</Option>
                <Option value={"gorra"}>gorra</Option>
              </Select>
            ) : campo.id === 8 ? (
              <Select placeholder={campo.label} allowClear>
                <Option value={"hombre"}>Hombre</Option>
                <Option value={"mujer"}>Mujer</Option>
                <Option value={"niño"}>Niño</Option>
              </Select>
            ) : campo.id === 9 ? (
              <Select placeholder={campo.label} allowClear>
                <Option value={"futbol"}>Futbol</Option>
                <Option value={"basquet"}>Basquet</Option>
                <Option value={"running"}>Running</Option>
                <Option value={"entrenamiento"}>Entrenamiento</Option>
                <Option value={"tenis"}>Tenis</Option>
                <Option value={"skate"}>Skate</Option>
              </Select>
            ) : (
              <Input type={campo.type} placeholder={campo.label} />
            )}
          </Form.Item>
        );
      })}

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.discount !== currentValues.discount
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("discount") === true ? (
            <Form.Item
              className="w-1/2 my-3"
              name="porcentaje"
              rules={[
                {
                  required: true,
                  message: "Ingrese cantidad de descuento",
                },
              ]}
            >
              <Input placeholder="Ingrese cantidad de descuento" />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
