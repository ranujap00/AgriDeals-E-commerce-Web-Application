import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  InputAdornment,
  TextField,
  Badge,
  Menu,
  MenuItem,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { Favorite, Search, ShoppingCart, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import { logout } from "../store/authSlice";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckout = () => {
    handleClose();
    navigate("/checkout");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleHomeNavigation = () => {
    navigate("/home");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
          onClick={handleHomeNavigation}
        >
          Agri Deals
        </Typography>
        <TextField
          placeholder="Search for anything"
          variant="outlined"
          size="small"
          sx={{
            mr: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#ffffffcc",
              },
            },
          }}
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
              maxHeight: "400px",
              width: "350px",
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
                <Paper elevation={0} sx={{ p: 1, width: "100%" }}>
                  <Box display="flex" alignItems="center" width="100%">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: 50, marginRight: 10, borderRadius: 4 }}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1">
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </Typography>
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => dispatch(removeItem(item.id))}
                      size="small"
                      sx={{
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <Remove />
                    </IconButton>
                  </Box>
                </Paper>
              </MenuItem>
            )).concat(
              <Divider key="divider" />,
              <MenuItem key="checkout">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </MenuItem>
            )
          )}
        </Menu>
        <IconButton color="inherit">
          <Favorite />
        </IconButton>
        <Button color="inherit" onClick={handleLogout}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
