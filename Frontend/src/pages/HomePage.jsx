// HomePage.jsx
import React, { useState } from "react";
import { Typography, Button, Container, Grid } from "@mui/material";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/HomePage.css"; 
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from '../store/cartSlice';

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Motors",
  "Collectibles",
];

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 299.99,
    image: "/src/assets/product1.jpg",
  },
  { id: 2, name: "Laptop", price: 799.99, image: "/src/assets/product2.jpg" },
  {
    id: 3,
    name: "Headphones",
    price: 99.99,
    image: "/src/assets/product3.jpg",
  },
  { id: 4, name: "Smart Watch", price: 149.99, image: "/src/assets/product4.jpg" },
];

const HomePage = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  return (
    <div className="home-container">
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <div className="content">
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {categories.map((category, index) => (
              <Grid item key={index}>
                <Button variant="outlined">{category}</Button>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h4" gutterBottom>
            Featured Items
          </Typography>
          <Container
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "2rem 0",
            }}
          >
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} addToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
