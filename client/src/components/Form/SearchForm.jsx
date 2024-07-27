import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const { keyword, setKeyword, setSearchResults } = useSearch();
  const authURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${authURL}/api/techhaven/product/search/${keyword}`;
      const { data } = await axios.get(url);
      console.log('Search results:', data);
      setSearchResults(data.data);
      navigate('/search');
      setKeyword("");
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-4">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <TextField
          className="flex-grow bg-white h-10"
          type="text"
          placeholder="Search Products"
          value={keyword}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{ style: { backgroundColor: 'white', height: '100%' } }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;