import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Select from 'react-select';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [shipping, setShipping] = useState("");
  const authURL = import.meta.env.VITE_API_URL;

  // Get All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${authURL}/api/techhaven/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error('Failed to fetch categories');
      }
    } catch (error) {
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryChange = selectedOption => {
    setCategory(selectedOption);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setPhoto(file);
    } else {
      toast.error('Please select a JPEG file');
    }
  };

  const categoryOptions = categories.map(category => ({
    value: category._id,
    label: category.name
  }));

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  // Add Product
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category.value);
    formData.append('quantity', quantity);
    formData.append('shipping', shipping === 'true');
    if (photo) {
      formData.append('photo', photo);
    }
  
    try {
      const response = await axios.post(`${authURL}/api/techhaven/product/add-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        toast.success('Product added successfully!');
        navigate('/dashboard/admin/products');

        setName('');
        setDescription('');
        setPrice('');
        setCategory(null);
        setQuantity('');
        setPhoto(null);
        setShipping('');
        document.getElementById('photoInput').value = '';
      } else {
        toast.error('Failed to add product: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Something went wrong while adding the product');
    }
  };  

  return (
    <Layout>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>
          <Box sx={{ width: '25%' }}>
            <AdminMenu />
          </Box>
          <Box sx={{ width: '50%', marginLeft: 2, padding: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" component="h4" gutterBottom>
              Add New Product
            </Typography>
            <form onSubmit={handleSubmit}>
              <Select
                options={categoryOptions}
                onChange={handleCategoryChange}
                value={category}
                placeholder="Select category..."
                styles={{
                  control: (provided) => ({
                    ...provided, backgroundColor: 'white', border: '1px solid #ccc',
                  }),
                  option: (provided) => ({
                    ...provided, backgroundColor: 'white', color: 'black', 
                  }),
                  menu: (provided) => ({
                    ...provided, zIndex: 49,
                  }),
                }}
              />
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Quantity"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                label="Shipping"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                SelectProps={{ native: true }}
                value={shipping}
                onChange={handleShippingChange}
              >
                <option value="true">Shipping</option>
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
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Add Product
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </Layout>
  );
};

export default AddProduct;