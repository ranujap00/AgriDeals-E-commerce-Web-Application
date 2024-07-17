// Header.jsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { InputAdornment, TextField, Badge, Menu, MenuItem, Box, Paper } from '@mui/material';
import { Favorite, Search, ShoppingCart, Remove } from '@mui/icons-material';

function Header({ cartItems, removeFromCart }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <TextField
          placeholder="Search for anything"
          variant="outlined"
          size="small"
          sx={{ mr: 2, bgcolor: 'background.paper' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: '400px',
              width: '350px',
            },
          }}
        >
          {cartItems.length === 0 ? (
            <MenuItem>
              <Typography>No items in cart</Typography>
            </MenuItem>
          ) : (
            cartItems.map((item) => (
              <MenuItem key={item.id}>
                <Paper elevation={0} sx={{ p: 1, width: '100%' }}>
                  <Box display="flex" alignItems="center" width="100%">
                    <img src={item.image} alt={item.name} style={{ width: 50, marginRight: 10 }} />
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1">
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </Typography>
                      <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                    <IconButton onClick={() => removeFromCart(item.id)} size="small">
                      <Remove />
                    </IconButton>
                  </Box>
                </Paper>
              </MenuItem>
            ))
          )}
        </Menu>
        <IconButton color="inherit">
          <Favorite />
        </IconButton>
        <Button color="inherit">Sign Out</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;