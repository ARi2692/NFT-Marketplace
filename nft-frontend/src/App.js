import React from 'react'
import './App.css'
import Header from "./components/Header";
import TopFold from "./components/TopFold";
import TrendingNFTs from "./components/TrendingNFTs";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <TopFold /> 
      <TrendingNFTs />
      <InfoSection />
      <Footer />
    </div>
  )
}

export default App
