import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function OrdersTable(props) {
  const { data } = props;
  console.log(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((date) => (
              <React.Fragment key={date}>
                {/* Date Header */}
                <TableRow>
                  <TableCell
                    colSpan={7}
                    style={{
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {new Date(date).toDateString()}
                  </TableCell>
                </TableRow>

                {data[date].map((item) => (
                  <TableRow key={item.order_id}>
                    <TableCell>{item.order_id}</TableCell>

                    <TableCell>
                      {item.items &&
                        item.items.map((orderItem, idx) => (
                          <Box key={idx} sx={{ p: .5 }}>
                            <Typography variant="body2">
                              Name: {orderItem.name}
                            </Typography>
                            <Typography variant="body2">
                              Quantity: {orderItem.quantity}
                            </Typography>
                            <Typography variant="body2">
                              Unit price: {orderItem.price}
                            </Typography>
                          </Box>
                        ))}
                    </TableCell>

                    <TableCell>{item.shipping_address}</TableCell>
                    <TableCell>{item.total_price}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    {/* <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, item)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} disableRipple>
          <Stack direction="row" spacing={2}>
            <Visibility />
            <Typography>View</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} disableRipple>
          <Stack direction="row" spacing={2}>
            <Delete />
            <Typography>Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

OrdersTable.propTypes = {
  data: PropTypes.object,
};
