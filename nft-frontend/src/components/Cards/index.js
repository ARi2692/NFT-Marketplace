import "./card.css";
import { ethers } from "ethers"

const Cards = ({ item, marketplace }) => {
    
  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
  };

  return (
    <div className="productList">
      <div key={item.id} className="productCard">
        <img src={item.image} alt="product-img" className="productImage"></img>
        <div className="productCard__content">
          <h4 className="productName">{item.name}</h4>
          <p>{item.description}</p>
          <button onClick={() => buyMarketItem(item)} className="button-buy">
          Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
        </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
