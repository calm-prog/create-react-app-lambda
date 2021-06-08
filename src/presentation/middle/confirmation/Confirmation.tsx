import React, { useState, useEffect } from 'react'
import './Confirmation.css'
import { useLocation } from 'react-router-dom'
import firebase from '../../../firebase'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AutorenewTwoTone } from '@material-ui/icons';



function makeid(length: number) {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

interface Props {
    name: string,
    email: string,
    store: string
}

const Confirmation: React.FC = () => {
    // const [confirmation, setConfirmation] = useState({name: "", email: "", store: ""});
    const location = useLocation<Props>();
    // const ref = firebase.firestore().collection("orders");
    const {name, email, store} = location.state;

    // useEffect(() => {
    //     ref.doc(location.state).get().then((doc) => {
    //         if (doc.exists) {
    //             const {name, email, store} = doc.data();
    //             setConfirmation({name: name.split(' ')[0], email: email, store: store})
    //         } else {
    //             // doc.data() will be undefined in this case
    //         }        
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }, [location.state])

    return(
        <div className="confirmation-container">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Thank you {name.split(" ")[0]} for your order!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        You can pick up your order at {store} with the following order ID: {makeid(10)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        We will send you a notification to your email address{"(" + email + ")"} once your order is ready for pickup.
                    </Typography>
                </CardContent>
            </Card>
        </div>

    )
}

export default Confirmation