import { useLayoutEffect } from 'react';
import useAuthTokens from './useAuthTokens';
import { useNavigate } from 'react-router-dom';

const useFetchInterceptor = () => {
  const navigate = useNavigate();
  const { clearTokens, updateTokens, refreshToken } = useAuthTokens();

  useLayoutEffect(() => {
    // Save the original fetch function
    const originalFetch = window.fetch;

    // Create a new fetch function
    const fetchInterceptor = async (url, options) => {
      try {
        // Call the original fetch function
        const response = await originalFetch(url, options);

        // Check if we are making a request to our own backend
        const host = new URL(url).host;
        if (host !== `${new URL(import.meta.env.VITE_API_URL).host}` && response.status !== 401) {
          return response;
        }

        // Check if 401 response message contains anything related to token (most likely bad token)
        const clonedResp = response.clone();
        if (!String((await clonedResp.json()).detail).toLowerCase().includes("token")) {
          return response;
        }

        // If token is bad/expired, use refresh token to get new tokens
        const refreshResp = await originalFetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
          },
        });

        // If refresh still not successful, navigate to login page
        if (refreshResp.status !== 200) {
          console.error("Failed to authenticate using tokens.");
          clearTokens();
          navigate("/login");
          return;
        }

        // If refresh successful, update tokens and retry original request
        console.log("Successfully refreshed tokens!");
        const tokens = await (refreshResp.clone()).json();
        updateTokens(tokens.access_token, tokens.refresh_token);
        options.headers['Authorization'] = `Bearer ${tokens.access_token}`;
        return await originalFetch(url, options);
      } catch (error) {
        throw error;
      }
    };

    // Override the global fetch with the interceptor
    window.fetch = fetchInterceptor;

    // Clean up by restoring the original fetch function on component unmount
    return () => {
      window.fetch = originalFetch;
    };
  }, []); // Only run once on mount

  // You can return additional values or functions as needed
  return {
    // Additional values or functions
  };
};

export default useFetchInterceptor;