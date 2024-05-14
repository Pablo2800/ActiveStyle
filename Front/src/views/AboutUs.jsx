import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { Tooltip } from "antd";
export default function AboutUs() {
  const creadores = [
    {
      name: "Pablo",
      apellido: "Palazzetti",
      edad: "23 años",
      img: "https://cdn.pixabay.com/photo/2024/05/02/06/45/ai-generated-8733757_640.png",
      github: "https://github.com/Pablo2800",
      linkedin: "https://www.linkedin.com/in/pablo-palazzetti/",
      portfolio: "https://my-portfolio-fawn-three-42.vercel.app/",
      description:
        "Me encargue de los estilos, el manejo del carrito, la persistencia de datos. Tambien implemente una serie de filtros combinados.",
      rol: "FrontEnd",
    },
    {
      name: "Sebastian",
      apellido: "Pineda",
      edad: "23 años",
      img: "https://cdn.pixabay.com/photo/2024/04/20/02/44/ai-generated-8707603_640.jpg",
      github: "https://github.com/SebaPineda23",
      linkedin: "https://www.linkedin.com/in/sebastian-pineda-a9a848294/",
      portfolio: "",
      description:
        "Hizo 5 rutas locas (2 no funcionan). Su mayor logro fue subir imagenes a la nube.",
      rol: "Se supone q Backend",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="w-full  flex flex-col">
      <Navbar />
      <div className="w-full lg:h-[calc(100vh-5rem)] flex items-center flex-col justify-center my-2">
        <h1 className="text-2xl font-myfont mb-8 mt-3">
          Creadores de la aplicacion
        </h1>
        <div className="w-full flex lg:flex-row flex-col">
          {creadores.map((creador) => (
            <div
              key={creador.name}
              className="w-full lg:w-1/2 flex flex-col items-center justify-center"
            >
              <img
                src={creador.img}
                alt=""
                className="w-72 h-72 object-cover rounded-xl"
              />
              <p className="text-2xl font-myfont font-bold my-2">
                {creador.name} {creador.apellido}
              </p>
              <p className="text-xl font-serif">{creador.rol}</p>
              <p className="w-72">{creador.description}</p>
              <div className="flex lg:w-full flex-row justify-center items-center my-3">
                <Tooltip title="Perfil de Github">
                  <button
                    onClick={() => window.open(creador.github)}
                    className="rounded-full my-2 bg-black p-2 text-white hover:bg-gray-300 hover:text-black mx-3"
                  >
                    <FaGithub />
                  </button>
                </Tooltip>
                <Tooltip title="Perfil de Linkedin">
                  <button
                    onClick={() => window.open(creador.linkedin)}
                    className="rounded-full my-2 bg-black p-2 text-white hover:bg-gray-300 hover:text-black mx-3"
                  >
                    <FaLinkedin />
                  </button>
                </Tooltip>
                <Tooltip title="Portfolio">
                  <button
                    onClick={() => window.open(creador.portfolio)}
                    className="rounded-full my-2 bg-black p-2 text-white hover:bg-gray-300 hover:text-black mx-3"
                  >
                    <MdComputer />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
