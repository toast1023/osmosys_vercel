import React, { useEffect, useState } from 'react'
import MessagesPieChart from '../../components/Dashboard/MessagesPieChart'
import MessagesGraph from '../../components/Dashboard/MessagesGraph'
import MessagesTable from '../../components/Dashboard/MessagesTable'

const Home = ({guild}) => {
  if (import.meta.env.VITE_API_URL == undefined)
    return (<>HEY!!! you didn't set the api url for production!!!</>)
  return (
    <>
      <div className='w-full bg-gray-800 rounded-md px-4 py-2 mb-4 items-center flex space-x-2 text-xl'>
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
      <div className='flex w-full space-x-4 pb-4'>
        <div className='lg:w-2/3 w-full bg-gray-800 rounded-md justify-center items-center'>
          <MessagesGraph guild={guild}/>
        </div>
        <div className='lg:w-1/3 w-full bg-gray-800 rounded-md'>
          <MessagesPieChart guild={guild}/>
        </div>
      </div>
      <div className='w-full'>
        <MessagesTable guild={guild}/>
      </div>
    </>
  )
};

export default Home