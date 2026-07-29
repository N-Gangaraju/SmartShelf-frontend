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
import Profile from "../pages/customer/Profile";
import EditProfile from "../pages/customer/EditProfile";
import SearchResults from "../pages/customer/SearchResults";
import ForgotPassword from "../pages/customer/ForgotPassword";
import ResetPassword from "../pages/customer/ResetPassword";
import Categories from "../pages/customer/Categories";
import CustomNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


function AppRoutes() {
  return (
    <BrowserRouter> 
      <Routes>
       

        <Route path="/" element={<Home />} />
        <Route  path="/products/:id"   element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/products" element={<Products />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route  path="/reset-password" element={<ResetPassword />}/>
        <Route path="/categories" element={<Categories />} />
        

      </Routes>
      <Footer/>
      
    </BrowserRouter>
    
  );
}

export default AppRoutes;