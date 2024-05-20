import React from "react";
import FormNewObject from "./FormNewObject";
import Navbar from "../Navbar";
export default function Dashbord() {
  return (
    <div className="w-full flex-col h-full flex items-center justify-center ">
      <Navbar />
      <FormNewObject />
    </div>
  );
}
