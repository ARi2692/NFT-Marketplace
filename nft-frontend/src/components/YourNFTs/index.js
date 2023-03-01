import React from 'react'
import './yourNFTs.css'
import '../Cards'

const YourNFTs = ({items, marketplace}) => {
  return (
    <>
    {items.length>0 ? 
      <>
      <span className="header absolute-center header-gradient">
        {" "}
        Your NFTS{" "}
      </span>
      <div className="explore-cards">
        {items.map((item) => (
          <Cards
            item={item}
            marketplace={marketplace}
          />
        ))}
      </div>
      </>
    :
    (
      <h1>No Listed Items</h1>
    )}
    </>
  )
}

export default YourNFTs
