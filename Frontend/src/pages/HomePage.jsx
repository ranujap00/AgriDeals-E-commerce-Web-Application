import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { getItems, search } from "../api";
import { useParams } from "react-router-dom";

const HomePage = ({ category }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { query } = useParams();

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    if (!category) {
      return;
    }
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let items;
        if (query) {
          items = await search(query);
        } else {
          items = await getItems(category);
        }
        setProducts(items);
      } catch (error) {
        setProducts(null);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [category, query]);

  return (
    <div className="home-container">
      <Box className="content">
        <Container sx={{ mt: 10 }}>
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
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {query ? `Search results - ${query}` : `${category} Products`}
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
                {products ? (
                  <Grid container spacing={2}>
                    {products.map((product) => (
                      <Grid item key={`grid-${product.item_id}`}>
                        <Box sx={{ height: "100%" }}>
                          <ProductCard
                            product={product}
                            addToCart={addToCart}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography textAlign="center">
                    No item found in {category}
                  </Typography>
                )}
              </Container>
            </>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
