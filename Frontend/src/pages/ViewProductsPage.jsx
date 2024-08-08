import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Box, Paper, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import axios from "axios";
import Slider from "react-slick";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductImageCarousel from "../components/ProductImageCarousel";

const BASE_URI = process.env.REACT_APP_BASE_URL;

const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", left: -30, zIndex: 1, color: "grey" }}
    onClick={onClick}
  >
    <i className="fas fa-chevron-left"></i>
  </div>
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", right: -30, zIndex: 1, color: "grey" }}
    onClick={onClick}
  >
    <i className="fas fa-chevron-right"></i>
  </div>
);

const ViewProductsPage = () => {
  const { item_id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleBuyNow = (product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem(productId));
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const relatedSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ mt: 10, p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
            <ProductImageCarousel images={product.images} />
            </Grid>
            <Grid item xs={12} md={4} container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 1, color: "text.secondary", fontSize: "1.3rem" }}
                  >
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, fontSize: "1.3rem" }}>
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "bold", fontSize: "1.3rem" }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "text.secondary", fontSize: "1.3rem" }}
                  >
                    Item ID: {product.item_id}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "text.secondary", fontSize: "1.3rem" }}
                  >
                    Posted on: {new Date(product.post_date).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 3, color: "text.secondary", fontSize: "1.3rem" }}
                  >
                    Available: {product.available_count}
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleAddToCart(product)}
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
                      onClick={() => handleBuyNow(product)}
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
                </Paper>
              </Grid>
              {/* <Grid item>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Shipping Details
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Free shipping on orders over $50.
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Estimated delivery: 5-7 business days.
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    For expedited shipping, please contact us.
                  </Typography>
                  <Typography variant="body1">
                    Shipping costs are calculated at checkout.
                  </Typography>
                </Paper>
              </Grid> */}
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Slider {...relatedSettings} style={{ padding: "0" }}>
            {relatedProducts.map((relatedProduct) => (
              <Box
                key={`grid-${relatedProduct.id}`}
                sx={{
                  p: 1,
                  boxSizing: "border-box",
                }}
              >
                <ProductCard
                  product={relatedProduct}
                  addToCart={handleAddToCart}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ViewProductsPage;
