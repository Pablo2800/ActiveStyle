import React from "react";
import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordFill } from "react-icons/ri";
import useNavigation from "../hooks/useNavigate";
import { FcGoogle } from "react-icons/fc";
import useUser from "../hooks/useUser";
export default function Login() {
  const { handleLogin } = useUser();
  const { goToRegister, goToHome } = useNavigation();

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-1">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/2294403/pexels-photo-2294403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      ></div>

      <div className="flex flex-col sm:flex-row relative z-10 bg-gray-400 p-8 rounded-xl">
        <Form
          name="basic"
          onFinish={handleLogin}
          autoComplete="on"
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
          <div className="flex items-center justify-center w-full mb-5 ">
            <button
              type="submit"
              className="bg-primary-2 text-white p-1 w-52 text-lg rounded-lg hover:bg-black flex items-center justify-center mx-1"
            >
              Ingresar
            </button>
          </div>
          <button
            className="bg-transparent text-xs text-white hover:text-black self-start"
            size="small"
            type="link"
            onClick={goToRegister}
          >
            No tienes cuenta? Regístrate aquí
          </button>
        </Form>
        <div className="hidden sm:flex items-center justify-center w-full ml-3">
          <div className="border border-white border-t-0 border-b-0 h-full border-l-0 flex items-center"></div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <button className="flex items-center justify-center min-w-52 w-52 bg-primary-2 rounded-lg text-white p-1 sm:mx-3 my-5 self-center text-lg">
            <FcGoogle className="mx-1 w-5 h-5" /> Sign in with Google
          </button>
          <button
            className="sm:absolute sm:bottom-10 bg-transparent text-sm text-white hover:text-black self-center underline underline-offset-4"
            size="small"
            type="link"
            onClick={goToHome}
          >
            Volver al home
          </button>
        </div>
      </div>
    </div>
  );
}
