import React, { Component } from 'react'
import ErrorMessage from '../shared/UI/ErrorMessage'

class ErrorMessageContainer extends Component {

    render() {
        const { specialChar } = this.props;
        const noItem = "No matching item"

        return (
            <React.Fragment>
                <ErrorMessage errMsg={noItem}/>
                <ErrorMessage errMsg={specialChar}/>
            </React.Fragment>
        )
    } 
}

export default ErrorMessageContainer
