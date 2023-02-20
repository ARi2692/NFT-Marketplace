// import React from 'react'
// import './App.css'
// import Header from "./components/Header";
// import TopFold from "./components/TopFold";
// // import TrendingNFTs from "./components/TrendingNFTs";
// import InfoSection from "./components/InfoSection";
// import Footer from "./components/Footer";
// import ConnectWallet from './components/ConnectWallet';

// const App = () => {
//   return (
//     <div className='max-width'>
//       <Header />
//       <TopFold /> 
//       <ConnectWallet/>
//       <InfoSection />
//       <Footer />
//     </div>
//   )
// }

// export default App

// -----------------------------------------------

import "./App.css";

import { Routes, Route } from "react-router-dom";
import React from 'react'
import './App.css'
import Header from "./components/Header";
import TopFold from "./components/TopFold";
// import TrendingNFTs from "./components/TrendingNFTs";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
// import ConnectWallet from './components/ConnectWallet';

// import Employer from "./pages/Employer";
// import Freelancer from "./pages/Freelancer";
// import Landing from "./pages/Landing";
// import Messages from "./pages/Messages";
// import Footer from "./components/Footer";
// import JobPost from "./pages/JobPost";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Application from "./pages/Application";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <div className='max-width'>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={darkTheme({
            accentColor: "#b2b444",
            accentColorForeground: "white",
            borderRadius: "large",
            fontSize: 'large',
          })}
        >
          <Header />
          <TopFold /> 
          <InfoSection />
          {/* <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/freelancer" element={<Freelancer />} />
            <Route exact path="/employer" element={<Employer />} />
            <Route exact path="/jobpost" element={<JobPost />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/application" element={<Application />} />
          </Routes> */}
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;

