import React, { useEffect, useState } from 'react';
import Description from '../presentation/middle/description/Description'


const DescriptionContainer = (props) => {
    // ---- URL location ---------------------- //
    let regex = /(?<=description\/).*/;
    let productLink = props.pathname.match(regex)[0];

    console.log(productLink)
    
    let cart = props.cart

    // States
    const [contents, setContents] = useState({});
   
    useEffect(()=>{
        
        async function fetchData() {
            let res = await fetch(`/${productLink}`, {method: 'GET'});
            let json = await res.json();
            let data = await json.data;
            
            setContents(data)

            return true
        }

        fetchData();

    },[productLink])
    

    
    return (
        <Description contents={contents}
                     cart={cart}
                     cartDispatch={props.dispatch}
                     />
    ) 
}

export default DescriptionContainer;
