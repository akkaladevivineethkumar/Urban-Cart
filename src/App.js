import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    recentData: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(items => {
          if (items.id === product.id) {
            const updatedQuantity = items.quantity + product.quantity
            return {...items, quantity: updatedQuantity}
          }
          return {items}
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(items => items.id !== id)
    this.setState({cartList: filteredCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(items => {
        if (items.id === id) {
          const updateQty = items.quantity + 1
          return {...items, quantity: updateQty}
        }
        return items
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(items => items.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(items => {
          if (items.id === id) {
            const updateQty = items.quantity - 1
            return {...items, quantity: updateQty}
          }
          return items
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  recentlyVisted = data => {
    const {recentData} = this.state

    // Check if the item with the same id already exists in recentData
    const isUnique = recentData.every(item => item.id !== data.id)

    if (isUnique) {
      // If the item is unique, update the state
      this.setState(prev => ({
        recentData: [...prev.recentData, data],
      }))
    }
  }

  render() {
    const {cartList, recentData} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          recentlyVisted: this.recentlyVisted,
          //   getAllData: this.getAllData,
          recentData,
          //   allData11,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
