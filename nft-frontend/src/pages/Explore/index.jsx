import React from 'react'
import Cards from '../../components/Cards'
import './explore.css'
import contents from './content';

 export default function Explore() {
     return(
        <>
            <span className='header absolute-center header-gradient'> Trending NFTS </span>
            <div className='explore-cards'>
                {contents.map(contents => (
                    <Cards 
                        key={contents.id}
                        image={contents.image}
                        name={contents.name}
                        price={contents.price}
                        totalSales={contents.totalSales}
                        timeLeft={contents.timeLeft}
                        rating={contents.rating}
                    />
                ))}
            </div>
            <span className='header absolute-center header-gradient'> Your NFTS </span>
            <div className='explore-cards'>
                {contents.map(contents => (
                    <Cards 
                        key={contents.id}
                        image={contents.image}
                        name={contents.name}
                        price={contents.price}
                        totalSales={contents.totalSales}
                        timeLeft={contents.timeLeft}
                        rating={contents.rating}
                    />
                ))}
            </div>
        </>
     )
 }