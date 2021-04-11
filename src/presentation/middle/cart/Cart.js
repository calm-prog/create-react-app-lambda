import React, { useEffect, useState } from 'react';
import './Cart.css'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import firebase from '../../../firebase'

const Cart = (props) => {
    const cart = props.cart;

    const [ contents, setContents ] = useState({});
    // useCartFetch(cart.state, contents, setContents);
    const [ totalItem, totalPrice ] = cart.getCartDetails();
    const cartItems = Object.entries(cart.state);
    const ref = firebase.firestore().collection("data")

    console.log(contents);
    console.log(cartItems);

    useEffect(() => {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
                console.log(items);
            });

            setContents(items);
        })
    }, [cart])

    if (!cartItems.length || !contents.length) {
        
        return <div style={{textAlign: "center", fontSize: "1.3em"}}>There are no items in your cart.</div>
    } else {

        return (
            <div className="container"> 
                <div className="cart-title">YOUR CART</div>
                <div className="cart-sections-wrapper">
                    <div className="cart-items-wrapper">
                        {cartItems.map(cartItem => {
                            console.log(cartItem);
                            console.log(contents);
                            console.log(parseInt(cartItem[0]));
                            return (
                            <CartItem 
                            key={cartItem[0]}
                            cart = {cart}
                            uItem={contents.find(item => item.id === cartItem[0])}
                            dispatch={props.dispatch}
                            quantity={cartItem[1].quantity}
                            />
                        )})}
                    </div>
                    <div className="cart-summary-wrapper">
                        <CartSummary 
                            totalItem={totalItem}
                            totalPrice={totalPrice}
                            dispatch={props.dispatch}
                            />
                    </div>
                </div>
            </div>
        )
    } 
}

export default Cart