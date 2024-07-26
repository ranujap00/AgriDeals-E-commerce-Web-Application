import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import HomePage from "../src/pages/HomePage";
import CheckoutPage from "../src/pages/CheckoutPage";
import ProtectedRoute from "../src/components/ProtectedRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ViewProductPage from "./pages/ViewProductsPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e53935",
    },
    secondary: {
      main: "#2b78e4",
    },
  },
});

function App() {
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log("Cart state changed:", cartItems);
  }, [cartItems]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ViewProductPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
