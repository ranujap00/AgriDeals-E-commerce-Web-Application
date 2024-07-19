import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Box, Button, Divider } from '@mui/material';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log("Cart items in CheckoutPage:", cartItems);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            <Box>
              {cartItems.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <img src={item.image} alt={item.name} style={{ width: 50, marginRight: 10 }} />
                    <Typography variant="subtitle1">{item.name} (x{item.quantity})</Typography>
                  </Box>
                  <Typography variant="subtitle1">${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Total Price</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Place Order
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;