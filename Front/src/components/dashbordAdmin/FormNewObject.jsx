import React, { useState } from "react";
import { Button, Input, Select, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useProducts from "../../hooks/useProducts";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function FormNewObject() {
  const { createProduct } = useProducts();
  const [imagenes, setImagenes] = useState([]);
  const [talleFinal, setTalleFinal] = useState([]);
  const [selectedIndumentaria, setSelectedIndumentaria] = useState("");
  const [selectedTalle, setSelectedTalle] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [discount, setDiscount] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleTalleChange = (talle) => {
    setSelectedTalle(talle);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImagenes(Array.from(e.target.files));
    }
  };

  const handleCantidadTotalTalle = () => {
    const cantidad = parseInt(
      document.getElementById("cantidadTalle").value,
      10
    );
    const talle = selectedTalle;

    if (!talle || isNaN(cantidad)) return;

    setTalleFinal((prev) => {
      const index = prev.findIndex((item) => item.talle === talle);

      if (index !== -1) {
        return prev.map((item, i) =>
          i === index ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        return [...prev, { talle, cantidad }];
      }
    });

    document.getElementById("cantidadTalle").value = ""; // Reiniciar el campo de cantidad
  };

  const handleEditTalle = (index) => {
    const talleSeleccionado = talleFinal[index];
    setSelectedTalle(talleSeleccionado.talle);
    document.getElementById("cantidadTalle").value = talleSeleccionado.cantidad;

    setTalleFinal((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Agregar los valores del formulario al FormData
    formData.append(
      "nameProduct",
      document.getElementById("nameProduct").value
    );
    formData.append(
      "description",
      document.getElementById("description").value
    );
    formData.append("price", document.getElementById("price").value);
    formData.append("marca", document.getElementById("marca").value);
    formData.append("indumentaria", selectedIndumentaria);
    formData.append("genero", gender);
    formData.append("actividad", activity);
    formData.append("discount", discount);
    discount
      ? formData.append(
          "porcentaje",
          document.getElementById("porcentaje").value
        )
      : null;

    // Transformar el array talleFinal en un objeto
    const tallesObject = talleFinal.reduce((acc, talle) => {
      acc[talle.talle] = talle.cantidad;
      return acc;
    }, {});
    formData.append("talles", JSON.stringify(tallesObject));

    // Agregar las imágenes al FormData
    imagenes.forEach((imagen) => formData.append("imageUrls", imagen));

    createProduct(formData);
  };

  const handleGender = (value) => {
    setGender(value);
  };

  const handleActivity = (value) => {
    setActivity(value);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  console.log(fileList);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 p-6 rounded-xl w-2/4 mt-10 grid grid-cols-2 gap-4"
    >
      <div>
        <label className="ml-1">Nombre:</label>
        <Input
          id="nameProduct"
          placeholder="Ingrese el nombre del producto"
          required
        />
      </div>

      <div>
        <label className="ml-1">Descripción:</label>
        <Input id="description" placeholder="Ingrese la descripción" required />
      </div>

      <div>
        <label className="ml-1">Precio:</label>
        <Input
          id="price"
          type="number"
          placeholder="Ingrese el precio"
          required
        />
      </div>

      <div>
        <label className="ml-1">Marca:</label>
        <Input id="marca" placeholder="Ingrese la marca" required />
      </div>

      <div>
        <label className="ml-1">Tipo de indumentaria:</label>
        <Select
          id="indumentaria"
          placeholder="Seleccione un tipo"
          onChange={(value) => setSelectedIndumentaria(value)}
          style={{ width: "100%" }}
          required
        >
          {["Zapatillas", "Botines", "Remera", "Camiseta","Shorts","Pantalones"].map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <label className="ml-1">Talle del producto:</label>
        <Select
          placeholder="Seleccione un talle"
          onChange={handleTalleChange}
          disabled={!selectedIndumentaria}
          style={{ width: "100%" }}
        >
          {selectedIndumentaria === "Zapatilla" ||
          selectedIndumentaria === "Botines"
            ? [37, 38, 39, 40].map((talle) => (
                <Option key={talle} value={talle}>
                  {talle}
                </Option>
              ))
            : ["XS", "S", "M", "L"].map((talle) => (
                <Option key={talle} value={talle}>
                  {talle}
                </Option>
              ))}
        </Select>
        {selectedTalle && (
          <>
            <Input
              id="cantidadTalle"
              type="number"
              placeholder="Ingrese cantidad"
              style={{ marginTop: "8px" }}
            />
            <Button
              type="primary"
              onClick={handleCantidadTotalTalle}
              style={{ marginTop: "8px" }}
            >
              Confirmar
            </Button>
            {talleFinal.length > 0 && (
              <div className="flex mt-2 flex-wrap">
                <p className="mr-2">Talles seleccionados:</p>
                {talleFinal.map((talle, index) => (
                  <button
                    key={index}
                    className="mr-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleEditTalle(index)}
                    type="button"
                  >
                    {talle.talle} x {talle.cantidad} unidades
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div>
        <label className="ml-1">Género:</label>
        <Select
          id="genero"
          placeholder="Seleccione un género"
          onChange={handleGender}
          style={{ width: "100%" }}
          required
        >
          {["Hombre", "Mujer", "Niño"].map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <label className="ml-1">Actividad:</label>
        <Select
          id="actividad"
          placeholder="Seleccione una actividad"
          onChange={handleActivity}
          style={{ width: "100%" }}
          required
        >
          {["Futbol", "Basquet", "Running","Entrenamiento","Tenis","Skate"].map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <label className="ml-1">Descuento?:</label>
        <Select
          id="discount"
          placeholder="Seleccione una opción"
          onChange={(value) => setDiscount(value)}
          style={{ width: "100%" }}
          required
        >
          <Option value={true}>Sí</Option>
          <Option value={false}>No</Option>
        </Select>
        {discount && (
          <div>
            <label className="ml-1">Descuento:</label>
            <Input
              id="porcentaje"
              type="number"
              placeholder="Ingrese un descuento"
              style={{ marginTop: "8px" }}
            />
          </div>
        )}
      </div>

      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      <div className="col-span-2 flex justify-center">
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
}
