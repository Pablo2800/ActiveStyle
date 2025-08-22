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
      img: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg",
      github: "https://github.com/Pablo2800",
      linkedin: "https://www.linkedin.com/in/pablo-palazzetti/",
      portfolio: "https://my-portfolio-fawn-three-42.vercel.app/",
      description:
        `Apasionado por el desarrollo web y el aprendizaje constante.
          Me formé en un bootcamp intensivo de programación Fullstack de 9 meses, donde consolidé mis conocimientos en tecnologías web.
          Desde hace 18 meses trabajo como desarrollador Frontend, creando aplicaciones modernas, optimizadas y centradas en
          brindar la mejor experiencia a los usuarios. `,
      rol: "FrontEnd ", 
    },
    {
      name: "Sebastian",
      apellido: "Pineda",
      edad: "23 años",
      img: "/Sebastian_Pineda.jpeg",
      github: "https://github.com/SebaPineda23",
      linkedin: "https://www.linkedin.com/in/sebastian-pineda-a9a848294/",
      portfolio: "",
      description: `Estudiante avanzado de Ingeniería en Sistemas de Información (UTNFRM – Mendoza)
        con experiencia en desarrollo backend y APIs. 
        Me especializo en Java (Spring Boot), bases de datos y soluciones web escalables.
        📌 Apasionado por la tecnología, la resolución de problemas y la interacción con el cliente.
        📧 sebapinedadev@gmail.com`
        ,
      rol: "Backend",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="w-full  flex flex-col">
      <Navbar />
      <div className="w-full lg:min-h-[calc(100vh-5rem)] lg:h-full flex items-center flex-col justify-center my-2">
        <h1 className="text-2xl font-myfont mb-8 mt-3">
          Creadores de la aplicacion
        </h1>
        <div className="w-full flex lg:flex-row flex-col">
        {creadores.map((creador) => (
  <div
    key={creador.name}
    className="w-full lg:w-1/2 flex flex-col items-center justify-between px-6"
  >
    <div className="w-72 h-72 flex items-center justify-center mb-4">
      <img
        src={creador.img}
        alt=""
        className="w-72 h-72 object-cover rounded-xl"
      />
    </div>

    <p className="text-2xl font-myfont font-bold my-2">
      {creador.name} {creador.apellido}
    </p>
    <p className="text-xl font-serif">{creador.rol}</p>

    <div className="w-3/4 min-h-[120px] flex flex-col text-start mb-4">
      {creador.name === "Sebastian" ? (
        <>
          <p>
            Estudiante avanzado de Ingeniería en Sistemas de Información (UTNFRM
            – Mendoza) con experiencia en desarrollo backend y APIs. Me
            especializo en Java (Spring Boot), bases de datos y soluciones web
            escalables.
          </p>
          <p>
            📌 Apasionado por la tecnología, la resolución de problemas y la
            interacción con el cliente.
          </p>
          <p>📧 sebapinedadev@gmail.com</p>
        </>
      ) : (
        <p>{creador.description}</p>
      )}
    </div>

    {/* Botones */}
    <div className="flex flex-row justify-center items-center mt-auto mb-3">
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
