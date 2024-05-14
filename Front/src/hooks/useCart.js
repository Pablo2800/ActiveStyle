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

const useCart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const select = useSelector(getSelectProduct);
  const product = useSelector(getFilteredProducts);
  const cantTalles =
    product.length !== 0
      ? product.talles.filter((talle) => talle === select)
      : [];
  console.log(cantTalles);
  const tallesDisp = product.talles;
  const contador = useSelector(getCantidadSelect);
  const allTalles = useSelector(getAllTallesCalzado);
  const { cuotas, discountPrice } = useProducts();

  const handleAddToCart = () => {
    if (!product || !product.talles) {
      return;
    }

    const maxCantidad = 3;
    let cantidadToAdd = contador > maxCantidad ? maxCantidad : contador;

    // Verificar si ya hay productos de este tipo en el carrito
    const totalCantidadInCart = cart.reduce((total, item) => {
      if (item.id === product.id && item.talle === select) {
        return total + item.cantidad;
      }
      return total;
    }, 0);

    // Verificar si la cantidad a agregar excede el máximo permitido
    if (totalCantidadInCart + cantidadToAdd > maxCantidad) {
      cantidadToAdd = maxCantidad - totalCantidadInCart;
      console.log(
        `Solo puedes agregar ${cantidadToAdd} unidades de este producto al carrito`
      );
    }

    for (let i = 0; i < cantidadToAdd; i++) {
      dispatch(
        addToCart({
          ...product,
          talle: select,
          priceDiscount: discountPrice,
          cantidad: 1, // Agregar una unidad del producto por iteración
        })
      );
    }

    const indexToRemove = product.talles.indexOf(select);

    if (indexToRemove !== -1) {
      const updatedTalles = [...product.talles];
      updatedTalles.splice(indexToRemove, cantidadToAdd);

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
      dispatch(setCantidadSelect());
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
