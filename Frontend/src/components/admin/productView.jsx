import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export const ProductView = (props) => {
  const { onClose, open, item } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>View Item: ID {item.item_id}</DialogTitle>
      <DialogContent>
        <Box mb={1} sx={{ width: "512px" }}>
          <Typography variant="h6">Seller</Typography>
          <Typography variant="body1">ID: {item.advertiser._id}</Typography>
          <Typography variant="body1">
            Name: {item.advertiser.firstName} {item.advertiser.lastName}
          </Typography>
          <Typography variant="body1">
            Address: {item.advertiser.address}
          </Typography>
          <Typography variant="body1">
            Email: {item.advertiser.email}
          </Typography>
          <Typography variant="body1">
            Contact: {item.advertiser.contact}
          </Typography>
        </Box>
        <Divider />
        <Box mb={1}>
          <Typography variant="h6">Item</Typography>
          <Typography variant="body1">Name: {item.name}</Typography>
          <Typography variant="body1">
            Description: {item.description}
          </Typography>
          <Typography variant="body1">Unit price: {item.price}</Typography>
          <Typography variant="body1">Status: {item.status}</Typography>
          <Typography variant="body1">
            Date expire: {new Date(item.expiry_date).toDateString()}
          </Typography>
          <Typography variant="body1">
            Date added: {new Date(item.post_date).toDateString()}
          </Typography>
        </Box>
        <Divider />
        <Box mb={1}>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <Stack direction="row" sx={{ width: "100%" }} spacing={2}>
            {item.images.map((image, idx) => (
              <Box
                key={idx}
                width={64}
                height={64}
                overflow="hidden"
                sx={{
                  backgroundColor: "secondary.main",
                  cursor: "pointer",
                }}
              >
                <img
                  src={image}
                  alt={`${item.name}_image_${idx}`}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={onClose}>
          <Typography>Done</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductView.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};
