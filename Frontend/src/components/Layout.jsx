// Layout.jsx
import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import SideNavigation from './SideNavigation';
import { removeItem } from "../store/cartSlice";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleCategorySelect = (category) => {
    // Implement category filtering logic here
    console.log("Selected category:", category);
  };

  const handlePriceChange = (priceRange) => {
    // Implement price filtering logic here
    console.log("Price range:", priceRange);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <SideNavigation onCategorySelect={handleCategorySelect} onPriceChange={handlePriceChange} />
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;