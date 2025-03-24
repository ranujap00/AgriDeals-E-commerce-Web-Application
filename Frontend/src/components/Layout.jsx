// Layout.jsx
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import SideNavigation from "./SideNavigation";
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
      <Box maxWidth="lg" sx={{ display: "flex", flex: "1 1 auto", width: "100%", mx: "auto" }}>
        <SideNavigation />
        <Box sx={{ p: 2, overflowY: "auto", flexGrow: "1" }}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
