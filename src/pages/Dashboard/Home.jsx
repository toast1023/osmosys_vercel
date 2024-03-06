import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { defaultCategories } from '../../constants';
import MessagesPieChart from '../../components/Dashboard/MessagesPieChart';
import MessagesGraph from '../../components/Dashboard/MessagesGraph';
import MessagesTable from '../../components/Dashboard/MessagesTable';
import ServerSettings from '../../pages/Dashboard/ServerSettings';

const Home = ({guild, update}) => {
  const [tempThresholds, setTempThresholds] = useState(() => {
    const newThresholds = new Map(defaultCategories);
    defaultCategories.forEach((_, category) => {
      newThresholds.set(category, 50);
    });
    return newThresholds;
  });

  if (!guild) {
    return (<>
      <div className="min-h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
        <svg className="fill-gray-400 stroke-gray-400 h-36" width="100%" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
          <path d="M48.2846 35.1737a3 3 0 1 1-3-3 3.0011 3.0011 0 0 1 3 3Z"/>
          <path d="M30.2846 35.1737a3 3 0 1 1-3-3 3.0011 3.0011 0 0 1 3 3Z"/>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M25.4512 56.2934a22.9635 22.9635 0 1 0-11.3767-14.299"/>
          <path fill="none" strokeMiterlimit="10" strokeWidth="2" d="M22.9511 52.9953a5.0262 5.0262 0 0 0 1.7615-3.45c.3532-4.4362-3.5025-9.0145-3.6667-9.2071a.9522.9522 0 0 0-1.3428-.1068c-.1929.1645-4.7241 4.0753-5.0783 8.5123a5.0608 5.0608 0 0 0 8.3267 4.2513Z"/>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M42.7856 46a12.4489 12.4489 0 0 0-6.8422-1.8532A10.3886 10.3886 0 0 0 29.7856 46"/>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M51.4223 26.2978a7.4028 7.4028 0 0 1-5.3048-.3243 7.4 7.4 0 0 1-4.11-3.4111"/>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.1854 26.2871a8.44 8.44 0 0 0 9.413-3.7176"/>
        </svg>
        <span>Could not find any moderated servers.</span>
        <span>
          <Link className="underline hover:decoration-dotted hover:text-white" to="/dashboard/settings?page=Connections">
          Link your Discord account
          </Link> and <a className="underline hover:decoration-dotted hover:text-white" href="https://discord.com/oauth2/authorize?client_id=1152436728125206628&permissions=21983791152192&scope=bot" target="_blank">
          add the bot 
          </a> to your server to get started!
        </span>
      </div>
    </>)
  }

  return (
    <>
      <div className='w-full bg-gray-800 rounded-md px-2 py-2 mb-4 items-center flex space-x-2'>
        <div className='text-xl flex-grow flex flex-row space-x-2 px-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
            <path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
          </svg>
          <span>Dashboard</span>
          <span>/</span>
          {guild && (<>
            {guild.icon ? (
              <img className="h-6 w-6 rounded-full" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}/>
            ) : (
              <div className="relative inline-flex items-center justify-center h-16 w-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-300 dark:text-gray-300 text-md">{guild.name.substring(0, 1)}</span>
              </div>
            )}
            <span className="font-medium text-gray-300 dark:text-gray-300">{guild.name}</span>
          </>
          )}
        </div>
        <button className="btn btn-xs" onClick={()=>{update()}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
          </svg>
          Refresh
        </button>
        <ServerSettings {...{guild, update, setTempThresholds}}/>
      </div>
      <div className='flex w-full space-x-4 pb-4'>
        <div className='lg:w-2/3 w-full bg-gray-800 rounded-md justify-center items-center'>
          <MessagesGraph guild={guild}/>
        </div>
        <div className='lg:w-1/3 w-full bg-gray-800 rounded-md'>
          <MessagesPieChart guild={guild}/>
        </div>
      </div>
      <div className='w-full'>
        <MessagesTable guild={guild} thresholds={tempThresholds}/>
      </div>
    </>
  )
};

export default Home