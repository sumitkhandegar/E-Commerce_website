import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({ name: '', description: '', price: '', quantity: '', shipping: '' });
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();
    const authURL = import.meta.env.VITE_API_URL;

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${authURL}/api/techhaven/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    // search bar
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product => {
        const productName = product.name ? product.name.toLowerCase() : '';
        const productCategory = product.category ? product.category.name.toLowerCase() : '';
        const search = searchTerm.toLowerCase();
        return productName.includes(search) || productCategory.includes(search);
    });

    // delete product
    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${authURL}/api/techhaven/product/delete-product/${productId}`);
            toast.success("Product deleted successfully!");
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete product!");
        }
    };

    // upadte product
    const handleUpdate = (product) => {
        setCurrentProduct(product);
        setUpdatedProduct({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            shipping: product.shipping ? 'true' : 'false',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value,
        });
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/jpeg') {
            setPhoto(file);
        } else {
            toast.error('Please select a JPEG file');
        }
    };

    // handle UPadte Product
    const handleUPadteSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', updatedProduct.name);
        formData.append('description', updatedProduct.description);
        formData.append('price', updatedProduct.price);
        formData.append('category', currentProduct.category._id);
        formData.append('quantity', updatedProduct.quantity);
        formData.append('shipping', updatedProduct.shipping);
        if (photo) {
            formData.append('photo', photo);
        }
    
        try {
            const response = await axios.put(
                `${authURL}/api/techhaven/product/update-product/${currentProduct._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log(response);
            if (response.data.success) {
                toast.success('Product updated successfully!');
                getAllProducts();
                setOpen(false);
            } else {
                toast.error('Failed to update product: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Something went wrong while updating the product');
        }
    };    

    return (
        <Layout>
            <div className="flex flex-row flex-wrap m-2">
                <div className="mx-2 md:w-1/5">
                    <AdminMenu />
                </div>
                <div className="bg-white shadow-md rounded-lg p-2 mx-2 w-full md:w-3/5">
                    <h4 className="text-gray-700 text-lg font-semibold mb-4 text-center">All Products List</h4>
                    <div className="flex justify-between">
                        <Box mb={4} className="w-64">
                            <TextField
                                fullWidth
                                label="Search by name or category"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </Box>
                        <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard/admin/add-product')} className="h-12">
                            Add Product
                        </Button>
                    </div>
                    <Grid container spacing={2}>
                        {filteredProducts.map(product => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <Card className="bg-white shadow-md rounded-lg h-full flex flex-col">
                                    <CardMedia
                                        component="img"
                                        alt={product.category.name}
                                        height="140"
                                        image={`path/to/product/image/${product._id}`} // Adjust the path to your product images
                                        title={product.name}
                                    />
                                    <CardContent className="flex flex-col flex-grow">
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${product.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {product.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Shipping: {product.shipping ? 'Yes' : 'No'}
                                        </Typography>
                                    </CardContent>
                                    <Box className="p-2 flex justify-between">
                                        <Button variant="contained" color="primary" onClick={() => handleUpdate(product)}>
                                            Update
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(product._id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleUPadteSubmit}>
                        <TextField
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Price"
                            type="number"
                            fullWidth
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Quantity"
                            type="number"
                            fullWidth
                            name="quantity"
                            value={updatedProduct.quantity}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Shipping"
                            select
                            fullWidth
                            SelectProps={{ native: true }}
                            name="shipping"
                            value={updatedProduct.shipping}
                            onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </TextField>
                        <Box sx={{ marginTop: 2 }}>
                            <label className="block text-gray-700">Upload Photo</label>
                            <input
                                id="photoInput"
                                type="file"
                                accept="image/jpeg"
                                onChange={handlePhotoChange}
                                className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </Box>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="error">
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <ToastContainer />
        </Layout>
    );
}

export default Product;
