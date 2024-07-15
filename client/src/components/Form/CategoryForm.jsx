import React from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my={0}
        p={0}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Enter New Category Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Create Category
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default CategoryForm;
