import {useState} from 'react'
import QuantityWidget from '../../../shared/UI/QuantityWidget'
import {Link} from 'react-router-dom'

import {useTheme, useMediaQuery, Card, CardActionArea, CardActions, CardMedia, Typography, Box,Grid,makeStyles, LinearProgress} from '@material-ui/core'


const useStyles = makeStyles((theme)=>({

    outerContain:{
        justifyContent: 'center',
        display: 'flex',
    },
    
    container:{
        width: '75%',
        [theme.breakpoints.down('sm')]:{
            width: '80%'
        },
        [theme.breakpoints.down('xs')]:{
            width: '100%'
        },
        justifyContent: 'flex-start',
    },

    card_container:{
        margin: '10px 0 10px 0px',
    },
    
    card:{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    cardMedia:{
        paddingTop: '100%',
        width: '100%'
    },
    image: {
        width: "100%",
        position: "absolute",
        top: "10%",
        transition: "1s",
        opacity: "0"
    },
    showImg: {
        opacity: "1"
    },
    loadingAnimation: {
        position: "absolute",
        top: "40%",
        width: "100%",
        padding: "0 20%",
        opacity: "50%",
        transform: "scale(0.8)"
    },
    hide: {
        display: "none"
    },
    test:{backgroundColor:'red', marginTop: 0},
    textbox:{padding: '5% 5% 5% 5%'},
}))



const SearchResults = (props) => { 

    const { autocompleteSuggestions, dispatch, cart } = props;

    const classes = useStyles();
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('xs'));
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
    <Box className = {classes.outerContain}>
        <Grid container spacing={isXS? 2: 4} className = {classes.container}>
            {autocompleteSuggestions.map((searchItem) => (
                <Grid item xs={6} sm={4} md={3} key={searchItem.id} className={classes.card_container}>
                    <Card className = {classes.card}>
                        <CardActionArea> 
                            <Link to={`/description/${searchItem.id}`}
                                  style={{ textDecoration: 'none'}}
                                >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        title={searchItem.name}

                                    >
                                        <img className={classes.image + " " + (imageLoaded && classes.showImg)} src={searchItem.ImageFile} onLoad={() => setImageLoaded(true)}></img>
                                        <div className={classes.loadingAnimation + " " + (imageLoaded && classes.hide)}>
                                            <LinearProgress /><br></br>
                                            <LinearProgress /><br></br>
                                            <LinearProgress />
                                        </div>

                                    </CardMedia>
                                
                                <Box className={classes.textbox}>
                                    <Typography variant='body1' >  {searchItem.name} </Typography>
                                    <Typography variant='body2' color='secondary'>  {(Math.round(searchItem.price*100)/100).toString() + ' DKK'} </Typography>
                                </Box>
                            </Link>
                        </CardActionArea>
                        <CardActions>
                            <Box >
                                <QuantityWidget itemInfo={{id: searchItem.id,
                                                            price: searchItem.price,
                                                            cartLink: searchItem.cartLink}}
                                                cart = {cart}
                                                cartDispatch = {dispatch}
                                                width={100}
                                                />
                            </Box>
                            
                        </CardActions>
                        
  
                    </Card>
              
                </Grid>
            ))}
        </Grid>
    </Box>
    
    )
}

export default SearchResults
