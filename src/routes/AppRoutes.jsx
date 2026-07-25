import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";

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
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default AppRoutes;