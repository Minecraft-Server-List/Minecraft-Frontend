import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useServerSearch = (initialQuery?: string) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const navigate = useNavigate();
  
  const navigateToServers = (query?: string) => {
    const searchTerm = query ?? searchQuery;
    if (searchTerm.trim()) {
      navigate(`/servers?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/servers');
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent, query?: string) => {
    if (e.key === 'Enter') {
      navigateToServers(query);
    }
  };
  
  return {
    searchQuery,
    setSearchQuery,
    navigateToServers,
    clearSearch,
    handleKeyPress
  };
};