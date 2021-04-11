import React, {useState, useEffect} from 'react'
const NodeRSA = require('node-rsa')

const useForm = (formFields, keyUrl) => {

    /* -------------------- INITIALIZES STATES ------------------------- */

    const initState = formFields.filter(field => field.tag !== 'custom').reduce((obj, field) => {obj[field.name] = null; return obj}, {});

    const [formState, setFormState] = useState(initState);

    /* ----------------- SETS FORM STATE VALUES ----------------------- */
    const updateFormState = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    /* ---------- FETCHES RSA KEY & ENCRYPTS FORM DATA ---------------- */
    const encryptData = async() => {
        let key = await fetch(keyUrl, {method: 'GET'})
        .then(res => res.json())
        .then(data => new NodeRSA(data.data.key, 'pkcs8-public-pem'));

        let data = key.encrypt(JSON.stringify(formState), "base64");

        return data;
    }

    /* ----------------------------------------------------------------- */

    return [formState, updateFormState, encryptData] 
}

export default useForm