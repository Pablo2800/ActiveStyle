import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goToHome = () => navigate("/");
  const goToRegister = () => navigate("/register");
  const goToProduct = () => navigate("/product/:id");
  const handleGoBack = () => {
    window.history.back();
  };

  return {
    goToProduct,
    goToLogin,
    goToHome,
    goToRegister,
    handleGoBack,
  };
};
export default useNavigation;
