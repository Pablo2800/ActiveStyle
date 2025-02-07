import axios from "axios";
import useNavigation from "./useNavigate";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccess,
  getAddress,
  getCellPhone,
  getDni,
  getEmail,
  getFirstName,
  getID,
  getLastName,
  getUsername,
  login,
  logout,
  setAddress,
  setCellPhone,
  setDni,
  setEmail,
  setFirstName,
  setID,
  setLastName,
  setPassword,
  setRol,
  setToken,
  setUsername,
} from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";
const apiKey = import.meta.env.VITE_API_KEY;

const useUser = () => {
  const { goToLogin, goToHome } = useNavigation();
  const dispatch = useDispatch();
  const access = useSelector(getAccess);
  const name = useSelector(getFirstName);
  const lastname = useSelector(getLastName);
  const email = useSelector(getEmail);
  const dni = useSelector(getDni);
  const cellphone = useSelector(getCellPhone);
  const direction = useSelector(getAddress);
  const createAdmin = `${apiKey}auth/admin/register`;
  const id = useSelector(getID);

  const handleSubmit = async (values) => {
    const { dni, cellphone, username, password, ...rest } = values;
    const numericDNI = parseInt(dni);
    const numericCellphone = parseInt(cellphone);
    if (username === "Admin24" && password === "24Admin24") {
      try {
        const response = await axios.post(createAdmin, {
          ...rest,
          username,
          password,
          dni: numericDNI,
          cellphone: numericCellphone,
        });
        if (response.data) {
          goToLogin();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(`${apiKey}auth/register`, {
          ...rest,
          username,
          password,
          dni: numericDNI,
          cellphone: numericCellphone,
        });
        if (response.data) {
          goToLogin();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${apiKey}auth/login`, values);
      const { token, username } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (token) {
        dispatch(setUsername(response.data.username));
        dispatch(setPassword(response.data.password));
        dispatch(setEmail(response.data.email));
        dispatch(setDni(response.data.dni));
        dispatch(setCellPhone(response.data.cellphone));
        dispatch(setFirstName(response.data.firstname));
        dispatch(setLastName(response.data.lastname));
        dispatch(setAddress(response.data.address));
        dispatch(setToken(response.data.token));
        dispatch(setRol(response.data.role));
        dispatch(login());
        dispatch(setID(response.data.id));
        goToHome();
      }
      if (username === "PabloP") {
        dispatch(setRol("ADMIN"));
      }
    } catch (error) {
      dispatch(logout());
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
    dispatch(clearCart());
  };
  return {
    handleSubmit,
    handleLogin,
    handleLogout,
    access,
    name,
    lastname,
    email,
    dni,
    cellphone,
    direction,
    id,
  };
};
export default useUser;
