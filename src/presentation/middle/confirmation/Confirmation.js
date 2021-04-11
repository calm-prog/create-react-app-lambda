import React from 'react'
import './Confirmation.css'

const Confirmation = (props) => {
    const {name, store} = props;

    return(
        <React.Fragment >
            <div className="confirmation-container">
                <div>Thank you {name} for your order!</div>
                <div>You can pick up your order at {store}.</div>
            </div>
        </React.Fragment>
    )
}

export default Confirmation