import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout/Layout';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: '',
  });

  const navigate = useNavigate(); 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const authURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${authURL}/api/techhaven/auth/register`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Layout title={"Register Page"}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.name}
              onChange={handleChange}
            />
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
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              label="Waht is your Best Friend name ?"
              name="answer"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder='Enter is your Best Friend name.'
              required
              value={formData.answer}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </Layout>
  );
};

export default Register;
