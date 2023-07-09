import React from 'react'
import data  from '../data';


function Home() {
  return (
    <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.slug}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
  )
}

export default Home