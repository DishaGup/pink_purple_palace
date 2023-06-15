import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import SingleStockPage from "../Components/SingleStockPage";

// Component that defines all the routes in the application
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the registration page */}
        <Route path="/register" element={<Register />} />

        {/* Route for the single stock page */}
        <Route path="/single/stock/:id" element={<SingleStockPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
