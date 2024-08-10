import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, MenuItem, Select, Button } from '@mui/material';

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]);
    const [orders, setOrders] = useState([]);
    const authURL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const getOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${authURL}/api/techhaven/order/all-orders`);
        setOrders(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort by recently created
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
      try {
        await axios.put(`${authURL}/api/techhaven/order/order-status/${orderId}`, { status: newStatus });
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } catch (error) {
        console.error('Error updating order status:', error);
        setError('Error updating order status');
      }
    };
  
    useEffect(() => {
      getOrders();
    }, []);

    return (
        <Layout>
            <div className="flex flex-row flex-wrap m-2">
                <div className="mx-2 md:w-1/4">
                    <AdminMenu />
                </div>
                <div className="bg-white shadow-md rounded-lg p-2 mx-2 md:w-2/3">
                    <div className="">
                        <Typography variant="h4" gutterBottom>
                            All Orders
                        </Typography>
                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : orders.length === 0 ? (
                            <Typography>No orders found.</Typography>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Products</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map(order => (
                                            <TableRow key={order._id}>
                                                <TableCell>{order._id}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    >
                                                        {status.map(status => (
                                                            <MenuItem key={status} value={status}>
                                                                {status}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell>
                                                    <ul>
                                                        {order.products.map(product => (
                                                            <li key={product._id}>{product.name}</li>
                                                        ))}
                                                    </ul>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => updateOrderStatus(order._id, order.status)}
                                                    >
                                                        Remove
                                                    </Button>
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
        </Layout>
    );
};

export default AdminOrders;