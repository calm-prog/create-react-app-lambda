import React, { useEffect, useState } from 'react';
import Description from '../presentation/middle/description/Description'
import firebase from '../firebase'


const DescriptionContainer = (props) => {
    // ---- URL location ---------------------- //
    let regex = /(?<=description\/).*/;
    let productID = props.pathname.match(regex)[0];
    const ref = firebase.firestore().collection("data").doc(productID)
    
    let cart = props.cart

    // States
    const [contents, setContents] = useState({});
   
    useEffect(()=>{
        
        // async function fetchData() {
            ref.onSnapshot((querySnapshot) => {
                setContents(querySnapshot.data());
            })
    },[productID])
    

    
    return (
        <Description contents={contents}
                     cart={cart}
                     cartDispatch={props.dispatch}
                     />
    ) 
}

export default DescriptionContainer;
