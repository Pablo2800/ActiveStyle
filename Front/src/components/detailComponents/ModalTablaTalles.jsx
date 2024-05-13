import { Modal } from "antd";
import React from "react";
import useProducts from "../../hooks/useProducts";

export default function ModalTablaTalles({ isVisible, onCancel }) {
  const { product } = useProducts();

  return (
    <Modal
      title="Tabla de talles"
      open={isVisible}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={onCancel}
      footer={null}
    >
      {product.indumentaria === "Zapatillas" ||
      product.indumentaria === "Botines" ? (
        <div>
          <img
            src="https://www.nike.com.ar/arquivos/TallesArg_CalzadoHombre_Mobile_v1.jpg"
            alt=""
          />
          <img
            src="https://www.nike.com.ar/arquivos/TallesArg_CalzadoMujer_Mobile.png"
            alt=""
          />
        </div>
      ) : (
        <div>
          <img
            src="https://www.nike.com.ar/arquivos/TallesArg_RopaHombre_Mobile.png"
            alt=""
          />
          <img
            src="https://www.nike.com.ar/arquivos/TallesArg_RopaMujer_Mobile.png"
            alt=""
          />
          <img
            src="https://www.nike.com.ar/arquivos/TallesArg_RopaNi%C3%B1os_Mobile.png"
            alt=""
          />
        </div>
      )}
    </Modal>
  );
}
