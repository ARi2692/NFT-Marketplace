import "./App.css";

import { Routes, Route } from "react-router-dom";
import React from 'react'
import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";

import Explore from "./pages/Explore";
import Create from "./pages/Create";
import Landing from "./pages/Landing";
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
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/explore" element={<Explore />} />
            <Route exact path="/create" element={<Create />} />
          </Routes>
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;

