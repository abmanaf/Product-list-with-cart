import React, { useState } from 'react';
import data from './data/data.json';
import Modal from './Modal';

function App() {
  const [cartCounts, setCartCounts] = useState(new Array(data.length).fill(0)); 
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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
const handleRemoveItem = (index) => {
  const newCartCounts = [...cartCounts];
  newCartCounts[index] = 0;
  setCartCounts(newCartCounts);

  setSelectedProductIds(selectedProductIds.filter(id => id !== index));
};
const totalOrderPrice = cartCounts.reduce((acc, count, index) => acc + count * data[index].price, 0);

const handleSubmitOrder = (e) => {
  e.preventDefault()
  setShowModal(true)
  setOrderPlaced(true);
  //setCartCounts([])

}
const selectedProducts = data.filter((_, index) => cartCounts[index] > 0);

const handleModalClose = () => {
  setShowModal(false);
  setOrderPlaced(false);
  setCartCounts(new Array(data.length).fill(0)); 
  setSelectedProductIds([]);
}
  return (
    <div>
      <div className='flex justify-center w-full items-start'>
        <div className='flex flex-col justify-center' style={{ width: '75%' }}>
          <h1 className='font-bold text-3xl mb-5'>Desserts</h1>
          <div className='flex flex-wrap gap-7 w-full relative'>
            {data.map((product, index) => (
              <ul key={index}>
                <li>
                  <img className={`list ${cartCounts[index] > 0  ? "  outline outline-2 outline-orange-500 " : ""} w-64 rounded-xl`} src={product.image.desktop} alt={product.name} />
                  
                    {cartCounts[index] > 0 ? (
                      <div className={`list ${cartCounts[index] > 0 ? "bg-orange-500 " : "bg-white"} border hover:bg-orange-500  w-fit flex justify-center items-center text-center mx-auto gap-7 rounded-2xl px-4 py-2`}>
                       <div onClick={() => handleDecrease(index)} className='outline p-1 w-5 text-center group cursor-pointer flex justify-center items-center h-5 outline-2 outline-white  rounded-full'>
                        <img  className='text-red-600 border rounded-lg hover:text-orange-500' src="./assets/images/icon-decrement-quantity.svg" alt="decrease" />
                        </div>
                        <span className='text-white'>{cartCounts[index]}</span>
                        <div onClick={() => handleIncrease(index)}  className='flex  outline p-1 w-5justify-center h-5 outline-white  cursor-pointer rounded-full items-center'>
                        <img  className='text-red-600' src="./assets/images/icon-increment-quantity.svg" alt="increase" />
                      </div>
                      </div>
                    ) : (
                      <>
                      <button
                        onClick={() => handleAddToCart(index)}
                        className={`list ${cartCounts[index] > 0 ? "bg-orange-500 " : "bg-white"} border border-transprent transition-all duration-300 hover:border-orange-500 hover:text-orange-500 flex justify-center items-center text-center mx-auto  rounded-2xl px-4 py-2`}
                      >
                        <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart" />
                           Add to Cart
                        </button>
                      </>

                    )}
                  <div className='mt-3'>
                    <p style={{ opacity: '0.7' }}>{product.category}</p>
                    <p>{product.name}</p>
                    <p className='text-orange-500 font-bold'>${product.price.toFixed(2)}</p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg h-auto' style={{ width: '30%' }}>
          <h1 className='text-orange-500 font-bold mb-6'>
            Your Cart ({cartCounts.reduce((acc, count) => acc + count, 0)})
          </h1>
          {cartCounts.every(count => count === 0) ? (
            <div className='text-center'>
              <img className='mx-auto' src="./assets/images/illustration-empty-cart.svg" alt="empty cart" />
              <p>Your added items will appear here</p>
            </div>
          ) : (
            <div className='divide-y-2'>
              {data.map((product, index) => 
                cartCounts[index] > 0 && (
                  <div className='divide-y-2  mb-4'>
                  <div key={index} >
                    <p>{product.name}</p>
                    <div className='flex justify-between items-center'>
                      <div className='flex justify-between gap-3'>
                      <span>x{cartCounts[index]}</span>
                      <span>@ ${product.price}</span>
                      <span>${product.price * cartCounts[index].toFixed(2)}</span>
                    </div>
                    <img onClick={() => {handleRemoveItem(index)}} src="./assets/images/icon-remove-item.svg" alt="icon-remove-item" />
                  </div>
                  </div>
                  </div>
                )
              )}
               <div className='flex justify-between  items-center'>
                 <span className='mt-10'>Order Total</span> <span className='mt-10 font-bold text-xl'> ${totalOrderPrice}</span>
              </div>
              <div className='bg-orange-50 flex justify-center mt-10 p-2 gap-1 rounded-lg'>
                <img src="./assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutral" />
                <span>This is a carbon-neutrak delivery</span>
              </div>
              <button className='bg-orange-700 w-full p-3 mt-6 rounded-full text-white' onClick={handleSubmitOrder}>Confirm Order</button>
            </div>
          )}
        </div>
      </div>
      {orderPlaced && (
        <Modal
          show={showModal}
          onClose={handleModalClose}
          selectedProducts={selectedProducts}
          cartCounts={cartCounts}
          totalOrderPrice={totalOrderPrice}
          //setSelectedProduct(null);
        />
      )}
    </div>
  );
}

export default App;
