// HomePage.jsx
import React, { useEffect, useState } from "react";
import { Typography, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import axios from "axios";

const HomePage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/items/`
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="home-container">
      <div className="content">
        <Container maxWidth="lg" sx={{ mt: 4 }}>
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
                <Grid item xs={12} sm={6} md={4} key={`grid-${product.item_id}`}>
                  <ProductCard product={product} addToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;