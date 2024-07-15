import React from 'react';
import Layout from '../components/Layout/Layout';
import { Typography, Container, Paper, Box } from '@mui/material';

const Policy = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices
            eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut
            vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis
            neque.
          </Typography>
          <Typography variant="body1" paragraph>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Aliquam malesuada diam eget turpis varius 1.
          </Typography>
          <Typography variant="body1" paragraph>
            Duis leo est, pulvinar sed cursus nec, lacinia vel mauris. Integer leo quam, auctor
            fermentum condimentum at, ultrices non orci. Morbi justo eros, volutpat ut rutrum nec,
            faucibus eu mauris. Integer eu libero elit. Nulla lectus velit, vehicula id cursus ut,
            euismod id massa.
          </Typography>
          <Typography variant="body1">
            Suspendisse viverra mauris eget tortor imperdiet vehicula. Nulla facilisi. Duis at
            mauris ut tellus gravida mattis in id quam.
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Policy;
