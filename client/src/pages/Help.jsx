import React from 'react';
import Layout from '../components/Layout/Layout';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Container, Paper, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Help = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Help / FAQs
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">What payment methods do you accept?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum
                mattis adipiscing. In est risus, auctor sed aliquam at, tincidunt quis lacus. Sed
                ligula nulla, vestibulum ac feugiat at, ullamcorper quis risus.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How can I track my order?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Integer tincidunt ante vel enim lacinia ultricies. Duis hendrerit, sem in
                consequat posuere, eros nisi viverra odio, sit amet interdum risus augue a leo.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Do you offer international shipping?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Sed fermentum, risus vel interdum ornare, velit tellus mattis ipsum, ac vestibulum
                risus risus eget nunc. Quisque id nisi elit. Quisque ut felis ipsum. Sed
                ullamcorper dapibus quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Help;