import React from 'react'
import './connectWallet.css'
import Button from "../../common/button";

const ConnectWallet = () => {
  return (
    <div className='connect-wallet absolute-center'>
      {/* <img className='wallet-logos' alt='Connect Wallet' src={require('../../assets/metamask-img.png')} /> */}
      <Button btnType="PRIMARY" btnText="Connect Wallet"  />
    </div>
  )
}

export default ConnectWallet
