// Layout.jsx
import React from "react";
import { Box, CssBaseline } from "@mui/material";
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", flex: "1 1 auto" }}>
        <SideNavigation />
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;