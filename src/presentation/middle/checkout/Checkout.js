import React, {useEffect, useRef, useState} from 'react'
import './Checkout.css'
import Confirmation from '../confirmation/Confirmation'

// import useCartFetch from '../../../shared/logic/useCartFetch';
import {Link} from 'react-router-dom'
import Form from '../../../shared/UI/Form'
import useForm from '../../../shared/logic/useForm'
import firebase from '../../../firebase'

const Checkout = (props) => {

    /* -------------- PROPS, STATES, INIT DATA ------------------------- */
    const cart = props.cart;
    const [contents, setContents] = useState({});
    // useCartFetch(cart.state, contents, setContents);
    const [ totalItem, totalPrice ] = cart.getCartDetails();
    const cartItems = Object.entries(cart.state);
    const [submitted, setSubmitted] = useState(false);
    const ref = firebase.firestore().collection("data")

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

    if (!cartItems.length || !contents.length) {
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
                                {cartItems.map((item) => {
                                    let content = contents.find(el => el.id === item[0])

                                    return (<tr key={content.id}>
                                        <td><img src={content.ImageFile} alt="cart item image"/></td>
                                        <td>{content.name}</td>
                                        <td>{content.price}</td>
                                        <td>{item[1].quantity}</td>
                                    </tr>
                                )})}
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