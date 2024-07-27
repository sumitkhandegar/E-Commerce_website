import React from 'react';
import Layout from '../components/Layout/Layout';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { useSearch } from '../context/SearchContext';

const Search = () => {
  const { searchResults } = useSearch();

  return (
    <Layout title={"Search Results"}>
      <main className="p-4">
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results - {searchResults.length} product found{searchResults.length > 1 ? 's' : ''}
        </Typography>
        <Grid container spacing={3}>
          {searchResults.map((product) => (
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
                  <Button variant="contained" color="primary" >
                    Detail
                  </Button>
                  <Button variant="contained" color="secondary" >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </Layout>
  );
};

export default Search;