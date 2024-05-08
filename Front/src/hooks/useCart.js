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
import { addToCart, clearCart, getCart } from "../redux/cartSlice";

const useCart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const select = useSelector(getSelectProduct);
  const product = useSelector(getFilteredProducts);
  const cantTalles = product.talles.filter((talle) => talle === select);
  const tallesDisp = product.talles;
  const contador = useSelector(getCantidadSelect);
  const allTalles = useSelector(getAllTalles);
  const cuotas = Math.ceil(((product.price / 3) * 1.05) / 5000) * 5000;
  const transformPorcentage = product.porcentaje / 100;
  const discountPrice = Math.round(
    product.price - product.price * transformPorcentage
  );

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
