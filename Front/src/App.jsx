import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import { useSelector } from "react-redux";
import { getAccess } from "./redux/userSlice";

function App() {
  const access = useSelector(getAccess);

  return (
    <Routes>
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;