import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    answer: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const authURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${authURL}/api/techhaven/auth/forgot-password`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Forgot Password Error:', error);
      toast.error('Password reset failed. Please try again.');
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password" 
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.newPassword}
              onChange={handleChange}
            />
            <TextField
              label="What is your Best Friend's name?"
              name="answer"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your Best Friend's name."
              required
              value={formData.answer}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Update Password
            </Button>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </Layout>
  );
};

export default ForgotPassword;
