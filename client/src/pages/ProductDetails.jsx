import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductDetails = () => {
    const authURL = import.meta.env.VITE_API_URL;
    const params = useParams();
    const [product, setProduct] = useState({});
    const [cart , setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getProductDetails();
    }, [params?.slug]);

    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`${authURL}/api/techhaven/product/get-single-product/${params.slug}`);
            setProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <ToastContainer />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Card sx={{ display: 'flex', maxWidth: 800, width: '100%' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 250 }}
                        image={`path_to_product_images/${product?.slug}.jpg`}
                        alt={product?.name}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => {
                            const updatedCart = [...cart, product];
                            setCart(updatedCart);
                            localStorage.setItem('cart', JSON.stringify(updatedCart));
                            toast.success("Item added to cart");
                          }}
                        >
                          Add to Cart
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Layout>
    );
}

export default ProductDetails;
