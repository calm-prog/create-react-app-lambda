import React, {useState, useEffect, useRef} from 'react'
import './Form.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles({
    input: {
      margin: "1rem"
    }
  });
  

const Form = (props) => {

    const { formFields, formState, updateFormState, inputLengthCheck } = props;

    const classes = useStyles();
 
    return(
        <div className="form-container">
                {formFields.map((field,index0) => {
                    switch(field.tag) {
                        case 'input':
                            return <TextField className={classes.input} 
                                              key={field.fieldName} 
                                              name={field.fieldName}
                                              value={formState[field.fieldName].value}
                                              onChange={(e) => {updateFormState(e)}}
                                              onBlur={(e) => {inputLengthCheck(e)}}
                                              type={field.type}
                                              label={field.placeholder} 
                                              variant="outlined"
                                              helperText={formState[field.fieldName].errorMessage}
                                              error={formState[field.fieldName].validationError}
                                              inputProps={{"validate": field.validationType}}
                                    />
                        case 'select':
                            return (<FormControl className={classes.input}
                                                 variant="outlined"
                                                 error={formState[field.fieldName].validationError}
                                                 >
                                        <InputLabel name="default" value={formState[field.fieldName].value}>{field.placeholder}</InputLabel> 
                                        <Select onChange={updateFormState}
                                                label="Select a store"
                                                name="store" 
                                                value={formState[field.fieldName].value}
                                                inputProps={{"validate": field.validationType}}
                                                onBlur={(e) => {inputLengthCheck(e)}}
                                                >
                                        {field.options.map((option, index1) => (
                                            <MenuItem key={index1} value={option}>{option}</MenuItem>
                                        ))}
                                        </Select>
                                        <FormHelperText>{formState[field.fieldName].errorMessage}</FormHelperText>
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



