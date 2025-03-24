import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Badge, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  CloseRounded,
  Remove,
  ShoppingBag,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <IconButton onClick={toggleCart(true)} aria-label="Open cart">
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingBag />
        </Badge>
      </IconButton>
      <Drawer open={open} onClose={toggleCart(false)} anchor="right">
        <Box
          sx={{ width: 320 }}
          role="presentation"
          onClick={toggleCart(false)}
        >
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            p={2}
          >
            <Stack spacing={1} direction="row">
              <ShoppingBagOutlined color="primary" />
              <Typography>{totalItems} items</Typography>
            </Stack>
            <IconButton onClick={toggleCart(false)}>
              <CloseRounded />
            </IconButton>
          </Stack>
          <Divider />
          {cartItems.map((item) => (
            <Box key={item.id} display="flex" alignItems="center" p={2}>
              <img
                src={item.images[0]}
                alt={item.name}
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "cover",
                  marginRight: 10,
                  borderRadius: 4,
                }}
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
          ))}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              bottom: 0,
            }}
          >
            <Divider />
            <Box p={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                sx={{
                  borderRadius: "25px",
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
