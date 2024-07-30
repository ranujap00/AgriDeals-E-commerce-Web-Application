import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${product.item_id}`);
  };

  return (
    <Card>
      {product.images && product.images.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={product.images[0]}
          alt={product.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button size="small" variant="contained" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <Button size="small" variant="outlined" onClick={handleViewProduct}>
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
