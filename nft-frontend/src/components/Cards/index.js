import {  FaStar } from 'react-icons/fa';
import {AiOutlineFire, AiOutlineShoppingCart } from 'react-icons/ai'
import './card.css'

const Cards = (props) => {
     return(
         <div className='productList'>
             <div key={props.id} className='productCard'>
                 <img src={props.image} alt='product-img' className='productImage'></img>
                 <AiOutlineShoppingCart className={"productCard__cart"} />
                 <AiOutlineFire className={"productCard__fastSelling"} />
                 <div className='productCard__content'>
                     <h4 className='productName'>{props.name}</h4>
                     <div className='displayStack__1'>
                         <div className='productPrice'>${props.price}</div>
                         <div className='productSales'>{props.totalSales} units sold</div>
                     </div>
                     <div className='displayStack__2'>
                         <div className='productRating'>
                             {[...Array(props.rating)].map((index) => (
                                 <FaStar id={index + 1 } key={index} />
                             ))}
                         </div>
                         <div className='productTime'>{props.timeLeft} days left</div>
                     </div>
                 </div>
             </div>
         </div>
     )
 }

 export default Cards