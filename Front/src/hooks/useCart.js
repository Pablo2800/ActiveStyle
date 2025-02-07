import { useDispatch, useSelector } from "react-redux";
import {
  getAllTallesCalzado,
  getCantidadSelect,
  getFilteredProducts,
  getSelectProduct,
  resetProductTalles,
  setCantidadSelect,
  setSelectProduct,
  updateProductTalles,
} from "../redux/productSlice";
import { useCallback, useState } from "react";
import {
  addToCart,
  clearCart,
  getCart,
  getCartID,
  removeFromCart,
  setCartID,
  updateCart,
} from "../redux/cartSlice";
import useProducts from "./useProducts";
import axios from "axios";
import { getID } from "../redux/userSlice";

const apiKey = import.meta.env.VITE_API_KEY;

const useCart = () => {
  const token = localStorage.getItem("token");
  const cart = useSelector(getCart);
  const cartID = useSelector(getCartID);
  const clientID = useSelector(getID);
  const dispatch = useDispatch();
  const select = useSelector(getSelectProduct);
  const product = useSelector(getFilteredProducts);
  const tallesDisp = product.talles;
  const contador = useSelector(getCantidadSelect);
  const allTalles = useSelector(getAllTallesCalzado);
  const { cuotas, discountPrice } = useProducts();

  const handleGetCart = async () => {
    try {
      const response = await axios.get(`${apiKey}carrito/${clientID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateCart(response.data.itemCarritos));
      dispatch(setCartID(response.data.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOneProduct = async (
    clientID,
    productId,
    talleSeleccionado,
    cart
  ) => {
    try {
      const response = await axios.post(
        `${apiKey}carrito/add/${clientID}/${productId}/${talleSeleccionado}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Buscar si el producto ya existe en el carrito
      const existingProductIndex = cart.findIndex(
        (item) =>
          item.producto.id === productId && item.talle === talleSeleccionado
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, crear una copia del carrito y del producto
        updatedCart = [...cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex], // Copiar el producto existente
          cantidad: updatedCart[existingProductIndex].cantidad + 1, // Actualizar la cantidad
        };
      } else {
        // Si el producto no existe, agregarlo al carrito con cantidad 1
        updatedCart = [...cart, { ...response.data, cantidad: 1 }];
      }

      // Actualizar el carrito completo con `updateCart`
      dispatch(updateCart(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (
    clienteId,
    productId,
    talleSeleccionado,
    count
  ) => {
    try {
      const response = await axios.post(
        `${apiKey}carrito/addQuantity/${clienteId}/${productId}/${talleSeleccionado}/${count}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addToCart(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveToCart = async (clienteId, productId) => {
    try {
      const response = await axios.put(
        `${apiKey}carrito/cliente/${clienteId}/item/${productId}/subtractQuantity`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateCart(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveOneProductToCart = async (carritoId, productId) => {
    try {
      console.log("Eliminando producto de la base de datos...");
      await axios.delete(`${apiKey}carrito/${carritoId}/items/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Producto eliminado de la base de datos.");

      console.log("Eliminando producto del carrito en Redux...");
      dispatch(removeFromCart({ id: productId }));
      console.log("Producto eliminado del carrito en Redux.");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto. Inténtalo de nuevo.");
    }
  };

  const handleClearCart = async (cartID) => {
    try {
      const response = await axios.delete(
        `${apiKey}carrito/${cartID}/removeAllItems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(clearCart());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = useCallback(
    (value) => {
      dispatch(setCantidadSelect(1));
      const newSelect = select === value ? 1 : value;
      dispatch(setSelectProduct(newSelect));
    },
    [dispatch, select, contador]
  );

  return {
    handleAddToCart,
    handleClearCart,
    handleSelect,
    handleRemoveToCart,
    handleGetCart,
    handleOneProduct,
    handleRemoveOneProductToCart,
    getCart,
    select,
    cartID,
    allTalles,
    contador,
    tallesDisp,
    product,
    cart,
    cuotas,
    discountPrice,
  };
};

export default useCart;
