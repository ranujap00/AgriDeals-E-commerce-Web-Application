import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, TextField, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import Cart from "./cart";
import ProfileMenu from "./profileMenu";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeNavigation = () => {
    navigate("/home");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "1px 1px 25px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1240px",
          mx: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="primary"
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={handleHomeNavigation}
        >
          Agri Deals
        </Typography>
        <TextField
          placeholder="Search for anything"
          variant="outlined"
          size="small"
          sx={{
            bgcolor: "background.paper",
            borderRadius: 50,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "1px solid rgba(0,0,0,0.25)",
                borderRadius: 50,
              },
              "&:hover fieldset": {
                border: "1px solid rgba(0,0,0,0.25)",
                borderRadius: 50,
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
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {location.pathname !== "/checkout" && <Cart />}
          <ProfileMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
