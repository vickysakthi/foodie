import React, { createContext, useContext, useEffect, useState } from 'react'
// import { sample_foods } from '../data';

const CartContext = createContext(null)
const CART_KEY = "Cart";
const EMPTY_CART= {
  items: [],
  totalPrice: 0,
  totalCount: 0
}


export default function CartProvider({children}) {
 const initCart = getCartLocalStorage(); 
 const [cartItems,setCartItems] = useState(initCart.items);
 const [totalPrice,setTotalPrice] = useState(initCart.totalPrice);
 const [totalCount,setTotalCount] = useState(initCart.totalCount); 

 useEffect(() => {
     const totalPrice = sum(cartItems.map(item => item.price));
     const totalCount = sum(cartItems.map(item => item.quantity));
     setTotalPrice(totalPrice);
     setTotalCount(totalCount);

     localStorage.setItem(
      CART_KEY, 
      JSON.stringify({
      items:cartItems,
      totalPrice,
      totalCount,
     }))
 },[cartItems]);
 
 function getCartLocalStorage(){
  const storedCart = localStorage.getItem(CART_KEY);
  try{
    return storedCart? JSON.parse(storedCart):  EMPTY_CART;
  }catch(error){
    console.error('Error parsing stored cart;',error)
    return EMPTY_CART;
  }
  // console.log('Stored cart:', storedCart);
  
 }

 const sum = items =>{
   return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
 };
 
 const removeFromCart = foodId =>{
   const filteredCartItems = cartItems.filter(item => item.food.id !== foodId)
   setCartItems(filteredCartItems)
 };

 const changeQuantity = (cartItem, newQuantity) =>{
   const {food}= cartItem;

   const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price *newQuantity
   };

   setCartItems(
      cartItems.map(item =>item.food.id === food.id ?changedCartItem : item)
   )
 }

 const addToCart = (food) =>{
   const cartItem = cartItems.find((item) => item.food.id === food.id);
   if(cartItem){
      changeQuantity(cartItem, cartItem.quantity + 1);
    }else{
      setCartItems([...cartItems, {food,quantity:1, price: food.price}]);
    }
 };
    return (
 
        <CartContext.Provider 
           value={{cart: { item: cartItems, totalPrice, totalCount},
           removeFromCart,
           changeQuantity,
           addToCart
           }}>
            {children}
        </CartContext.Provider>
     )
}

export const useCart = () =>useContext(CartContext);