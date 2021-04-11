import React,{useState,useEffect} from 'react'

import {Box,Button, makeStyles, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DeleteIcon from '@material-ui/icons/Delete'
import CartIcon from '@material-ui/icons/AddShoppingCart';




//--------------------------------------------------------------------------------------------------------------------------------------
const QuantityWidget = function(props){

    

    const {cart, cartDispatch, itemInfo, width} = props

    const styles = useStyles(props)

    const {id, price, cartLink} = itemInfo

    const [quantity, setState] = useState(0)

    
    // console.log(styles.container) //, {width: widgetWidth.toString + 'px'})
    
    //--------------------------------------------------------------------
    const setQuantity = (num) => {

        let num_adj = Math.max(0,num)
        cartDispatch({type: 'editCart', 
                    payload: {ID: id, quantity: num_adj, link: cartLink, price: price}}) 
        setState(num_adj)  
    }

    //--------------------------------------------------------------------
    useEffect(()=>{
        
        if (id in cart.state){
            setQuantity(cart.state[id].quantity)
        }

    },[])

    //---------------------------------------------------------------------
    const drawSmallButton = function (Icon, fun){

        return(
            <Button variant = 'contained' 
                    size = 'small' 
                    color='primary' 
                    className = {styles.buttons}
                    onClick = {fun}>
                {React.createElement(Icon)}
            </Button>        
        )
    }

    //--------------------------------------------------------------------
    const drawQuantityAdjuster = function(){
        return(
            <Box className={styles.container}>

                {(quantity > 1) ? drawSmallButton(RemoveIcon, ()=>{setQuantity(quantity-1)})
                                  : drawSmallButton(DeleteIcon, ()=>{setQuantity(quantity-1)})}

                <TextField value = {quantity} 
                           inputProps={{ style: {textAlign: 'center', height: '100%', fontSize: 20} }}
                           className = {styles.textBox}
                           margin = 'none'
                           onChange={(e)=>{
                               let num = parseInt(e.target.value,10)
                               let numIsInteger = !isNaN(num) && (num === Math.round(num))
                               if (numIsInteger){
                                setQuantity(num) 
                               }}}
                />

                {drawSmallButton(AddIcon, ()=>{setQuantity(quantity+1)})}
            </Box>
        )
        
    }
    //-------------------------------------------------------------------
    const drawAddtoCartButton = function(){
        return(
            <Box className={styles.container}>
                <Button variant = 'contained' 
                        size = 'large' 
                        color='primary' 
                        className={styles.cartButton}
                        onClick={()=>{setQuantity(1)}}
                        >
                    <CartIcon />
                </Button>        
            </Box>
        )
    }

    //--------------------------------------------------------------------

    return(
        <React.Fragment>
            {(quantity === 0)? drawAddtoCartButton() : drawQuantityAdjuster()}
        </React.Fragment>
    )
}

// CSS SETTINGS -------------------------------------------------------------
const max_height = 40
const min_height = 40

const min_text_width = 50

const min_width = min_text_width + 2*min_height
const max_width = 200

//--------------------------------------------------------------------

const getTotalWidth = (width) =>{

    if (width != null){

        return (width > max_width)? max_width : ((width < min_width)? min_width: width)

    }else{
        return min_width
    }

}

//--------------------------------------------------------------------
const getHeight = (width) =>{

    let w = getTotalWidth(width)
    return Math.min((w - min_text_width)/2, max_height)
}

const useStyles = makeStyles((theme)=>({
    container:{
        display: 'flex',
        justifyContent: 'center',
        width: props => (getTotalWidth(props.width)),
    },
    buttons:{
        minWidth: min_height,
        width: props => (getHeight(props.width)),
        height: props => (getHeight(props.width)),
        padding: 0
    },
    textBox:{
        height: props => (getHeight(props.width)),
    },
    cartButton:{
        width: '100%',
        height: props => (getHeight(props.width)),
        padding: 0
    },
    
}))


export default QuantityWidget
