import React,  { useEffect, useState } from "react";
// import { useAccount, useNetwork } from "wagmi";
import Cards from "../../components/Cards";
import "./explore.css";
// import contents from "./content";

export default function Explore({marketplace, nft}) {
  // const { chain } = useNetwork();
  // const { address } = useAccount();
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )

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


{/* <span className="header absolute-center header-gradient">
        {" "}
        Trending NFTS{" "}
      </span>
      <div className="explore-cards">
        {contents.map((contents) => (
          <Cards
            key={contents.id}
            image={contents.image}
            name={contents.name}
            price={contents.price}
            totalSales={contents.totalSales}
            timeLeft={contents.timeLeft}
            rating={contents.rating}
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.totalPrice}
            description={item.description}
          />
        ))}
      </div> */}