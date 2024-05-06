import { Modal } from "antd";
import React from "react";

export default function ModalTablaTalles({ isVisible, onCancel }) {
  return (
    <Modal
      title="Tabla de talles"
      open={isVisible}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={onCancel}
      footer={null}
    >
      <img
        src="https://www.nike.com.ar/arquivos/TallesArg_CalzadoHombre_Mobile_v1.jpg"
        alt=""
      />
      <img
        src="https://www.nike.com.ar/arquivos/TallesArg_CalzadoMujer_Mobile.png"
        alt=""
      />
    </Modal>
  );
}
