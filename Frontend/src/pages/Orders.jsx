import { Box, CircularProgress, Container, Typography } from "@mui/material";
import OrdersTable from "../components/admin/ordersTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getUserOrders } from "../api";
import { useSelector } from "react-redux";

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

export const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      const fetchData = async () => {
        const ordersData = await getUserOrders(user.uid);
        if (ordersData) {
          setOrders(groupByDate(ordersData, "order_date"));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

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
    <>
      <Header />
      <main>
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            My Orders
          </Typography>
          {orders && <OrdersTable data={orders} />}
        </Container>
      </main>
      <Footer />
    </>
  );
};
