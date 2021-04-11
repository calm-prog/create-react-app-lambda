import React from 'react'
import './CartSummary.css'
import SubmitButton from '../../../shared/UI/SubmitButton'
import {Link} from 'react-router-dom'

const CartSummary = (props) => {
    const { totalItem } = props;
    const totalPrice = props.totalPrice;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.dispatch({type: 'resetCart'})
    }

    return (
        <React.Fragment>
            <div className="item-summary cart-sum-padding">
                <div className="items-total">{totalItem} ITEM</div>
                <form className="empty-cart-form" onSubmit={handleSubmit}>
                    <button type="submit" className="empty-cart" ><span>EMPTY CART</span></button>
                </form>
            </div>
            <div className="divider cart-sum-padding"></div> 
            <div className="total-sum cart-sum-padding">
                <span>TOTAL SUM:</span>
                <span>{totalPrice} DKK</span>
            </div>
            <Link to="/checkout">
                <SubmitButton  text="GO TO CHECKOUT" className="cart-sum-padding"/>
            </Link>
        </React.Fragment>
    )
}

export default CartSummary