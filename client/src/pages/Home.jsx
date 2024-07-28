import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Fetch categories 
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${authURL}/api/techhaven/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Fetch all products 
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${authURL}/api/techhaven/product/get-product`);
      setProducts(data.products);
      setFilteredProducts(data.products); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category._id)
      );
    }

    if (selectedPrice.length > 0) {
      filtered = filtered.filter(product =>
        product.price >= selectedPrice[0] && product.price <= selectedPrice[1]
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedPrice, products]);

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(categoryId);
    if (index === -1) {
      updatedCategories.push(categoryId);
    } else {
      updatedCategories.splice(index, 1);
    }
    setSelectedCategories(updatedCategories);
  };

  const handlePriceChange = (priceArray) => {
    setSelectedPrice(priceArray);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout title="All Products - Best offers">
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center p-4">
        <IconButton onClick={toggleSidebar} className="md:hidden">
          <MenuIcon />
        </IconButton>
      </div>
      <div className="flex z-60">
        <Drawer
          open={isSidebarOpen}
          onClose={toggleSidebar}
          className="md:hidden"
        >
          <aside className="p-4 w-64">
            <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
            <ul>
              {categories.map((category) => (
                <li key={category._id} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                      className="mr-2"
                    />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
            <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
            <ul>
              {Prices.map((price) => (
                <li key={price._id} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPrice[0] === price.array[0] && selectedPrice[1] === price.array[1]}
                      onChange={() => handlePriceChange(price.array)}
                      className="mr-2"
                    />
                    {price.name}
                  </label>
                </li>
              ))}
            </ul>
            <Button onClick={handleResetFilters} variant="contained" color="secondary" className="mt-4">
              Reset Filters
            </Button>
          </aside>
        </Drawer>
        <aside className="hidden md:block md:w-1/4 p-4">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
          <ul>
            {Prices.map((price) => (
              <li key={price._id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedPrice[0] === price.array[0] && selectedPrice[1] === price.array[1]}
                    onChange={() => handlePriceChange(price.array)}
                    className="mr-2"
                  />
                  {price.name}
                </label>
              </li>
            ))}
          </ul>
          <Button onClick={handleResetFilters} variant="contained" color="secondary" className="mt-4">
            Reset Filters
          </Button>
        </aside>
        <main className="flex flex-wrap md:w-3/4 p-4">
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card className="bg-white shadow-md rounded-lg h-full flex flex-col">
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="140"
                    image={`path/to/product/image/${product._id}`} 
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
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
