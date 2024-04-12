import axios from "axios";
import useNavigation from "./useNavigate";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  setAddress,
  setCellPhone,
  setDni,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setToken,
  setUsername,
} from "../redux/userSlice";

const useUser = () => {
  const { goToLogin, goToHome } = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { dni, cellphone, ...rest } = values;
    const numericDNI = parseInt(dni);
    const numericCellphone = parseInt(cellphone);
    try {
      const response = await axios.post(
        "https://activestyle.onrender.com/auth/register",
        { ...rest, dni: numericDNI, cellphone: numericCellphone }
      );
      console.log(response);
      if (response.data) {
        console.log(response);
        goToLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://activestyle.onrender.com/auth/login",
        values
      );
      if (response) {
        console.log(response.data);
        dispatch(setUsername(response.data.username));
        dispatch(setPassword(response.data.password));
        dispatch(setEmail(response.data.email));
        dispatch(setDni(response.data.dni));
        dispatch(setCellPhone(response.data.cellphone));
        dispatch(setFirstName(response.data.firstname));
        dispatch(setLastName(response.data.lastname));
        dispatch(setAddress(response.data.address));
        dispatch(setToken(response.data.token));
        dispatch(login());
        goToHome();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    dispatch(setUsername(""));
    dispatch(setPassword(""));
    dispatch(setEmail(""));
    dispatch(setDni(""));
    dispatch(setCellPhone(""));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    dispatch(setAddress(""));
    dispatch(setToken(null));
    dispatch(logout());
  };
  return {
    handleSubmit,
    handleLogin,
    handleLogout,
  };
};
export default useUser;
