// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { Orders } from "./pages/Orders";

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
        <Routes>
          <Route element={<AuthWrapper />}>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/product/update" element={<UpdateProductPage />} />
            <Route path="/product/checkout" element={<CheckoutPage />} />
            <Route path="/admin">
              <Route index element={<Admin />} />
              <Route path="product/add" element={<AddProductPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/search/:query"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route path="/product/:item_id" element={<ViewProductPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
