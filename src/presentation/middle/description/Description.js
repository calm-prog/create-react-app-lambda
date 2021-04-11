import React from 'react'
import { Link } from 'react-router-dom'
import './Description.css'
import ErrorMessage from '../../../shared/UI/ErrorMessage'
import QuantityWidget from '../../../shared/UI/QuantityWidget';

import {Grid, Box, makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme)=>({

    image_container:{
        
        // backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:300,
        minWidth:300,
        wrap:'wrap'
    },

    image:{
        maxWidth: 300,
        maxHeight: 300,
    },

    info_container:{
        
    },

    
    prod_title:{
        // backgroundColor:'green', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 110,
        [theme.breakpoints.down('xs')]: {
            minHeight: 120,
        }
        
        
    }, 

}))



const Description = (props) => { 
        

    const classes = useStyles()

    if(Object.keys(props.contents).length !== 0) {
        const { id, name, price, location, ImageFile, cartLink, description } = props.contents;
        
        const {cart, cartDispatch} = props;
        //className={{display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'red'}}
        return (
            <React.Fragment>
                <Grid container justify='space-around' wrap='wrap' spacing={3}> 
                    {/* // Image ----------------------------------------------------------------------------- */}
                    <Grid item xs={12} md={6} justify="center">
                        <Box className ={classes.image_container}>
                            <img className={classes.image} src={'../../../' + ImageFile}/>
                        </Box>
                    </Grid>
                    
                    <Grid item container xs={12} md={6} spacing={5} direction='column'>
                        
                        {/* // Basic product info -------------------------------------------------------------------------- */}
                        <Grid item className={classes.prod_title}>
                                <Typography variant='h4'>{name}</Typography>
                                <Typography variant='h5' color='secondary'>{price.toString()+' DKK'} </Typography>
                        </Grid>
                        {/* // Quantity widget------------------------------------------------------------------------- */}
                        <Grid container item spacing={3}>
                            <Grid item xs={12}>
                                <QuantityWidget cart = {cart}
                                                cartDispatch = {cartDispatch}
                                                itemInfo = {{id, price, cartLink}}
                                                width = {200}/>
                            </Grid>
                            {/* // Shop info--------------------------------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Typography variant='body2' color='secondary'> Sold by Jensen's Market, Copenhagen. </Typography>
                                <Typography variant='body2'> You will choose a pickup location at checkout </Typography>
                            </Grid>
                        </Grid>
                        {/* // Product description------------------------------------------------------------------------------ */}
                        <Grid container item spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant='h6'> Product description </Typography>
                            </Grid>
                            {/* //------------------------------------------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Typography variant='body1'> {description} </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                    
                    

                </Grid>
                
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <ErrorMessage errMsg="Unfortunately, we can not find the page that you are looking for"/> 
                <Link to="/"><p className="redirect-to-landing-page">Go back to the main page</p></Link>
            </React.Fragment>
        )
    }
    
}

export default Description
