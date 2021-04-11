import React, {useState, useEffect, useRef} from 'react'
import './Form.css'


const Form = (props) => {

    const { formFields, formState, updateFormState } = props;
 
    return(
        <div className="form-container">
                {formFields.map((field,index0) => {
                    switch(field.tag) {
                        case 'input':
                            return <input key={index0} name={field.name} value={formState[field.name]} onChange={updateFormState} type={field.type} placeholder={field.name}/>
                        case 'select':
                            return (<select key={index0} name={field.name} onChange={updateFormState}>
                                    <option name="default" value={null}>{"Select a " + field.name}</option> 
                                    {field.options.map((option, index1) => (
                                        <option key={index1} name={option} value={option}>{option}</option>
                                    ))}
                                    </select>)
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



