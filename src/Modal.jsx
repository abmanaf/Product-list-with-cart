import React from "react";
import data from './data/data.json';
import "./Modal.css";


function Modal({ show, onClose, selectedProducts, cartCounts, totalOrderPrice }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content w-[450px] p-6 rounded-lg my-10 mt-5 mb-5">
        <div style={{ textAlign: "start" }} >
            <img className="w-10" src="./assets/images/icon-order-confirmed.svg" alt="icon-order-confirmed" />
            <h1 className="text-3xl font-bold mt-4 mb-2">Order confirmed</h1>
            <p className="mb-6 text-red-800">We hope you enjoy your food!</p>
            <div className="bg-orange-50 py-5 rounded-lg">
                {selectedProducts.map((product) => {
                    const originalIndex = data.findIndex((item) => item.name === product.name); 
                        return (
                            <div className="flex justify-between items-center  p-2 rounded-lg mb-1" key={product.name}> 
                            <div className="flex items-center  gap-3">
                                <img className="w-10 h-10 rounded-md" src={product.image.thumbnail} alt={product.image.name} />
                                <div className="flex flex-col">
                                <span className="">{product.name}</span>
                                <div className="flex gap-2">
                                    <span className=" text-orange-500">{cartCounts[originalIndex]}x</span>  
                                    <span className="text-red-900">@ ${product.price.toFixed(2)}</span>
                                </div>
                                </div>
                            </div>
                            <div>
                                <span className="text-red-900 font-semibold">${(cartCounts[originalIndex] * product.price).toFixed(2)}</span>  
                            </div>
                            </div>
                        );
                    })}
                     <div className="flex justify-between items-center px-2 mt-5">
                        <span className="font-bold">Order Total</span>
                        <span className="font-bold">${totalOrderPrice.toFixed(2)}</span>
                    </div>
                </div>
        </div>
        <div
          className="modal-button"
          style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <button
            onClick={onClose}
            className="modal-button bg-orange-700 w-full rounded-full"
          >
            Start new Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
