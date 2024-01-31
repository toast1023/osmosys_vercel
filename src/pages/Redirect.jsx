import React, { useEffect } from 'react'
import useAuthTokens from '../hooks/useAuthTokens';
import { Route, Routes, Navigate, useSearchParams } from 'react-router-dom'
import { getApiUrl } from '../constants';

const Redirect = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/"/>}/>
      <Route path="discord" element={<Discord/>} />
    </Routes>
  )
}

const Discord = () => {
  const [params, _] = useSearchParams();
  const code = params.get("code");
  const { accessToken } = useAuthTokens();

  const handleDiscordLink = async () => {
    if (!code) {
      window.close();
    }

    try {
      const url = new URL(`${getApiUrl}/auth/discord/link`);
      url.searchParams.append('code', code);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status != 200) {
        console.log("failed to link account")
        window.close();
        return;
      }

      const resp = await response.json();
      console.log(resp);
      window.close();
    } catch (error) {
      console.error(error);
      window.close();
      return;
    }
  };

  useEffect(() => {
    handleDiscordLink()
  }, [])

  return (
    <>
    </>
  )
}

export default Redirect