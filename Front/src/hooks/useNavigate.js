import { useNavigate } from "react-router-dom";
import { getAccess } from "../redux/userSlice";
import { useSelector } from "react-redux";

const useNavigation = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goToHome = () => navigate("/");
  const goToRegister = () => navigate("/register");
  const goToProduct = () => navigate("/product/:id");
  const goToProductsByCategory = (value) => navigate(`/${value}/products`);
  const handleGoBack = () => {
    window.history.back();
  };
  const goToAboutUs = () => navigate("/aboutUs");
  const goToPerfil = () => navigate("/miPerfil");
  const access = useSelector(getAccess);

  return {
    goToProduct,
    goToLogin,
    goToHome,
    goToRegister,
    handleGoBack,
    goToProductsByCategory,
    goToAboutUs,
    goToPerfil,
    access,
  };
};
export default useNavigation;
