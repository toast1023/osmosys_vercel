import React, { useEffect, useState } from 'react';
import Logo from '../assets/OsmosysAI_Logo_White.svg'
import useAuthTokens from '../hooks/useAuthTokens';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../constants';

const Login = () => {
  const [params, _] = useSearchParams();
  const { accessToken, updateTokens, isExpired } = useAuthTokens();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(
    params.get("signup") === "success" ? {
        type: "alert-success", 
        msg: "Your account has been created, please sign-in."
      } : {type: "alert-error", msg: ""});
  const isTokenExpired = isExpired();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${getApiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.status != 200) {
        setAlert({type: "alert-error", msg: "Invalid credentials. Please try again."});
        return;
      }
      
      // store tokens in localstorage (using custom hook) for later usage
      const responseData = await response.json();
      updateTokens(responseData.access_token, responseData.refresh_token);

      navigate('/dashboard');
      console.log('Login successful');
    } catch (e) {
      console.error(e);
      setAlert({type: "alert-error", msg: "Communication error with server."});
    }
  };

  useEffect(() => {
    if (!isTokenExpired) {
      async function ping() {
        try {
          const response = await fetch(`${getApiUrl}/dashboard/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          });
    
          if (response.status == 200) {
            navigate('/dashboard');
          }
        } catch (error) {
          console.error(error);
          setAlert({type: "alert-error", msg: "Session expired. Please login again."});
        }
      }
      ping();
    }
  }, [])

  if (!isTokenExpired && alert.length === 0) {
    return (<></>)
  }

  return (
    <div className="bg-primary min-h-full flex flex-col items-center justify-center mx-auto p-8 lg:py-0 overflow-scroll">
      {/* <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="h-12 mr-2" src={Logo} alt="Osmosys Logo"/>
      </div> */}
      {(alert && alert.msg != "") && <div role="alert" className={`alert ${alert.type} m-8 w-full sm:max-w-md`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{alert.msg}</span>
      </div>}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Welcome back
          </h1>
          {/* <div>
            <button className="w-full btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
              </svg>
              Sign in with Discord
            </button>
          </div>
          <div className="divider">or</div> */}
          <form className="space-y-4 md:space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username or email</label>
              <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username or email" required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                {/* <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                </div> */}
              </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
            </div>
            <button type="submit" className="w-full btn btn-primary text-white">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
  </div>
  )
}

export default Login