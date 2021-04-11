import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import searchIcon from '../../shared/UI/icons/search.svg'

import {TextField, Box, makeStyles} from '@material-ui/core'

const SearchForm = (props) => {
    const [ inputText, setInputText ] = useState(['']);
    const [ shouldFetch, setShouldFetch ] = useState(false);
    let location = useLocation();
    let history = useHistory();
    const isInitialMount = useRef(true);

    // Calls handleFormChange every time the inputText updates
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if(inputText[0] !== '') {
            handleFormChange();
        }
     // eslint-disable-next-line   
    }, [inputText]);

    // Waits for the form action to reset the state 
    // before rendering the search page
    const handleFormChange = async() => {
        await dispatchFormAction();
        updateLocation();  
    };

    // Dispatches form action that sets the global state
    const dispatchFormAction = () => {
        if(inputText.length === 1) {
            return setShouldFetch(true)
        } 
        else if (inputText.length > 1) {
            const regex = new RegExp(`${inputText}`, 'i');
            return props.dispatch({ 
                type: 'setAutocomplete',
                payload: { regex: regex }
            })
        } else {
            return props.dispatch({ 
                type: 'resetAutocomplete'
            })
        }
    }

    // Function to fetch search items and dispatch to global state 
    useEffect(() => {
        if (shouldFetch) {
            fetch('/search?name=' + inputText, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                props.dispatch({type: 'setSearchResults', 
                                payload: {data: data.data}});
            })
        }
        return () => {
            setShouldFetch(false)
        }
    // eslint-disable-next-line
    }, [shouldFetch]); 

    // Controls page view through the browser history
    const updateLocation = () => {
        if(location.pathname !== "/search") {
            history.push('/search');
        } else if(inputText.length === 0) {
            history.push('/');
        }
    }

    const classes = useStyles()

    return (

        <Box className = {classes.search_box_container}>
            <TextField value = {inputText} 
                        label = "Search for a food item"
                        variant="outlined"
                        className = {classes.search_box}
                        //    inputProps={{ style: {textAlign: 'center', height: '100%', fontSize: 20} }}
                        //    className = {styles.textBox}
                        //    margin = 'none'
                        onChange={(e) => setInputText(e.target.value)} 
                />
        </Box>
     
    )
        
}



const useStyles = makeStyles((theme)=>({
    search_box_container:{
        display: 'flex',
        height: '200px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_box:{
        width: '50%',
        [theme.breakpoints.down('sm')]:{
            width: '80%',        
        }
    },
}))

            
export default SearchForm
