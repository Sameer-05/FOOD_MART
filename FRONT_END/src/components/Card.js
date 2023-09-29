import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer'; // Adjust the import path based on your project structure

export default function Card(props) {
  const dispatch = useDispatchCart();
  const cartData = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  const handleAddCart = () => {
    const newItem = {
      id: props.foodItem._id,
      name: props.foodItem.name,
      size: size,
      qty: qty,
      price: options[size],
    };
   


    const existingItemIndex = cartData.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );
    if (existingItemIndex !== -1) {
      // Item already exists, update the quantity
      const updatedCartData = [...cartData];
      updatedCartData[existingItemIndex].qty += qty; // Update quantity
      dispatch({ type: 'UPDATE', index: existingItemIndex, payload: updatedCartData[existingItemIndex] });
    } else {
      // Item does not exist, add it to cart
      dispatch({ type: 'ADD_TO_CART', payload: newItem });
    }
    
    // Reset quantity and size for the next selection
    setQty(1);
    setSize(priceOptions[0]);
  };

  return (
    <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ height: '160px', objectFit: 'fill' }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>

        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(parseInt(e.target.value))}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setSize(e.target.value)}
            value={size}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="fs-5 d-inline">Total price: {options[size] * qty}</div>
        </div>
        <hr />

        <button
          className="btn btn-success ms-2 justify-center"
          onClick={handleAddCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
