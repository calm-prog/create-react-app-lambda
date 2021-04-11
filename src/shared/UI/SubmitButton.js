import React from 'react'
import './SubmitButton.css'

const SubmitButton = (props) => {
            return (
            <button className="submit-button" type="submit" onClick={props.onClick}>{props.text}</button>
            )
        }

export default SubmitButton