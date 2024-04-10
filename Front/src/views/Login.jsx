import React from "react";
import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordFill } from "react-icons/ri";
import useNavigation from "../hooks/useNavigate";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { goToHome, goToRegister } = useNavigation();

  return (
    <div className="flex justify-center items-center h-screen bg-primary-1">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/2294403/pexels-photo-2294403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      ></div>

      <div className="flex  relative z-10 bg-primary-3 p-8 rounded-xl">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex items-center justify-center flex-col"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su usuario",
              },
            ]}
            className="w-full min-w-72"
          >
            <Input
              placeholder=" Usuario"
              prefix={<UserOutlined />}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña",
              },
            ]}
            className="w-full"
          >
            <Input.Password
              placeholder=" Contraseña"
              prefix={<RiLockPasswordFill />}
            />
          </Form.Item>

          <button
            className="bg-transparent mb-5 text-xs text-white hover:text-black self-start"
            size="small"
            type="link"
            onClick={goToRegister}
          >
            No tienes cuenta? Regístrate aquí
          </button>

          <div className="flex items-center justify-center w-full">
            <button
              type="submit" // Especifica el tipo de botón como "submit" para que funcione dentro de un formulario
              className="bg-primary-2 text-white p-1 w-52 text-lg rounded-lg hover:bg-black flex items-center justify-center mx-1"
              onClick={goToHome} // Maneja el evento de clic del botón
            >
              Ingresar
            </button>
          </div>
        </Form>
        <div className="flex items-center justify-center w-full ml-3">
          <div className="border border-white border-t-0 border-b-0 h-full border-l-0 flex items-center"></div>
        </div>
        <button className="flex items-center justify-center bg-primary-2 rounded-lg text-white p-1 mx-3  self-center min-w-44">
          <FcGoogle className="mx-1 w-5 h-5" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
