import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
        <Link to="/about" className="hover:text-gray-400">About</Link>
        <span className="hidden sm:inline-block">|</span>
        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        <span className="hidden sm:inline-block">|</span>
        <Link to="/policy" className="hover:text-gray-400">Privacy Policy</Link>
        <span className="hidden sm:inline-block">|</span>
        <Link to="/help" className="hover:text-gray-400">Help</Link>
      </div>
      <div className="flex justify-center space-x-4 mb-2">
        <Link to={{ pathname: "https://www.facebook.com" }} target="_blank" className="hover:text-gray-400">
          <Facebook />
        </Link>
        <Link to={{ pathname: "https://www.twitter.com" }} target="_blank" className="hover:text-gray-400">
          <Twitter />
        </Link>
        <Link to={{ pathname: "https://www.instagram.com" }} target="_blank" className="hover:text-gray-400">
          <Instagram />
        </Link>
        <Link to={{ pathname: "https://www.linkedin.com" }} target="_blank" className="hover:text-gray-400">
          <LinkedIn />
        </Link>
        <Link to={{ pathname: "https://www.youtube.com" }} target="_blank" className="hover:text-gray-400">
          <YouTube />
        </Link>
      </div>
      <hr className="border-t border-gray-400 my-2" />
      <h4 className="mt-2">All Rights Reserved &copy; Sumit Khandegar</h4>
    </footer>
  );
};

export default Footer;
