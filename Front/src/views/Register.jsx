import React from "react";
import { Form, Input, InputNumber } from "antd";
import { FaUser, FaUserCircle, FaRegUser } from "react-icons/fa";
import { IoIosMail, IoIosPhonePortrait } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import useNavigation from "../hooks/useNavigate";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useUser from "../hooks/useUser";

export default function Register() {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { handleGoBack } = useNavigation();
  const { handleSubmit } = useUser();
  return (
    <div className="flex justify-center items-center h-screen bg-primary-1">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/258356/pexels-photo-258356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      ></div>
      <div className="flex flex-col relative z-10 bg-primary-2 bg-opacity-90 p-8 rounded-xl sm:w-3/5 justify-around items-center">
        <button onClick={handleGoBack} className="flex w-full">
          <ArrowLeftOutlined className="text-white" />
        </button>
        <Form
          name="basic"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col items-center justify-center p-2 w-full"
        >
          <div className="flex w-full">
            <div className="flex flex-col w-full sm:w-1/2 sm:p-2 px-2">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su usuario",
                  },
                ]}
              >
                <Input
                  prefix={<FaUserCircle />}
                  type="text"
                  className="rounded-xl font-myfont font-semibold p-2 w-full"
                  placeholder="Nombre de usuario"
                />
              </Form.Item>
              <Form.Item
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su nombre",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="rounded-xl p-2 w-full"
                  placeholder="Nombre"
                  prefix={<FaUser />}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su apellido",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="rounded-xl p-2 w-full"
                  placeholder="Apellido"
                  prefix={<FaRegUser />}
                ></Input>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su email",
                  },
                ]}
              >
                <Input
                  prefix={<IoIosMail />}
                  type="email"
                  className="rounded-xl p-2 w-full"
                  placeholder="Mail"
                ></Input>
              </Form.Item>
            </div>
            <div className="border border-white border-t-0 border-b-0 h-72 mx-2 border-l-0 hidden sm:flex items-center"></div>
            <div className="flex flex-col w-full sm:w-1/2 sm:p-2 px-2">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su Contraseña",
                  },
                ]}
              >
                <Input.Password
                  className="rounded-xl p-2 w-full"
                  placeholder="Contraseña"
                  prefix={<RiLockPasswordFill />}
                ></Input.Password>
              </Form.Item>
              {/* <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la misma contraseña",
                },
              ]}
            >
              <Input.Password
                className="rounded-xl p-2 w-full"
                prefix={<RiLockPasswordFill />}
                placeholder="Repetir contraseña"
              ></Input.Password>
            </Form.Item> */}
              <Form.Item
                name="cellphone"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su Celular",
                  },
                ]}
              >
                <InputNumber
                  maxLength={13}
                  minLength={10}
                  prefix={<IoIosPhonePortrait />}
                  className="rounded-xl p-2 w-full h-10 flex items-center justify-center"
                  placeholder="Celular"
                />
              </Form.Item>
              <Form.Item
                name="dni"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su Dni",
                  },
                ]}
              >
                <InputNumber
                  prefix={<HiMiniIdentification />}
                  maxLength={8}
                  minLength={8}
                  className="rounded-xl p-2 w-full h-10 flex items-center justify-center"
                  placeholder="Dni"
                />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su Direccion",
                  },
                ]}
              >
                <Input
                  prefix={<FaHouse />}
                  type="text"
                  className="rounded-xl p-2 w-full"
                  placeholder="Direccion"
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <button
              type="submit"
              className="p-2 bg-primary-3 text-white rounded-xl w-60"
            >
              Registrarse
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
