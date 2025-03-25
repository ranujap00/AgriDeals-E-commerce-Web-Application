import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export const InfoDialog = (props) => {
  const { onClose, open, title, message } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography mb={4}>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={onClose}>
          <Typography>Done</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
