import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/customer/Register";
import Home from "../pages/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Login from "../pages/Login";
import OtpVerification from "../pages/customer/OtpVerification";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "../pages/customer/Orders";
import Wishlist from "../pages/customer/Wishlist";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route
         path="/products/:id"
            element={<ProductDetails />}
        />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>
      
    </BrowserRouter>
    
  );
}

export default AppRoutes;