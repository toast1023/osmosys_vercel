import React, { useEffect, useState } from 'react'
import Logo from '../../assets/OsmosysAI_Logo_White.svg'
import Home from './Home'
import Settings from './AccountSettings'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { getApiUrl, onClickBlur } from '../../constants'
import useAuthTokens from '../../hooks/useAuthTokens';
import DiscordServerSelect from '../../components/Dashboard/DiscordServerSelect';
import AccountHeader from '../../components/Dashboard/AccountHeader'

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    discord_guilds: []
  });
  const [selectedGuild, _setSelectedGuild] = useState(null);
  const setSelectedGuild = (value, guilds=[]) => {
    if (!value) {
      const guild = guilds.find(guild => guild.id === localStorage.getItem('selectedGuild'))
      if (guild) value = guild;
      else value = guilds[0];
    }
    if (value && localStorage.getItem('selectedGuild') !== value.id) {
      localStorage.setItem('selectedGuild', value.id)
    }
    _setSelectedGuild(value);
  };
  const { accessToken } = useAuthTokens();
  const getUserDetails = async () => {
    try {
      const response = await fetch(`${getApiUrl}/dashboard/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const resp = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        ...resp
      }));
      setSelectedGuild(null, resp.discord_guilds);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user.username || user.update) {
      if (user.update) {
        setUser(prevUser => {
          const { update, ...rest } = prevUser;
          return rest;
        });
        setSelectedGuild(null, user.discord_guilds);
      }
      getUserDetails();
    }
  }, [user]);

  return (<>
  {user.username && <div className="drawer md:drawer-open bg-base-300">
    <input id="nav-drawer" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col h-screen">
      {/* Navbar */}
      <div className="grid grid-cols-3 w-full navbar h-20 bg-base-300">
        <div className="flex-none md:hidden">
          <label htmlFor="nav-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <div className="flex flex-1 px-2 mx-2 items-center justify-center md:hidden">
          <img src={Logo} alt="Osmosys Logo" className="w-52"/>
        </div>
        <div className="hidden md:block">
        </div>
        <div className="hidden md:block">
        </div>
        <div className="grid justify-items-end">
          <AccountHeader user={user}/>
        </div>
      </div>
      {/* Page content */}
      <div className='p-4 flex-1 md:rounded-tl-lg overflow-auto bg-base-200'>
        <Routes>
          <Route path="/" element={<Home guild={selectedGuild} update={() => {setUser({...user, update: 'update'})}}/>}/>
          <Route path="settings" element={<Settings user={user} setUser={setUser}/>} />
        </Routes>
      </div>
    </div> 
    {/* Sidebar content */}
    <div className="drawer-side">
      <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-72 min-h-full bg-base-300 space-y-6">
        <img src={Logo} alt="Osmosys Logo" className="h-12 -mb-2"/>
        <DiscordServerSelect guilds={user.discord_guilds} setSelectedGuild={setSelectedGuild}/>
        <div className=''>
          <li onClick={onClickBlur}>
            <Link to="">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-speedometer" viewBox="0 0 16 16">
                <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                <path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
              </svg>
              Dashboard
            </Link>
          </li>
          <li onClick={onClickBlur}>
            <Link to="settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
              Settings
            </Link>
          </li>
        </div>
      </ul>
    </div>
  </div>}
  </>)
}

export default Dashboard