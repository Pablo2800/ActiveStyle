import { useDispatch } from "react-redux";
import {
  setAllProducts,
  setNewProducts,
  setFilteredProducts,
} from "../redux/productSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const products = [
    {
      id: 1,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/793832-1000-1000?v=638379223305770000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: false,
      porcentaje: 0,
      tallesDisp: [33, 37, 38, 39, 39, 42, 43],
    },
    {
      id: 2,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/880628-1000-1000?v=638467320930270000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: true,
      porcentaje: 40,
    },
    {
      id: 3,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/794168-1000-1000?v=638379227989030000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: true,
      porcentaje: 20,
    },
    {
      id: 4,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: false,
      porcentaje: null,
    },
    {
      id: 5,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/880628-1000-1000?v=638467320930270000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: true,
      porcentaje: 25,
    },
    {
      id: 6,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: false,
      porcentaje: null,
    },
    {
      id: 7,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/794168-1000-1000?v=638379227989030000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: true,
      porcentaje: 5,
    },
    {
      id: 8,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: false,
      porcentaje: null,
    },
    {
      id: 9,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/880628-1000-1000?v=638467320930270000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: true,
      porcentaje: 10,
    },
    {
      id: 10,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/794168-1000-1000?v=638379227989030000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: false,
      porcentaje: null,
    },
    {
      id: 11,
      url: "https://nikearprod.vtexassets.com/arquivos/ids/762481-1000-1000?v=638316091353670000&width=1000&height=1000&aspect=true",
      description: "Nike Air Force 1 07 LV8",
      category: "Zapatillas para Hombre",
      price: 239999,
      discount: true,
      porcentaje: 25,
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newProducts = () => {
    dispatch(setNewProducts(products));
  };
  const allProducts = async () => {
    try {
      const response = await axios.get(
        "https://activestyle.onrender.com/activeStyle/cliente/getProductos"
      );
      if (response) {
        dispatch(setAllProducts(response.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const filterProduct = async (value) => {
    try {
      const response = await axios.get(
        "https://activestyle.onrender.com/activeStyle/cliente/producto/" + value
      );
      if (response) {
        dispatch(setFilteredProducts(response.data));
        navigate(`product/${response.data.id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    allProducts,
    filterProduct,
    newProducts,
  };
};

export default useProducts;
