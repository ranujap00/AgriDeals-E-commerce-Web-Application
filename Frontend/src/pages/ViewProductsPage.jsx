import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Rating,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShoppingBag } from "@mui/icons-material";
import TabPanel from "../components/tabPanel";

const BASE_URI = process.env.REACT_APP_BASE_URL;

const ViewProductsPage = () => {
  const { item_id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useSelector((state) => state.auth);

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
      <Container
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
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
      <Container
        maxWidth={false}
        sx={{
          mt: 14,
          maxWidth: {
            xs: "100%",
            xl: "80vw",
          },
        }}
      >
        <Stack spacing={4} direction="row">
          <Box width="100%" xs={8}>
            <Box
              sx={{
                position: "sticky",
                top: "120px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 1,
                  aspectRatio: 1 / 1,
                  backgroundColor: "secondary.main",
                }}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Stack
                direction="row"
                sx={{ width: "100%" }}
                justifyContent="center"
                spacing={2}
              >
                {product.images.map((image, idx) => (
                  <Box
                    key={idx}
                    width={64}
                    height={64}
                    borderRadius={2}
                    overflow="hidden"
                    sx={{
                      backgroundColor: "secondary.main",
                      opacity: activeImage !== idx ? 0.5 : 1,
                      cursor: "pointer",
                    }}
                    boxShadow={2}
                    onClick={() => setActiveImage(idx)}
                  >
                    <img
                      src={image}
                      alt={`${product.name}_image_${idx}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          <Box xs={8} width="100%">
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, color: "text.secondary" }}
            >
              Category: {product.category}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography color="text.secondary" sx={{ mr: 0.5 }}>
                Rated:
              </Typography>
              <Rating
                name={`rating-${product.item_id}`}
                value={product.rating || 0}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                ({product.ratingCount || 0})
              </Typography>
            </Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              Available Stock: {product.available_count}
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
              <IconButton
                color="primary"
                size="small"
                onClick={handleQuantityIncrease}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              startIcon={<ShoppingBag />}
              sx={{
                px: 4,
                py: 1,
                mb: 2,
                borderRadius: "25px",
              }}
              disabled={user === null}
            >
              <Typography noWrap>Add to Cart</Typography>
            </Button>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, value) => setActiveTab(value)}
                  aria-label="Product specifications"
                >
                  <Tab label="Description" />
                  <Tab label="Shipping Details" />
                  <Tab label="Reviews" />
                </Tabs>
              </Box>

              <TabPanel value={activeTab} index={0}>
                <Typography variant="body1">{product.description}</Typography>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Shipping Address: {product.shippingAddress || "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Shipping Fee: ${"N/A"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Warranty: {product.warranty || "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Seller Rating:{" "}
                  {product.sellerRating ? `${product.sellerRating}%` : "N/A"}
                </Typography>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Typography variant="body1">Reviews</Typography>
              </TabPanel>
            </Box>
          </Box>
        </Stack>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Grid container spacing={2} mt={2}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item key={`grid-${relatedProduct.item_id}`}>
                <Box sx={{ height: "100%" }}>
                  <ProductCard
                    product={relatedProduct}
                    addToCart={handleAddToCart}
                  />
                </Box>
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
