import React, { useState } from 'react';
import data from './data/data.json';

function App() {
  const [cartCounts, setCartCounts] = useState(new Array(data.length).fill(0)); 
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleAddToCart = (index) => {
    const newCartCounts = [...cartCounts];
    newCartCounts[index] += 1; 
    setCartCounts(newCartCounts); 
    
    if (!selectedProductIds.includes(index)) {
      setSelectedProductIds([...selectedProductIds, index]);
    }
  };
  const handleIncrease = (index) =>{
    const newCartCounts = [...cartCounts]
    newCartCounts[index] += 1;
    setCartCounts(newCartCounts)
  }
  const handleDecrease = (index) => {
    const newCartCounts = [...cartCounts]
    if (newCartCounts[index] > 0) {
      newCartCounts[index] -= 1;
    }
    setCartCounts(newCartCounts);
}

  return (
    <div>
      <div className='flex justify-center w-full items-start gap-1'>
        <div className='flex flex-col justify-center' style={{ width: '75%' }}>
          <h1 className='font-semibold text-2xl'>Desserts</h1>
          <div className='flex flex-wrap gap-7 w-full relative'>
            {data.map((product, index) => (
              <ul key={index}>
                <li>
                  <img className={`list ${cartCounts[index] > 0  ? "  outline outline-2 outline-orange-500 " : ""} w-64 rounded-xl`} src={product.image.desktop} alt={product.name} />
                  
                    {cartCounts[index] > 0 ? (
                      <div className={`list ${cartCounts[index] > 0 ? "bg-orange-500 " : "bg-white"} border hover:bg-orange-500  w-fit flex justify-center items-center text-center mx-auto gap-7 rounded-2xl px-4 py-2`}>
                       <div  className='outline p-1 w-5 text-center flex justify-center items-center h-5 outline-2 outline-white  rounded-full'>
                        <img onClick={() => handleDecrease(index)} className='text-red-600 border rounded-lg' src="./assets/images/icon-decrement-quantity.svg" alt="decrease" />
                        </div>
                        <span className='text-white'>{cartCounts[index]}</span>
                        <div  className='flex  outline p-1 w-5justify-center h-5 outline-white rounded-full items-center'>
                        <img onClick={() => handleIncrease(index)} className='text-red-600' src="public/assets/images/icon-increment-quantity.svg" alt="increase" />
                      </div>
                      </div>
                    ) : (
                      <>
                      <button
                        onClick={() => handleAddToCart(index)}
                        className={`list ${cartCounts[index] > 0 ? "bg-orange-500 " : "bg-white"} border hover:bg-orange-500 flex justify-center items-center text-center mx-auto  rounded-2xl px-4 py-2`}
                      >
                        <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" />
                           Add to Cart
                        </button>
                      </>

                    )}
                  <div>
                    <p style={{ opacity: '0.7' }}>{product.category}</p>
                    <p>{product.name}</p>
                    <p className='text-orange-500'>${product.price}</p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg h-60' style={{ width: '25%' }}>
          <h1 className='text-orange-500 font-bold'>
            Your Cart ({cartCounts.reduce((acc, count) => acc + count, 0)})
          </h1>
          {cartCounts.every(count => count === 0) ? (
            <div className='text-center'>
              <img className='mx-auto' src="./assets/images/illustration-empty-cart.svg" alt="empty cart" />
              <p>Your added items will appear here</p>
            </div>
          ) : (
            <div>
              {data.map((product, index) => 
                cartCounts[index] > 0 && (
                  <div key={index}>
                    <p>{product.name} x {cartCounts[index]}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
