import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useUser from "../hooks/useUser";
import { Button, ConfigProvider, Form, Input } from "antd";
import { CiEdit } from "react-icons/ci";
export default function Perfil() {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { cellphone, direction, dni, email, lastname, name } = useUser();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="w-full flex flex-col bg-gray-200">
      <Navbar />
      <ConfigProvider
        theme={{
          token: {
            colorLinkHover: "black",
          },
          components: {
            Button: {
              defaultHoverBg: "black",
            },
          },
        }}
      >
        <div className="flex flex-col lg:flex-row mt-8 lg:h-[calc(100vh-5rem)]">
          <div className="flex flex-col w-full lg:w-1/2 items-center">
            <div className="flex items-center justify-center">
              <h3 className="text-2xl font-myfont font-bold my-4 pr-4">
                Mi Perfil
              </h3>
              <Button
                type="link"
                checked={componentDisabled}
                onClick={() => setComponentDisabled(!componentDisabled)}
                className="flex items-center justify-center text-base text-red-600"
              >
                <CiEdit /> Editar
              </Button>
            </div>
            <Form
              className="bg-white rounded-lg p-5 w-[95%] text-black m-3"
              style={{ minWidth: "300px" }}
              onFinish={onFinish}
              disabled={componentDisabled}
            >
              <Form.Item
                name="name"
                label="Nombre"
                initialValue={name}
                className="py-1"
                rules={[
                  { required: true, message: "Por favor ingrese su nombre" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Apellido"
                initialValue={lastname}
                className="py-1"
                rules={[
                  { required: true, message: "Por favor ingrese su apellido" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                className="py-1"
                initialValue={email}
                rules={[
                  { required: true, message: "Por favor ingrese su email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dni"
                label="Documento de identidad"
                initialValue={dni}
                className="py-1"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su documento de identidad",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="direction"
                label="Direccion"
                className="py-1"
                initialValue={direction}
                rules={[
                  { required: true, message: "Por favor ingrese su direccion" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="cellphone"
                label="Numero telefonico"
                className="py-1"
                initialValue={cellphone}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su numero de telefono",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="flex justify-center py-1">
                <Form.Item>
                  <button
                    className="bg-gray-500 text-white p-2 rounded-2xl text-lg font-myfont hover:bg-black"
                    type="primary"
                    htmlType="submit"
                  >
                    Actualizar Perfil
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0 items-center">
            <div className="flex flex-col w-full items-center ">
              <h3 className="text-2xl font-myfont font-bold my-4 m-3">
                Agregar una tarjeta
              </h3>
              <button className="w-4/5 h-56 bg-white rounded-lg text-[50px] mt-2">
                +
              </button>
            </div>
          </div>
        </div>
      </ConfigProvider>
      <Footer />
    </div>
  );
}
