import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import axios from 'axios';
import Header from '../components/Header';

const ViewProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <><Header cartItems={cartItems} removeFromCart={removeFromCart} /><Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper elevation={3}>
              <Grid container spacing={4} sx={{ p: 4 }}>
                  <Grid item xs={12} md={6}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Typography variant="h4" gutterBottom>{product.name}</Typography>
                      <Typography variant="subtitle1" gutterBottom>Category: {product.category}</Typography>
                      <Typography variant="body1" paragraph>{product.description}</Typography>
                      <Typography variant="h5" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
                      <Typography variant="body2" gutterBottom>Item ID: {product.item_id}</Typography>
                      <Typography variant="body2" gutterBottom>Posted on: {new Date(product.post_date).toLocaleDateString()}</Typography>
                      <Typography variant="body2" gutterBottom>Available: {product.available_count}</Typography>
                      <Box mt={3}>
                          <Button variant="contained" color="primary" size="large" onClick={handleAddToCart}>
                              Add to Cart
                          </Button>
                      </Box>
                  </Grid>
              </Grid>
          </Paper>
      </Container></>
  );
};

export default ViewProductPage;