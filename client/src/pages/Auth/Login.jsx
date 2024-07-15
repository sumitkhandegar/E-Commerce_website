import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const authURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${authURL}/api/techhaven/auth/login`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state?.from || "/");  
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <Layout title="Login Page">
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Link to="/reset-password" className="pb-2 block text-right">Forgot Password?</Link>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </form>
        <ToastContainer />
      </Container>
    </Layout>
  );
};

export default Login;
