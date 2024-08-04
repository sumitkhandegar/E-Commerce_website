import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const GST_RATE = 0.18;
  const DELIVERY_TAX = 50;
  const authURL = import.meta.env.VITE_API_URL;
  const authToken = localStorage.getItem('authToken'); 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [setCart]);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
      const gstAmount = subtotal * GST_RATE;
      const totalAmount = subtotal + gstAmount + DELIVERY_TAX;
      setTotal(totalAmount);
    }
  }, [cart]);

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Item removed from cart');
  };

  const createOrder = async () => {
    try {
      const buyerId = auth?.user?.email; 
      const orderDetails = {
        products: cart.map(product => product._id),
        buyer: buyerId, 
      };
      const response = await axios.post(`${authURL}/api/techhaven/order/orders`, orderDetails, {
        headers: {
          Authorization: authToken, 
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Order placed successfully');
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/dashboard/user/orders');
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {`Hello ${auth?.user?.name}, you have ${cart.length} product(s) in your cart`}
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cart.map((product) => (
              <Card key={product._id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150, objectFit: 'cover' }}
                  image={product?.imageUrl}
                  alt={product?.name}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="h5">{product?.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">{product?.category?.name}</Typography>
                  <Typography variant="body1">Description: {product?.description}</Typography>
                  <Typography variant="body1">Price: ₹{product?.price}</Typography>
                  <Typography variant="body1">Quantity: {product?.quantity}</Typography>
                  <Typography variant="body1">Shipping: {product?.shipping ? 'Available' : 'Not Available'}</Typography>
                  <Typography variant="body2" color="text.secondary">Created At: {new Date(product?.createdAt).toLocaleDateString()}</Typography>
                  <Typography variant="body2" color="text.secondary">Updated At: {new Date(product?.updatedAt).toLocaleDateString()}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    Detail
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => removeProduct(product._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {cart.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6">Subtotal: ₹{cart.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2)}</Typography>
            <Typography variant="h6">GST (18%): ₹{(cart.reduce((sum, product) => sum + product.price * product.quantity, 0) * GST_RATE).toFixed(2)}</Typography>
            <Typography variant="h6">Delivery Tax: ₹{DELIVERY_TAX.toFixed(2)}</Typography>
            <Typography variant="h5">Total: ₹{total.toFixed(2)}</Typography>
            {auth?.user?.address ? (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Current Address</Typography>
                <Typography>{auth?.user?.address}</Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={() => navigate('/dashboard/user/profile')}>
                  Update Address
                </Button>
              </Box>
            ) : (
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ marginTop: 2 }} 
                onClick={() => navigate(auth?.token ? '/dashboard/user/profile' : '/login')}
              >
                {auth?.token ? 'Update Address' : 'Please Login'}
              </Button>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: 2 }} 
              onClick={createOrder}
            >
              Order Now
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Cart;