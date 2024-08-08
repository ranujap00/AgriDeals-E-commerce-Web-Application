import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Box, CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const BASE_URI = process.env.REACT_APP_BASE_URL;

const ViewProductsPage = () => {
  const { item_id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/api/items/${item_id}`);
        setProduct(response.data);

        const relatedResponse = await axios.get(`${BASE_URI}/api/items/`);
        setRelatedProducts(relatedResponse.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [item_id]);

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity };
    dispatch(addItem(productToAdd));
    setQuantity(1); // Reset quantity to 1 after adding to cart
  };

  const handleBuyNow = () => {
    const productToAdd = { ...product, quantity };
    dispatch(addItem(productToAdd));
    // You can add additional functionality here to proceed to checkout immediately
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (!product || !relatedProducts) {
    return <Typography>Something went wrong!</Typography>;
  }

  return (
    <>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Left Side: Main Product Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mt: 10, p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 400,
                      overflow: "hidden",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    {product.images.slice(1).map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 80,
                          height: 80,
                          overflow: "hidden",
                          borderRadius: 1,
                          mr: 1,
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={image}
                          alt={`Product image ${index + 2}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1, color: "text.secondary" }}>
                    Item ID: {product.item_id}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 2, color: "text.secondary" }}>
                    Category: {product.category}
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mb: 2, fontWeight: "bold" }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                    Available: {product.available_count}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleQuantityDecrease}
                      disabled={quantity === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{quantity}</Typography>
                    <IconButton color="primary" size="small" onClick={handleQuantityIncrease}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box display="flex" gap={2} sx={{ mb: 4 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleAddToCart}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1rem",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleBuyNow}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1rem",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </Box>
                  <Typography variant="body1">{product.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right Side: Product Details */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mt: 10, p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Shipping Address: {product.shippingAddress || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Shipping Fee: ${"N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Warranty: {product.warranty || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Seller Rating: {product.sellerRating ? `${product.sellerRating}%` : "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Grid container spacing={2}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={4} key={`grid-${relatedProduct.id}`}>
                <ProductCard product={relatedProduct} addToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ViewProductsPage;
