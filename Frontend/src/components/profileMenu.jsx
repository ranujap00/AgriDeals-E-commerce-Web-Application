import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Logout, Person, ShoppingBasketRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const user = useSelector((state) => state.auth.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleViewOrders = () => {
    navigate("/orders");
  };

  return (
    <div>
      <IconButton
        id="profile-button"
        onClick={handleClick}
        aria-label="Open profile menu"
        color="primary"
      >
        <Avatar alt={user.displayName} src={user.photoURL} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Stack direction="row" spacing={2} sx={{ minWidth: 200 }}>
            <Person color="primary" />
            <Typography>Profile</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleViewOrders}>
          <Stack direction="row" spacing={2} sx={{ minWidth: 200 }}>
            <ShoppingBasketRounded color="primary" />
            <Typography>My Orders</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Stack direction="row" spacing={2} sx={{ minWidth: 200 }}>
            <Logout color="primary" />
            <Typography>Sign out</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
}
