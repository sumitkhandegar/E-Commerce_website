import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const GST_RATE = 0.18;
  const DELIVERY_TAX = 50;

  // Fetch initial cart items from local storage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [setCart]);

  // Calculate total amount
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

  return (
    <Layout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {`Hello ${auth?.token && auth?.name}, you have ${cart.length} product(s) in your cart`}
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cart.map((product) => (
              <Card key={product._id} sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150, objectFit: 'cover' }}
                  image={product?.imageUrl}
                  alt={product?.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {product?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {product?.category?.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Description: {product?.description}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Price: ₹{product?.price}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Quantity: {product?.quantity}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Shipping: {product?.shipping ? 'Available' : 'Not Available'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      Created At: {new Date(product?.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      Updated At: {new Date(product?.updatedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box className="p-2 flex justify-between">
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
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: 2 }} 
              onClick={() => navigate('/payment')}
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