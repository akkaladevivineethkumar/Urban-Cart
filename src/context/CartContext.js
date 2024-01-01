import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  recentData: [],
  //   allData11: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  recentlyVisted: () => {},
  //   getAllData: () => {},
})

export default CartContext
