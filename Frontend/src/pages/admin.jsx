import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Header from "../components/admin/header";
import DashboardCard from "../components/admin/dashboardCard";
import { Add } from "@mui/icons-material";
import ProductsTable from "../components/admin/productsTable";
import OrdersTable from "../components/admin/ordersTable";
import { getAllItems, getAllOrders } from "../api";
import { useNavigate } from "react-router-dom";

const groupByDate = (items, dateColumnName) => {
  return items.reduce((groups, item) => {
    const date = new Date(item[dateColumnName]).toISOString().split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [counts, setCounts] = useState({
    products: 0,
    orders: 0,
    sales: 0,
  });
  const [products, setProducts] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const productsData = await getAllItems();
        const ordersData = await getAllOrders();

        if (productsData) {
          setProducts(groupByDate(productsData, "post_date"));
        }

        if (ordersData) {
          setOrders(groupByDate(ordersData, "order_date"));
        }

        const totalSales = ordersData.reduce(
          (sum, order) => sum + (order.total_price || 0),
          0
        );

        setCounts({
          orders: ordersData.length,
          products: productsData.length,
          sales: totalSales,
        });

        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <main>
      <Header />
      <Container sx={{ my: 12 }}>
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={4}>
            <DashboardCard
              title="Products"
              value={counts.products}
              icon={<InventoryIcon fontSize="large" color="primary" />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DashboardCard
              title="Orders"
              value={counts.orders}
              icon={<ShoppingCartIcon fontSize="large" color="primary" />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DashboardCard
              title="Total Sales"
              value={counts.sales}
              icon={<AttachMoneyIcon fontSize="large" color="primary" />}
            />
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Products" />
            <Tab label="Orders" />
          </Tabs>
        </Box>
        {activeTab === 0 && (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" gutterBottom>
                Products
              </Typography>
              <Button
                onClick={() => navigate("/admin/product/add")}
                variant="contained"
                color="primary"
                startIcon={<Add />}
              >
                <Typography>Add new product</Typography>
              </Button>
            </Stack>
            <ProductsTable data={products} setData={setProducts} />
          </>
        )}
        {activeTab === 1 && (
          <>
            <Typography variant="h4" gutterBottom>
              Orders
            </Typography>
            {orders && <OrdersTable data={orders} />}
          </>
        )}
      </Container>
    </main>
  );
}
