import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const useAuthTokens = () => {
  // State variables to store the tokens
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || null);

  // Effect to run once on component mount to retrieve tokens from localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to update tokens in state and localStorage
  const updateTokens = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  // Function to clear tokens from state and localStorage
  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const isExpired = () => {
    if (refreshToken === null) {
      return true;
    }

    let decodedToken = jwtDecode(refreshToken);
    if (decodedToken === null) {
      return true;
    }

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      clearTokens();
      return true;
    } else {
      return false;
    }
  }

  // Return the state variables and functions
  return { accessToken, refreshToken, updateTokens, clearTokens, isExpired };
};

export default useAuthTokens;