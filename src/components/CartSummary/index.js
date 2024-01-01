import Popup from 'reactjs-popup'
import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = event => {
    setSelectedPayment(event.target.value)
  }

  const onClickConfirm = () => {
    setOrderPlaced(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(items => {
          total += items.price * items.quantity
        })

        return (
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total: </span>Rs {total}
              /-
            </h1>
            <p className="total-items">
              {cartList.length}
              Items in cart
            </p>
            <Popup
              modal
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
              className="popup-content"
              contentStyle={{
                background: 'rgba(255, 255, 255,0.8)',
                bottom: '-250px',
                top: '180px',
              }}
            >
              {close => (
                <div className="modalsContainer">
                  <select
                    value={selectedPayment}
                    onChange={handlePaymentChange}
                    className="modalDesc"
                  >
                    <option value="" disabled>
                      Select Payment Method
                    </option>
                    <option value="Card">Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  <p className="total-items">
                    {cartList.length}
                    Items in cart
                  </p>
                  <h1 className="order-total-value">
                    <span className="order-total-label">Order Total: </span>Rs
                    {total}/-
                  </h1>
                  <div className="buttonsContainer">
                    <button
                      className="closeButton"
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>

                    <button
                      className="confirmButton "
                      type="button"
                      onClick={onClickConfirm}
                      disabled={selectedPayment === 'Cash on Delivery'}
                    >
                      Confirm Order
                    </button>
                  </div>
                  {orderPlaced && (
                    <p>Your order has been placed successfully</p>
                  )}
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
