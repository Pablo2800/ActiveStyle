import { useNavigate } from "react-router-dom";
import { getAccess } from "../redux/userSlice";
import { useSelector } from "react-redux";

const useNavigation = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goToHome = () => navigate("/");
  const goToRegister = () => navigate("/register");
  const goToProduct = () => navigate("/product/:id");
  const goToProductsByCategory = () => navigate("/:category/products");
  const handleGoBack = () => {
    window.history.back();
  };
  const access = useSelector(getAccess);

  return {
    goToProduct,
    goToLogin,
    goToHome,
    goToRegister,
    handleGoBack,
    goToProductsByCategory,
    access,
  };
};
export default useNavigation;