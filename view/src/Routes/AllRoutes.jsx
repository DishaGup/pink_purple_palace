import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import SingleStockPage from "../Components/SingleStockPage";


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/single/stock/:id" element={<SingleStockPage />  } />
      </Routes>
    </div>
  );
};

export default AllRoutes;
