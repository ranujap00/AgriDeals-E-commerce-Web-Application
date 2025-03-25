import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  TextField,
  Grid,
  Stack,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { placeOrder } from "../api";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { InfoDialog } from "../components/infoDialog";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setOrder({
      user_details: {
        user_id: user.uid,
        name: shippingDetails.name,
        email: user.email,
        contact_number: shippingDetails.phone,
      },
      items: cartItems,
      shipping_address: `${shippingDetails.name}, ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.postalCode}`,
      total_price: totalPrice,
    });
  }, [user, cartItems, totalPrice, shippingDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (!cartItems) {
      return;
    }
    try {
      await placeOrder(order).then(() => {
        dispatch(clearCart());
        setDialogOpen(true);
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
          }}
        >
          <form onSubmit={handlePlaceOrder}>
            <Typography variant="h4" gutterBottom>
              Checkout
            </Typography>
            <Stack direction="row" spacing={4}>
              <Box width="100%">
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={shippingDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Postal Code"
                      name="postalCode"
                      value={shippingDetails.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box width="100%">
                {/* Cart Items Section */}
                {cartItems.length === 0 ? (
                  <Typography>Your cart is empty</Typography>
                ) : (
                  <>
                    <Box mb={4}>
                      <Typography variant="h6" gutterBottom>
                        Summary
                      </Typography>
                      {cartItems.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            p: 2,
                            border: 1,
                            borderColor: "grey.300",
                            borderRadius: 1,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "white",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              style={{ width: 50, marginRight: 10 }}
                            />
                            <Typography variant="subtitle1">
                              {item.name} (x{item.quantity})
                            </Typography>
                          </Box>
                          <Typography variant="subtitle1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Shipping Details Section */}
                    <Box mb={4}>
                      <Typography variant="h6" gutterBottom>
                        Shipping Details
                      </Typography>
                      <Box>
                        <Typography variant="body2" gutterBottom>
                          Free shipping on orders over $50.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Estimated delivery: 5-7 business days.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          For expedited shipping, please contact us.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Shipping costs are calculated at checkout.
                        </Typography>
                      </Box>
                    </Box>

                    {/* Total Price Section */}
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Total Price</Typography>
                      <Typography variant="h6">
                        ${totalPrice.toFixed(2)}
                      </Typography>
                    </Box>

                    {/* Place Order Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      sx={{ mt: 3 }}
                      disabled={isSubmitting}
                    >
                      Place Order
                    </Button>
                    {error && (
                      <Typography color="error" mt={1} textAlign="center">
                        {error}
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            </Stack>
          </form>
          <InfoDialog
            message="Your order placed successfully!"
            title="Order"
            onClose={() => {
              setDialogOpen(false);
              navigate("/");
            }}
            open={dialogOpen}
          />
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default CheckoutPage;
