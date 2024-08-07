import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Tooltip, CardActions, Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
    <Card
      onClick={handleCardClick}
      sx={{
        maxWidth: '100%',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
    >
      {product.images && product.images.length > 0 && (
        <CardMedia
          component="img"
          height="120"
          image={product.images[0]}
          alt={product.name}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      )}
      <CardContent sx={{ p: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 0.5, 
            height: '32px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#f57224', 
            mb: 0.5 
          }}
        >
          ${product.price.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', py: 0.5 }}>
        <Tooltip title="Add to Cart">
          <IconButton 
            size="small" 
            color="primary" 
            onClick={handleAddToCart} 
            sx={{ mx: 0.5 }}
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;