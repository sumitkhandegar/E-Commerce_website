import React from 'react';
import Layout from '../components/Layout/Layout';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <Layout>
      <Grid container spacing={4}>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>Contact Information</Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="body1">example@email.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <PhoneIcon sx={{ mr: 1 }} />
            <Typography variant="body1">+123 456 7890</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="body1">123 Street, City, Country</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>Send Us a Message</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Your Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="outlined-basic"
                  label="Your Message"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Contact;
