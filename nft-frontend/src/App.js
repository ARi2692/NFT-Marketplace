import React from 'react'
import './App.css'
import Header from "./components/Header";
import TopFold from "./components/TopFold";
import TrendingNFTs from "./components/TrendingNFTs";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import ConnectWallet from './components/ConnectWallet';

const App = () => {
  return (
    <div className='max-width'>
      <Header />
      <TopFold /> 
      <ConnectWallet/>
      <TrendingNFTs />
      <InfoSection />
      <Footer />
    </div>
  )
}

export default App
