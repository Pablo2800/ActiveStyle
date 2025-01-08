import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

export default function FormNewObject() {
  const [formValues, setFormValues] = useState({
    nameProduct: "",
    description: "",
    price: "",
    marca: "",
    discount: false,
    porcentaje: 0,
    indumentaria: "",
    genero: "",
    actividad: "",
  });
  const [imagenes, setImagenes] = useState([]);
  const [talles, setTalles] = useState("");
  const [cantidadTalle, setCantidadTalle] = useState(0);
  const [talleFinal, setTalleFinal] = useState([]);

  const handleTalleChange = (talle) => {
    setTalles(talle);
    setCantidadTalle(0);
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
      label: "Descripción",
      type: "text",
      required: true,
      message: "Ingrese la descripción del producto",
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
      id: 6,
      name: "discount",
      label: "¿Tiene descuento?",
      type: "boolean",
      required: true,
      message: "Ingrese si el producto tiene descuento o no",
    },
    {
      id: 7,
      name: "indumentaria",
      label: "Indumentaria",
      type: "select",
      required: true,
      message: "Seleccione el tipo de indumentaria",
      options: [
        "zapatilla",
        "botines",
        "remera",
        "camiseta",
        "campera",
        "pantalon",
        "short",
        "abrigo",
        "mochila",
        "gorra",
      ],
    },
    {
      id: 8,
      name: "genero",
      label: "Género",
      type: "select",
      required: true,
      message: "Seleccione el género",
      options: ["hombre", "mujer", "niño"],
    },
    {
      id: 9,
      name: "actividad",
      label: "Actividad",
      type: "select",
      required: true,
      message: "Seleccione la actividad",
      options: [
        "futbol",
        "basquet",
        "running",
        "entrenamiento",
        "tenis",
        "skate",
      ],
    },
  ];

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImagenes(Array.from(e.target.files));
    }
  };

  const onFinish = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    imagenes.forEach((imagen) => formData.append("imagenes", imagen));

    console.log("Datos enviados:", values);
    console.log("Imágenes:", imagenes);
  };

  const handleCantidadTotalTalle = (e, talle1, cantidad1) => {
    e.preventDefault();
    setTalleFinal((prev) => [...prev, { talle: talle1, cantidad: cantidad1 }]);
  };

  // console.log({ arrayFinal: talleFinal });
  // talleFinal.forEach((talle) => {
  //   console.log(Object.values(talle));
  // });

  const onFinishFailed = (errorInfo) => {
    console.error("Error:", errorInfo);
  };
  console.log(Object.values(talleFinal).forEach((a) => console.log(a.talle)));
  const allTalles = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <Form
      name="basic"
      className="bg-blue-200 flex flex-col items-center justify-center p-3 rounded-xl w-2/4 mt-10 h-full"
      initialValues={formValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {campos.map((campo) => (
        <Form.Item
          className="w-1/2 my-3"
          key={campo.id}
          name={campo.name}
          label={campo.label}
          rules={[
            {
              required: campo.required,
              message: campo.message,
            },
          ]}
        >
          {campo.type === "select" ? (
            <Select placeholder={`Seleccione ${campo.label}`} allowClear>
              {campo.options?.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : campo.type === "boolean" ? (
            <Select placeholder={`Seleccione ${campo.label}`} allowClear>
              <Option value={true}>Sí</Option>
              <Option value={false}>No</Option>
            </Select>
          ) : (
            <Input type={campo.type} placeholder={`Ingrese ${campo.label}`} />
          )}
        </Form.Item>
      ))}

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
              <Input
                type="number"
                placeholder="Ingrese cantidad de descuento"
              />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item className="w-1/2 my-3">
        <Select
          placeholder={`Seleccione un talle`}
          onChange={handleTalleChange}
        >
          {allTalles.map((talle) => (
            <Option
              value={talle}
              disabled={
                Object.values(talleFinal).forEach((a) => a.talle) === talle
              }
            >
              {talle}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {talles && (
        <>
          <Form.Item className="w-1/2 my-3">
            <Input
              type="number"
              placeholder="Ingrese cantidad de talles en stock"
              value={cantidadTalle}
              onChange={(e) => setCantidadTalle(Number(e.target.value))}
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={(e) => handleCantidadTotalTalle(e, talles, cantidadTalle)}
            className="bg-primary-3 text-background text-xs mt-2 disabled:opacity-50"
          >
            Confirmar
          </Button>
          <p>
            Talles acumulados:
            {talleFinal.map(({ talle, cantidad }, index) => (
              <span key={index}>
                {talle}: {cantidad},{" "}
              </span>
            ))}
          </p>
        </>
      )}
      <Form.Item className="w-1/2 my-3">
        <label className="block mb-2">Imágenes:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-primary-3">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
