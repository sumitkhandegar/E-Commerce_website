import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const authURL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = async () => {
      setLoading(true);
      setError(null);
      try {
          const { data } = await axios.get(`${authURL}/api/techhaven/order/orders`);
          setOrders(data); // Update state with fetched orders
          console.log('Fetched orders:', data);
      } catch (error) {
          setError(error.response ? error.response.data : error.message);
          console.error('Error fetching orders:', error.response ? error.response.data : error.message);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <div className="m-2">
        <div className="flex">
          <div className="mx-2 md:w-1/4">
            <UserMenu />
          </div>
          <div className="mx-2 md:w-3/4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h1>All Orders</h1>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                orders.map(order => (
                  <div key={order._id} className="mb-4 p-4 border rounded">
                    <h2>Order ID: {order._id}</h2>
                    <p>Status: {order.status}</p>
                    <p>Buyer ID: {order.buyer}</p> {/* Displaying buyer as a string */}
                    <ul>
                      {order.products.map(product => (
                        <li key={product._id}>{product.name}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;