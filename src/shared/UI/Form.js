import React, {useState, useEffect, useRef} from 'react'
import './Form.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
    input: {
      margin: "1rem"
    }
  });
  

const Form = (props) => {

    const { formFields, formState, updateFormState } = props;

    const classes = useStyles();
 
    return(
        <div className="form-container">
                {formFields.map((field,index0) => {
                    switch(field.tag) {
                        case 'input':
                            return <TextField className={classes.input} key={index0} name={field.name} value={formState[field.name]} onChange={updateFormState} type={field.type} placeholder={field.name} label={field.name} variant="outlined"/>
                        case 'select':
                            return (<FormControl className={classes.input} variant="outlined">
                                        <InputLabel name="default" value={null}>{"Select a store"}</InputLabel> 
                                        <Select key={index0} onChange={updateFormState} label="Select a store" name="store" value={formState[field.name]}>
                                        {field.options.map((option, index1) => (
                                            <MenuItem key={index1} value={option}>{option}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>)
                        case 'custom':
                            return React.createElement(field.tagType, {key: index0.toString()}, field.content)
                        default:
                            throw Error('There is no matching case for one or more of the given form elements')
                    }
                })}
        </div>
    )
}

export default Form



