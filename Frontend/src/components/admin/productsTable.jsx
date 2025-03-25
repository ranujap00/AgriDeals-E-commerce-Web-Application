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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import PropTypes from "prop-types";
import { ProductView } from "./productView";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../api";

export default function ProductsTable(props) {
  const { data, setData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openView, setOpenView] = useState(false);
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleView = () => {
    setOpenView(true);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/admin/product/update/${selectedRow.item_id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteItem(selectedRow._id);
      const updatedData = Object.keys(data).reduce((acc, date) => {
        const filteredItems = data[date].filter(
          (item) => item.item_id !== selectedRow.item_id
        );

        if (filteredItems.length > 0) {
          acc[date] = filteredItems; // Keep the date group if it still has items
        }

        return acc;
      }, {});
      setData(updatedData);
      setAnchorEl(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
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
                  <TableRow key={item.item_id}>
                    <TableCell>{item.item_id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.available_count}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, item)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
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
        <MenuItem onClick={handleEdit} disableRipple>
          <Stack direction="row" spacing={2}>
            <Edit />
            <Typography>Edit</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleView} disableRipple>
          <Stack direction="row" spacing={2}>
            <Visibility />
            <Typography>View</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} disableRipple>
          <Stack direction="row" spacing={2}>
            <Delete />
            <Typography>Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>
      {openView && (
        <ProductView
          item={selectedRow}
          open={openView}
          onClose={() => setOpenView(false)}
        />
      )}
    </>
  );
}

ProductsTable.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
};
