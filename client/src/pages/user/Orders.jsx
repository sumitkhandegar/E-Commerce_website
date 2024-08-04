import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const authURL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user_email = auth?.user?.email;

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${authURL}/api/techhaven/order/orders`);
      setOrders(response.data);
      console.log(response);
    } catch (error) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = orders.filter(order => order.buyer === user_email);

  return (
    <Layout>
      <div className="m-2">
        <div className="flex">
          <div className="mx-2 md:w-1/4">
            <UserMenu />
          </div>
          <div className="mx-2 md:w-3/4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <Typography variant="h4" gutterBottom>
                All Orders
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : filteredOrders.length === 0 ? (
                <Typography>No orders found.</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Products</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredOrders.map(order => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>
                            <ul>
                              {order.products.map(product => (
                                <li key={product._id}>{product.name}</li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;