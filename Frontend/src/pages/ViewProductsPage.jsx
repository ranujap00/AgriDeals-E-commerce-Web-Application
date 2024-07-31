import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const BASE_URI = process.env.REACT_APP_BASE_URL;

const ViewProductPage = () => {
  const { item_id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [relatedProducts, setRelatedProducts] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URI}/api/items/${item_id}`
        );
        setProduct(response.data);
        console.log("products:"+ product)

        const relatedResponse = await axios.get(
          `${BASE_URI}/api/items/`
        );
        setRelatedProducts(relatedResponse.data);
        console.log("Related products: " + relatedProducts)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [item_id]);

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  if (!product || !relatedProducts) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ marginTop: 10 }}>
          <Grid container spacing={4} sx={{ p: 4 }}>
            <Grid item xs={12} md={6}>
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} image ${index + 1}`}
                    style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                  />
                ))
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Category: {product.category}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Item ID: {product.item_id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Posted on: {new Date(product.post_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Available: {product.available_count}
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
            {relatedProducts.map((relatedProduct) => (
              <Box key={`grid-${relatedProduct.id}`} sx={{ minWidth: 250, mr: 2 }}>
                <ProductCard
                  product={relatedProduct}
                  addToCart={handleAddToCart}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ViewProductPage;
