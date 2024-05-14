import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  token: null,
  access: false,
  cellphone: "",
  address: "",
  dni: "",
  rol: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    setLastName: (state, action) => {
      state.lastname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCellPhone: (state, action) => {
      state.cellphone = action.payload;
    },
    setDni: (state, action) => {
      state.dni = action.payload;
    },
    setRol: (state, action) => {
      state.rol = action.payload;
    },
    logout: (state) => {
      state.access = false;
    },
    login: (state) => {
      state.access = true;
    },
  },
});

export const getAccess = (state) => state.user.access;
export const getUsername = (state) => state.user.username;
export const getPassword = (state) => state.user.password;
export const getFirstName = (state) => state.user.firstname;
export const getLastName = (state) => state.user.lastname;
export const getEmail = (state) => state.user.email;
export const getAddress = (state) => state.user.address;
export const getCellPhone = (state) => state.user.cellphone;
export const getDni = (state) => state.user.dni;
export const getToken = (state) => state.user.token;
export const getRol = (state) => state.user.rol;
export const {
  setUsername,
  setPassword,
  setToken,
  setLastName,
  setFirstName,
  setAddress,
  setCellPhone,
  setDni,
  setEmail,
  setRol,
  logout,
  login,
} = userSlice.actions;

export default userSlice.reducer;
