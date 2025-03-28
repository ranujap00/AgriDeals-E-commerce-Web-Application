import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, TextField, Stack, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import Cart from "./cart";
import ProfileMenu from "./profileMenu";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleHomeNavigation = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
    } else {
      setQuery("");
      navigate("/");
    }
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
          maxWidth: {
            xs: "100%",
            xl: "80vw"
          },
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
          onChange={(e) => setQuery(e.target.value)}
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
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {user ? (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {location.pathname !== "/checkout" && <Cart />}
            <ProfileMenu />
          </Stack>
        ) : (
          <Button variant="text" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
