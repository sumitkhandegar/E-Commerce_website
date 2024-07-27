import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState('');

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);