import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const PageNotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <h1 className="text-4xl font-bold mb-8">404 Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for does not exist.</p>
        <Link to="/">
          <Button variant="contained" color="primary">
            Go Back
          </Button>
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound;