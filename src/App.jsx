import React from 'react'
import styles from './style';
import { Navbar, About } from './components/Home';
import Home from './pages/Home'; 
import Login from './pages/Login'
import Signup from './pages/Signup'
import Redirect from './pages/Redirect'
import Dashboard from './pages/Dashboard'
import useFetchInterceptor from './hooks/useFetchInterceptor'
import { Route, Routes, useLocation } from 'react-router-dom'

const App = () => {
  const location = useLocation();
  const isNotHome = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/redirect');

  useFetchInterceptor();

  return (
    <div className = "bg-primary w-full flex flex-col h-screen">
      {!isNotHome && <div className = {`${styles.paddingX} ${styles.flexCenter}`}>
        <div className = {`${styles.boxWidth} flex absolute top-0 px-6 xl:px-0 md:px-16`}>
          <Navbar/>
        </div>
      </div>}
      <div className={isNotHome ? '' : 'pt-24 h-full '}>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="/dashboard/*" element = {<Dashboard/>}/>
          <Route path="/redirect/*" element = {<Redirect/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App