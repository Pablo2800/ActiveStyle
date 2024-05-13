import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import { useSelector } from "react-redux";
import { getAccess } from "./redux/userSlice";
import DetailProduct from "./views/DetailProduct";
import ProductsByCategory from "./views/ProductsByCategory";
import AboutUs from "./views/AboutUs";

function App() {
  const access = useSelector(getAccess);
  console.log("hola");
  return (
    <Routes>
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/:category/products" element={<ProductsByCategory />} />
      <Route path="/aboutUs" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
