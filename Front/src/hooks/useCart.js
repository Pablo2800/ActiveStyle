import { useDispatch, useSelector } from "react-redux";
import {
  getAllTalles,
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

const useCart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const select = useSelector(getSelectProduct);
  const product = useSelector(getFilteredProducts);
  const cantTalles =
    product !== null ? product.talles.filter((talle) => talle === select) : "";
  const tallesDisp = product.talles;
  const contador = useSelector(getCantidadSelect);
  const allTalles = useSelector(getAllTalles);
  const { cuotas, discountPrice } = useProducts();
  const handleAddToCart = () => {
    if (!product || !product.talles) {
      return;
    }
    const cantidad = contador;
    const productosToAdd = cantidad > 1 ? cantidad : 1;

    for (let i = 0; i < productosToAdd; i++) {
      dispatch(
        addToCart({ ...product, talle: select, priceDiscount: discountPrice })
      );
    }
    const indexToRemove = product.talles.indexOf(select);

    if (indexToRemove !== -1) {
      const updatedTalles = [...product.talles];
      updatedTalles.splice(indexToRemove, productosToAdd);

      dispatch(updateProductTalles({ id: product.id, talles: updatedTalles }));
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
      dispatch(setCantidadSelect(0));
      const newSelect = select === value ? 0 : value;
      dispatch(setSelectProduct(newSelect));
    },
    [dispatch, select, contador, cantTalles]
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
    cantTalles,
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
