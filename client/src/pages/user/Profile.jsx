import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Container, Box, TextField, Button } from '@mui/material';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const authURL = import.meta.env.VITE_API_URL;
  const authToken = localStorage.getItem(auth);

  useEffect(() => {
    console.log("auth:", auth);
    console.log("authToken:", authToken);

    const { name, email, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting profile update...");

      const response = await axios.put(
        `${authURL}/api/techhaven/auth/profile`,
        { name, phone, address, password },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      console.log("Update response:", response.data);

      setAuth({ ...auth, user: response.data.user });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error("Update error:", error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <Layout>
      <div className="m-2">
        <div className="flex flex-row flex-wrap">
          <div className="mx-2 md:w-1/4">
            <UserMenu />
          </div>
          <div className="mx-2 md:w-1/3">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h1>Profile</h1>
              <Container maxWidth="sm">
                <Box sx={{ mt: 2 }}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      value={email}
                      disabled
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                      label="Address"
                      name="address"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                      Update Profile
                    </Button>
                  </form>
                </Box>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Profile;