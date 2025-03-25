import { Logout } from "@mui/icons-material";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
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
            xl: "80vw",
          },
          mx: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="primary"
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/admin")}
        >
          Agri Deals
        </Typography>
        <Button variant="text" color="primary" startIcon={<Logout />}>
          <Typography>Sign out</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
