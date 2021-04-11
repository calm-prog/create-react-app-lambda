import React, {useEffect, useRef, useState} from 'react'
import './Checkout.css'
import Confirmation from '../confirmation/Confirmation'

import useCartFetch from '../../../shared/logic/useCartFetch';
import {Link} from 'react-router-dom'
import Form from '../../../shared/UI/Form'
import useForm from '../../../shared/logic/useForm'

const Checkout = (props) => {

    /* -------------- PROPS, STATES, INIT DATA ------------------------- */
    const cart = props.cart;
    const [contents, setContents] = useState({});
    useCartFetch(cart.state, contents, setContents);
    const [ totalItem, totalPrice ] = cart.getCartDetails();
    const cartItems = Object.entries(cart.state);
    const [submitted, setSubmitted] = useState(false);

    const checkoutFormFields = [
        {tag: 'custom', tagType: 'h2', content: 'MY INFO'},
        {name: 'name', tag: 'input', type: 'text'},
        {name: 'email', tag: 'input', type: 'text'},
        {tag: 'custom', tagType: 'h2', content: 'PICKUP LOCATION'},
        {name: 'store', tag: 'select', options: ['store1', 'store2', 'store3', 'store4', 'store5']},
        {tag: 'custom', tagType: 'h2', content: 'PAYMENT INFORMATION'},
        {name: 'card', tag: 'input', type: 'tel'}
    ];

    const checkoutKeyUrl = '/api/checkoutkey';

    const [checkoutFormState, updateCheckoutFormState, encryptCheckoutFormData] = useForm(checkoutFormFields, checkoutKeyUrl);
    
    /* --------------- POSTS CHECKOUT FORM DATA ----------------------- */
    const postCheckoutFormData = async() => {
        let data = await encryptCheckoutFormData();

        fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({form: data, cart: cart.state}),
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(setSubmitted(true));
    }

    /* ------------------ PRESENTATION LOGIC ------------------------- */

    if ((Object.keys(contents).length === 0) || (Object.keys(cart).length === 0)) {
        return <div style={{textAlign: "center", fontSize: "1.3em"}}>This page is currently not available</div>
    } else if(!submitted) { 

    /* ----------------------- UI ------------------------------------ */
        return(
            <React.Fragment>
                <div className="cart-info">
                    <div className="cart-summary">
                        <table>
                            <tbody>
                                <tr>
                                    <th>IMG</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                </tr>
                                {cartItems.map((item) => (
                                    <tr key={contents[item[0]].id}>
                                        <td><img src={contents[item[0]].ImageFile} alt="cart item image"/></td>
                                        <td>{contents[item[0]].name}</td>
                                        <td>{contents[item[0]].price}</td>
                                        <td>{item[1].quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="price-total">
                        <div>TOTAL SUM:</div>
                        <div>{totalPrice}</div>
                    </div>
                </div>
                <div className="checkout-form">
                    <Form 
                        formFields={checkoutFormFields}
                        formState={checkoutFormState}
                        updateFormState={updateCheckoutFormState}
                    />
                </div>
                <div className="checkout-nav">
                    <Link to="/cart" style={{ textDecoration: 'none' }}><div className="back-to-cart-btn checkout-nav-btn">BACK TO CART</div></Link>
                    <div className="pay-btn checkout-nav-btn" 
                         onClick={() => postCheckoutFormData()}>PAY
                    </div>
                </div>
            </React.Fragment>
        )
    } else {
        return(
            <Confirmation
                name={checkoutFormState.name}
                store={checkoutFormState.store}
            /> 
        )
    }
}

export default Checkout