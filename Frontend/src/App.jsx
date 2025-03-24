// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import HomePage from "../src/pages/HomePage";
import CheckoutPage from "../src/pages/CheckoutPage";
import ProtectedRoute from "../src/components/ProtectedRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ViewProductPage from "./pages/ViewProductsPage";
import AuthWrapper from "./components/AuthWrapper";
import AddProductPage from "./pages/AddProducts";
import UpdateProductPage from "./pages/UpdateProduct";
import Layout from "./components/Layout";
import Admin from "./pages/admin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#02542c",
    },
    secondary: {
      main: "#e4f0e6",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
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
            <Route path="/product/:item_id" element={<ViewProductPage />} />

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/product/add" element={<AddProductPage />} />
            <Route path="/product/update" element={<UpdateProductPage />} />
            <Route path="/product/checkout" element={<CheckoutPage />} />
            <Route path="/admin">
              <Route index element={<Admin />} />
            </Route>
          </Routes>
        </AuthWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
