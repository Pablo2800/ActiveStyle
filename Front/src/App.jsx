import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import DetailProduct from "./views/DetailProduct";
import ProductsByCategory from "./views/ProductsByCategory";
import AboutUs from "./views/AboutUs";
import Perfil from "./views/Perfil";

function App() {
  return (
    <Routes>
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/:category/products" element={<ProductsByCategory />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/miPerfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;
