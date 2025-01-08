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
import { useCallback } from "react";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../redux/cartSlice";
import useProducts from "./useProducts";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const useCart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const select = useSelector(getSelectProduct);
  const product = useSelector(getFilteredProducts);
  // const cantTalles =
  //   product.length !== 0
  //     ? product.talles.filter((talle) => talle === select)
  //     : [];
  const tallesDisp = product.talles;
  const contador = useSelector(getCantidadSelect);
  const allTalles = useSelector(getAllTallesCalzado);
  const { cuotas, discountPrice } = useProducts();

  const handleAddToCart = async (clienteId, productId, talleSeleccionado) => {
    console.log(talleSeleccionado);
    try {
      const response = await axios.post(
        `${apiKey}carrito/add/${clienteId}/${productId}/${talleSeleccionado}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveToCart = (id, talle) => {
    dispatch(removeFromCart({ id, talle }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(resetProductTalles({ id: product.id }));
  };

  const handleSelect = useCallback(
    (value) => {
      dispatch(setCantidadSelect(1));
      const newSelect = select === value ? 1 : value;
      dispatch(setSelectProduct(newSelect));
    },
    [dispatch, select, contador]
  );

  const aumentarContador = () => {
    dispatch(setCantidadSelect(contador + 1));
  };

  const disminuirContador = () => {
    dispatch(setCantidadSelect(contador - 1));
  };

  return {
    handleAddToCart,
    handleClearCart,
    handleSelect,
    aumentarContador,
    disminuirContador,
    handleRemoveToCart,
    // cantTalles,
    select,
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
