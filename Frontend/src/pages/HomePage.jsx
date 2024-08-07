import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, CircularProgress, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import axios from "axios";

const BASE_URI = process.env.REACT_APP_BASE_URL;

const HomePage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/api/items`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="home-container">
      <div className="content">
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80vh"
            >
              <CircularProgress size={60} />
            </Box>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Popular Products
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
                    <Grid item xs={12} sm={6} md={4} key={`grid-${product.item_id}`}>
                      <ProductCard product={product} addToCart={addToCart} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
