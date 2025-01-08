import { useDispatch, useSelector } from "react-redux";
import {
  setAllProducts,
  setNewProducts,
  setFilteredProducts,
  setProductsByCategory,
  getAllProducts,
  getProductsByCategory,
  setFilteredProductsByCategory,
  getFilteredProductsByCategory,
  getFilteredProducts,
  getFilteredProductsByDiscount,
} from "../redux/productSlice";
import axios from "axios";
import { useMemo } from "react";
import useNavigation from "./useNavigate";
import { toast } from "sonner";

const useProducts = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const { goToProductsByCategory } = useNavigation();
  const dispatch = useDispatch();
  const notifyWarning = (value) => {
    toast.warning(value);
  };
  const notifyError = (value) => {
    toast.error(value);
  };
  const productsByCategory = useSelector(getProductsByCategory);
  const filteredProducts = useSelector(getFilteredProductsByCategory);
  const product = useSelector(getFilteredProducts);
  const allProducts = useSelector(getAllProducts);
  const discountProducts = useSelector(getFilteredProductsByDiscount);
  const filtered = allProducts.slice(-10);
  const cuotas = Math.ceil(((product.price / 3) * 1.05) / 5000) * 5000;
  const transformPorcentage = product.porcentaje / 100;
  const discountPrice = Math.round(
    product.price - product.price * transformPorcentage
  );
  const newProducts = () => {
    dispatch(setNewProducts(filtered));
  };
  const uniqueIndumentarias = useMemo(
    () =>
      Array.from(
        new Set(
          productsByCategory.map(
            (product) => product.indumentaria || product.indumentaria !== ""
          )
        )
      ),
    [productsByCategory]
  );
  const allIndumentarias = useMemo(
    () =>
      Array.from(new Set(allProducts?.map((product) => product.indumentaria))),
    [allProducts]
  );
  const uniqueGeneros = useMemo(
    () =>
      Array.from(new Set(productsByCategory.map((product) => product.genero))),
    [productsByCategory]
  );
  const uniqueMarcas = useMemo(
    () =>
      Array.from(
        new Set(
          productsByCategory.map((product) => product.marca.toUpperCase())
        )
      ),
    [productsByCategory]
  );
  const allMarcas = useMemo(
    () =>
      Array.from(
        new Set(allProducts.map((product) => product.marca.toUpperCase()))
      ),
    [allProducts]
  );
  const uniqueActividad = useMemo(
    () =>
      Array.from(
        new Set(productsByCategory.map((product) => product.actividad))
      ),
    [productsByCategory]
  );
  const handleAllProducts = async () => {
    try {
      const response = await axios.get(`${apiKey}cliente/getProductos`);
      if (response) {
        dispatch(setAllProducts(response.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const filterProduct = async (value) => {
    try {
      const response = await axios.get(`${apiKey}cliente/producto/` + value);
      if (response) {
        console.log({ ApiResponse: response.data });
        dispatch(setFilteredProducts(response.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleProductsByGenre = async (value) => {
    try {
      const response = await axios.get(
        `${apiKey}/cliente/buscarPorGenero?genero=` + value
      );
      if (response) {
        dispatch(setProductsByCategory(response.data));
        dispatch(setFilteredProductsByCategory(response.data));
        goToProductsByCategory(value);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleProductsByActivity = async (value) => {
    try {
      const response = await axios.get(
        `${apiKey}/cliente/buscarPorActividad?actividad=` + value
      );
      if (response) {
        dispatch(setProductsByCategory(response.data));
        dispatch(setFilteredProductsByCategory(response.data));
        goToProductsByCategory(value);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleProductsByIndumentaria = async (value) => {
    try {
      const response = await axios.get(
        `${apiKey}/cliente/buscarPorIndumentaria?indumentaria=` + value
      );
      if (response) {
        dispatch(setProductsByCategory(response.data));
        dispatch(setFilteredProductsByCategory(response.data));
        goToProductsByCategory(value);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleProductsByMarca = async (value) => {
    try {
      const response = await axios.get(
        `${apiKey}/cliente/buscarPorMarca?marca=` + value
      );
      if (response) {
        dispatch(setProductsByCategory(response.data));
        dispatch(setFilteredProductsByCategory(response.data));
        goToProductsByCategory(value);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDiscountProducts = (value) => {
    const discProd = allProducts.filter((product) => product.discount === true);
    dispatch(setProductsByCategory(discProd));
    dispatch(setFilteredProductsByCategory(discProd));
    goToProductsByCategory(value);
  };
  const renderAllProducts = (value) => {
    dispatch(setProductsByCategory(allProducts));
    dispatch(setFilteredProductsByCategory(allProducts));
    goToProductsByCategory(value);
  };
  const onSearch = async (value) => {
    if (value === "") {
      notifyError("Ingrese un valor para realizar la busqueda");
    } else {
      try {
        const response = await axios.get(
          `${apiKey}/cliente/buscarProducto?nombre=` + value
        );
        if (response.data.length === 0) {
          notifyWarning("No se encontro un producto con la busqueda " + value);
          notifyWarning(
            "Recuerde que las marcas las puede encontrar en el menu"
          );
        } else {
          dispatch(setProductsByCategory(response.data));
          dispatch(setFilteredProductsByCategory(response.data));
          goToProductsByCategory(value);
        }
      } catch (error) {
        notifyError(error.message);
      }
    }
  };
  const createProduct = async (values) => {};
  return {
    handleAllProducts,
    filterProduct,
    newProducts,
    handleProductsByGenre,
    handleProductsByActivity,
    handleProductsByIndumentaria,
    handleProductsByMarca,
    handleDiscountProducts,
    renderAllProducts,
    onSearch,
    productsByCategory,
    filteredProducts,
    filtered,
    uniqueIndumentarias,
    uniqueGeneros,
    uniqueMarcas,
    uniqueActividad,
    allMarcas,
    allIndumentarias,
    cuotas,
    discountPrice,
    product,
    discountProducts,
    allProducts,
  };
};

export default useProducts;
