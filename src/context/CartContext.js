import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  recentData: [],
  activeCat: '',
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  recentlyVisted: () => {},
  getActiveCat: () => {},
})

export default CartContext
