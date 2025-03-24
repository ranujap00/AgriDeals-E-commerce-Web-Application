import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
  CardActions,
  Box,
  Rating,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShoppingBag } from "@mui/icons-material";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.item_id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <Card onClick={handleCardClick} sx={{ minWidth: 240, backgroundColor: "none", border: "none", boxShadow: "none", cursor: "pointer" }}>
      {product.images && product.images.length > 0 && (
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.name}
          sx={{
            borderRadius: 2,
            height: 240,
            width: 240,
          }}
        />
      )}

      <CardContent sx={{ pb: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Rating
            name={`rating-${product.item_id}`}
            value={product.rating || 0}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.ratingCount || 0})
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "#f57224",
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          sx={{
            borderRadius: "25px",
          }}
          endIcon={<ShoppingBag/>}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
