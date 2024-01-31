import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { onClickBlur } from '../../constants'
import useAuthTokens from '../../hooks/useAuthTokens';

const AccountHeader = ({user}) => {
  const { clearTokens } = useAuthTokens();
  const navigate = useNavigate();

  return (
    <>
      {user.username !== '' ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            {/* <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div> */}
            {user.username}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={onClickBlur}><Link to="settings">Settings</Link></li>
            <li onClick={onClickBlur}>
              <div onClick={() => {
                clearTokens();
                navigate('/login');
              }}>Logout</div>
            </li>
          </ul>
        </div>
        ) : (
          <></>
        )}
    </>
  );
};

export default AccountHeader;