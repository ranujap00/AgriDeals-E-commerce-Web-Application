// Layout.jsx
import React, { createContext, useContext, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import SideNavigation from "./SideNavigation";
import { removeItem } from "../store/cartSlice";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  const handlePriceChange = (priceRange) => {
    // Implement price filtering logic here
    console.log("Price range:", priceRange);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box
        maxWidth={{
          xs: "100%",
          xl: "80vw",
        }}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          width: "100%",
          mx: "auto",
          p: 1,
        }}
      >
        <SideNavigation onCategorySelect={handleCategorySelect} />
        <Box sx={{ p: 2, overflowY: "auto", flexGrow: "1" }}>
          {React.cloneElement(children, {
            category: category,
          })}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
