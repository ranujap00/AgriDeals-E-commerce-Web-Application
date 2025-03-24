import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, error, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  }, [status, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
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
            onClick={() => navigate("/")}
          >
            Agri Deals
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            mt: 16,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <LockOutlined color="primary" />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Stack>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
