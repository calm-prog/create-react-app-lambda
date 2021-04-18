//libraries and stylesheet
import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

//components
import TopNav from './presentation/top/TopNav'
import SearchForm from './presentation/top/SearchForm'
import SearchResults from './presentation/middle/search/SearchResults'
import ErrorMessageContainer from './container/ErrorMessageContainer'
import DescriptionContainer from './container/DescriptionContainer'
import Cart from './presentation/middle/cart/Cart'
import ServiceDesc from './presentation/middle/main/ServiceDesc'
import Checkout from './presentation/middle/checkout/Checkout'
import CartClass from './shared/logic/CartClass.js'
import Confirmation from './presentation/middle/confirmation/Confirmation'

// Initilazes App state object
const initState = { 
  errMsg: [],
  searchResults: [],
  autocompleteSuggestions: [],
  cart: new CartClass(),
  shouldFetch: false,
}



// Global action store
const reducer = (state, action) => {
  const { payload } = action;
  const cart = {...state.cart};

  switch(action.type) {

    case 'editCart':
      let newcart = new CartClass(cart)
      newcart.editCart(payload.ID, payload)
      return {...state, cart: newcart}
    case 'resetCart':
      return {...state, cart: new CartClass()}
    case 'setSearchResults':
      return { ...state, searchResults: payload.data, autocompleteSuggestions: payload.data }
    case 'setAutocomplete':
      return { ...state, autocompleteSuggestions: [...state.searchResults].filter(v => payload.regex.test(v.name)) }
    case 'resetAutocomplete':
      return { ...state, autocompleteSuggestions: [] }
    case 'noChange':
      return {...state}
    default:
      throw new Error('none of the actions were called in the reducer')
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initState);
  const globalDispatch = dispatch;

  return (
    <Router>
        <div className="main-content">
          <TopNav cart={state.cart} />

          <SearchForm dispatch={globalDispatch} />
          <Switch>
            {/* ------------ MAIN PAGE ------------ */}
            <Route exact path="/" render={props => (
                <React.Fragment>
                  {/* <MainCategories /> */}
                  <ServiceDesc textArray={["Bring world cuisine to your kitchen", 
                                          "Order authentic ingredients from local businesses...",
                                          "... And pick them up from a store near you"]}/>
                </React.Fragment>
            )}/>
            {/* ----------- SEARCH PAGE ----------- */}
            <Route path="/search" render={props => (
              <React.Fragment>
                { state.autocompleteSuggestions.length !== undefined
                ? (<SearchResults  autocompleteSuggestions={state.autocompleteSuggestions}
                                   dispatch={globalDispatch}
                                   cart={state.cart} />) 
                : (<ErrorMessageContainer specialChar={state.errMsg} />) }
              </React.Fragment>
            )}/>
            {/* --------- DESCRIPTION PAGE --------- */}
            <Route path="/description/:id" render={props => (
              <React.Fragment>
                <DescriptionContainer dispatch={globalDispatch}
                                      cart={state.cart}
                                      pathname={props.location.pathname} />
              </React.Fragment>
            )} />
            {/* ------------ CART PAGE ------------ */}
            <Route path="/cart" render={props => (
              <React.Fragment>
                <Cart cart={state.cart} 
                      dispatch={globalDispatch} />
              </React.Fragment>
            )} /> 
            {/* ------------ CHECKOUT PAGE ------------ */}
            <Route path="/checkout" render={props => (
              <React.Fragment>
                <Checkout cart={state.cart}
                          dispatch={globalDispatch}
                />
              </React.Fragment>
            )} /> 
            {/* ------------ CHECKOUT PAGE ------------ */}
            <Route path="/confirmation" render={props => (
              <React.Fragment>
                <Confirmation cart={state.cart}/>
              </React.Fragment>
            )} /> 
          </Switch>
        </div>

    </Router>
  );
}

export default App
