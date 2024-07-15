import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Layout = ({ 
  children, 
  title = "Gada Electronics", 
  description = "Electronics Product Store", 
  keywords = "Phone, TV, Laptop, Fan, AC, Radio, Fridge, Washing Machine, Mixer", 
  author = "Sumit Khandegar" 
}) => {
  return (
    <HelmetProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>

        <Header />
        <main style={{ flex: '1 0 auto', paddingTop: '6rem', margin: '20px'}}>{children}</main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Layout;
