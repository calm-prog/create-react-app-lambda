import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = (props) =>   
            <div className="error-message">
                {props.errMsg}
            </div>

export default ErrorMessage
