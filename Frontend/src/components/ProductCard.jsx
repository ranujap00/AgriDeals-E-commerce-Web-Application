import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Tooltip, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${product.item_id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      {product.images && product.images.length > 0 && (
        <CardMedia
          component="img"
          height="180"
          image={product.images[0]}
          alt={product.name}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      )}
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', py: 2 }}>
        <Tooltip title="Add to Cart">
          <IconButton color="primary" onClick={() => addToCart(product)} sx={{ mx: 1 }}>
            <ShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Product">
          <IconButton color="secondary" onClick={handleViewProduct} sx={{ mx: 1 }}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
