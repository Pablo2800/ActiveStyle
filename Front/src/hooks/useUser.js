import axios from "axios";

const useUser = () => {
  const handleSubmit = async (values) => {
    const { dni, cellphone, ...rest } = values;
    const numericDNI = parseInt(dni);
    const numericCellphone = parseInt(cellphone);
    console.log({ ...rest, dni: numericDNI, cellphone: numericCellphone });
    try {
      const response = await axios.post(
        "https://activestyle.onrender.com/auth/register",
        { ...rest, dni: numericDNI, cellphone: numericCellphone }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleSubmit,
  };
};
export default useUser;
