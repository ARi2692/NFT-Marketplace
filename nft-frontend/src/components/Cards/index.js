import { FaStar } from "react-icons/fa";
import { AiOutlineFire, AiOutlineShoppingCart } from "react-icons/ai";
import "./card.css";
import { ethers } from "ethers"
import Button from "../../common/button";

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
        <AiOutlineShoppingCart className={"productCard__cart"} />
        <AiOutlineFire className={"productCard__fastSelling"} />
        <div className="productCard__content">
          <h4 className="productName">{item.name}</h4>
          <h1>{item.description}</h1>
          <Button
            btnType="SECONDARY"
            btnText="Create"
            customClass="tf-left-secondary-btn"
            onClick={() => buyMarketItem(item)}
          >
            Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
          </Button>
          {/* <div className='displayStack__1'>
                         <div className='productPrice'>${item.totalPrice}</div>
                     </div> */}
          {/* <div className='productSales'>{item.totalSales} units sold</div> */}
          {/* <div className='displayStack__2'>
                         <div className='productRating'>
                             {[...Array(item.rating)].map((index) => (
                                 <FaStar id={index + 1 } key={index} />
                             ))}
                         </div>
                         <div className='productTime'>{item.timeLeft} days left</div>
                     </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
