import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './pages/home'
import Header from './layout/header'
import Footer from './layout/footer'


function App() {

  return (
    <>
      <Header cartCount={0}/>
      <Home />
      <Footer />
    </>
  )
}

export default App
