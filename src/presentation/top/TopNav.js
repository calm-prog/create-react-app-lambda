import React from 'react'
import mainLogo from '../../shared/UI/main-logo.svg'
import { Link } from 'react-router-dom'


import {AppBar, Toolbar, makeStyles, Box, Typography, Badge} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'


const useStyles = makeStyles((theme)=>({
    
    toolbar:{
        minHeight: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'no-wrap',
        alignItems: 'flex-end',
    },

       
    logobox:{
        alignSelf: 'center',
        height: '80%',
        width: '100px',
        textAlign: 'center'
    },

    logo: {
        height:'100%',
    },

        
    cartbox:{
        display: 'flex',
        height: '90%',
        alignItems: 'center',
        [theme.breakpoints.up('xs')]: {
            width: '10%',
            justifyContent: 'space-around',
        },
        [theme.breakpoints.up('sm')]: {
            width: '30%',
            justifyContent: 'flex-end',
        },
    },

    carticon:{
        color: 'white',
        fontSize: '30px',
    },

    cartprice:{
        position: 'relative',
        right: '20px',
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    }
    
}))

const TopNav = (props) => {
    const cart = props.cart;
    
    const [ totalItem, totalPrice ] = cart.getCartDetails()

    const classes = useStyles()

    // -------- PREZENTATIONAL LOGIC ------------ //

    let totalPriceText = "DKK " + totalPrice;
    if(totalPriceText === "DKK " + 0) {
        totalPriceText = null
    }   
   
    return(
    <React.Fragment> 
        <AppBar position="static">
            <Toolbar className = {classes.toolbar}> 

                <Box className = {classes.logobox}>
                    <Link to="/"><img src={mainLogo} className={classes.logo}/></Link>
                </Box>

                <Box className = {classes.cartbox}>
                    <Typography className = {classes.cartprice}> {totalPriceText} </Typography>
                    
                    <Badge badgeContent={totalItem} color='secondary'>
                        <Link to="/cart">
                            <ShoppingCartIcon className = {classes.carticon}/>
                        </Link>
                    </Badge>
                    
                </Box>
            </Toolbar>
        </AppBar>
    </React.Fragment>
    )
}

export default TopNav

