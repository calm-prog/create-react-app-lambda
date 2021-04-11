import React, {useEffect, useState } from 'react'
import QuantityWidget from '../../../shared/UI/QuantityWidget';
import './CartItem.css'

const CartItem = (props) => {
            const { uItem, dispatch, quantity, cart} = props;
            const { name, location, price, ImageFile, id } = uItem;

            const totalItemPrice = price * quantity;

            
            return (
            <div className="cart-item-divider">
                <div className="cart-item-wrapper"> 
                    <div className="cart-item-img">
                        <img src={ImageFile} alt=""/>
                    </div>
                    <div className="cart-item-details">
                        <div className="name-loc-wrapper">
                            <div className="name">{name}</div>
                            <div className="location">at {location}</div>
                        </div>
                        <QuantityWidget cart = {cart}
                                    cartDispatch = {dispatch}
                                    itemInfo = {{id, price, undefined}}
                                    width = {200}/>
                    </div> 
                    <div className="cart-item-price"><p>{totalItemPrice} DKK</p></div> 
                </div>
            </div>
            )
        }

export default CartItem
