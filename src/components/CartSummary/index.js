import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(items => {
        total += items.price * items.quantity
      })
      return (
        <div>
          <h1>
            Order Total: <span>Rs {total}</span>
          </h1>
          <p>
            {cartList.length}
            <span>Items in cart</span>
          </p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
