import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import { Collapse, ConfigProvider } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
export default function Footer() {
  const items = [
    {
      key: "1",
      label: <h2 className="text-xl font-extrabold font-myfont mb-3">AYUDA</h2>,
      children: (
        <div className="flex flex-col w-full justify-start items-start px-10 py-2">
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Envios y entregas
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Devoluciones
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Cambios
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Autogestionar mi devolucion
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Opciones de pago
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Contactate
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Defensa al consumidor
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Libro de quejas online
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <h2 className="text-xl font-extrabold font-myfont mb-3 uppercase">
          Acerca de ActiveStyle
        </h2>
      ),
      children: (
        <div className="flex flex-col w-full justify-start items-start px-10 py-2">
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Proposito
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Noticias
          </button>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <h2 className="text-xl font-extrabold font-myfont mb-3 uppercase">
          Novedades
        </h2>
      ),
      children: (
        <div className="flex flex-col w-full justify-start items-start px-10 py-2">
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Encontra tu calzado
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            ¿Como elegir tu top?
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Tips saludables
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Promociones
          </button>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <h2 className="text-xl font-extrabold font-myfont mb-3 uppercase">
          Redes
        </h2>
      ),
      children: (
        <div className="flex flex-col w-full justify-start items-start px-10 py-2">
          <div className="flex lg:w-full flex-row">
            <button className="rounded-full my-2 bg-gray-300 p-2 text-black hover:bg-white mx-3">
              <FaXTwitter />
            </button>
            <button className="rounded-full my-2 bg-gray-300 p-2 text-black hover:bg-white mx-3">
              <FaFacebook />
            </button>
            <button className="rounded-full my-2 bg-gray-300 p-2 text-black hover:bg-white mx-3">
              <FaInstagram />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <footer className="bg-black flex flex-col items-center justify-center text-white w-full">
      <div className="hidden lg:flex lg:w-3/4 w-full lg:flex-row flex-wrap justify-around">
        <div className="flex flex-col  justify-start items-start p-10 mt-4">
          <h2 className="text-xl font-extrabold font-myfont mb-3">AYUDA</h2>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Envios y entregas
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Devoluciones
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Cambios
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Autogestionar mi devolucion
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Opciones de pago
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Contactate
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Defensa al consumidor
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Libro de quejas online
          </button>
        </div>
        <div className="flex flex-col  justify-start items-start p-10 mt-4">
          <h2 className="text-xl font-extrabold font-myfont mb-3 uppercase">
            Acerca de ActiveStyle
          </h2>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Proposito
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Noticias
          </button>
        </div>
        <div className="flex flex-col  justify-start items-start p-10 mt-4">
          <h2 className="text-xl font-extrabold font-myfont mb-3 uppercase">
            Novedades
          </h2>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Encontra tu calzado
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            ¿Como elegir tu top?
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Tips saludables
          </button>
          <button className="text-gray-400 my-3 font-myfont hover:text-gray-600">
            Promociones
          </button>
        </div>
        <div className="flex flex-col  justify-start items-start p-10 mt-4">
          <h2 className="text-xl font-extrabold font-myfont mb-3 uppercase">
            Redes
          </h2>
          <div className="flex lg:w-full flex-col lg:flex-row">
            <button className="rounded-full my-2 bg-gray-300 p-2 text-black hover:bg-white mx-3">
              <FaXTwitter />
            </button>
            <button className="rounded-full my-2 bg-gray-300 p-2 text-black hover:bg-white mx-3">
              <FaFacebook />
            </button>
            <button className="rounded-full my-2 bg-gray-300 p-2 text-black hover:bg-white mx-3">
              <FaInstagram />
            </button>
          </div>
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorText: "#fff",
            borderRadius: 0,
          },
          components: {
            Collapse: {
              contentPadding: 0,
              contentBg: "#000",
            },
          },
        }}
      >
        <Collapse
          accordion
          items={items}
          className="w-full lg:hidden bg-black flex flex-col justify-center-center mx-1"
        />
      </ConfigProvider>
      <div className="w-full flex justify-between items-start lg:items-center flex-col lg:flex-row mt-2 lg:mt-0 py-5">
        <div className="flex ml-3 justify-center items-center text-sm my-1 lg:my-0">
          <FaMapMarkerAlt /> Mendoza, Argentina
        </div>
        <div className="flex flex-col lg:flex-row">
          <p className="text-xs ml-3 my-2 lg:my-0 lg:m-2">
            Terminos y condiciones
          </p>
          <p className="text-xs ml-3 my-1 lg:my-0 lg:m-2">
            Politicas de privacidad y cookies
          </p>
        </div>
      </div>
    </footer>
  );
}
