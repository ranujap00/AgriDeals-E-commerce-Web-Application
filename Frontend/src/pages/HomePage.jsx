import React, { useEffect, useState } from "react";
import { Typography, Button, Container, Grid } from "@mui/material";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import axios from "axios";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Motors",
  "Collectibles",
];

const BASE_URI = process.env.REACT_APP_BASE_URL;

const HomePage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URI}/api/items`
        );
        setProducts(response.data);
        console.log("items: ", response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

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
                <Grid item xs={12} sm={6} md={3} key={`grid-${product.item_id}`}>
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
