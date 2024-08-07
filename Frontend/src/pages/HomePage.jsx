// HomePage.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
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
  const [loading, setLoading] = useState(true);

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/api/items`);
        setProducts(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="home-container">
      <div className="content">
        <Container maxWidth="xl" sx={{ mt: 4 }}>
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
                Featured Items
              </Typography>
              <Container
                maxWidth="xl" 
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "1rem 0",
                }}
              >
                <Grid container spacing={2}>
                  {" "}
                  {products.map((product) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={2}
                      lg={1.7}
                      key={`grid-${product.item_id}`}
                    >
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
