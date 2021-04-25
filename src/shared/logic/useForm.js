import React, {useState, useEffect} from 'react'
const NodeRSA = require('node-rsa')

const useForm = (formFields, keyUrl) => {

    /* -------------------- INITIALIZES STATES ------------------------- */

    const initState = formFields.filter(field => field.tag !== 'custom').reduce((obj, field) => {obj[field.fieldName] = {value: "", validationError: false, errorType: "", errorMessage: ""}; return obj}, {});

    const [formState, setFormState] = useState(initState);

    /* ----------------- SETS FORM STATE VALUES ----------------------- */
    const updateFormState = (e) => {
            let validationType = e.target.attributes !== undefined ? e.target.attributes.validate.value : "select";
            const regex = validationType === "string" ? new RegExp(/^[\s0-9\p{L}]*$/u) : new RegExp(/^[1-9]\d*$/);
            const errorMessage = validationType === "string" ? "No special characters are accepted in this field" : "Please enter a valid credit card number";
        
    
            if(formState[e.target.name].errorType === "length" && e.target.value.length){
                setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: false, errorMessage: "", errorType: "", value: e.target.value}});
            } else if(!regex.test(e.target.value) && validationType !== "email" && validationType !== "select") {
                setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: true, errorMessage: errorMessage, errorType: e.target.validate, value: e.target.value}});
            } else if(formState[e.target.name].validationError) {
                setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: false, errorMessage: "", errorType: "", value: e.target.value}});
            } else if(validationType === "select" && !e.target.value.length) {
                setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: true, errorMessage: "hello", errorType: "select", value: e.target.value}});
            } else {
                setFormState({...formState, [e.target.name]: {...formState[e.target.name], value: e.target.value}});
            }
    }

    const inputLengthCheck = (e) => {
        let validationType = e.target.attributes !== undefined ? e.target.attributes.validate.value : "select";
        let error = e.target.value.length < 1;
        if(error){
            setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: error, errorMessage: "This field is required", errorType: "length"}});
        } else if(validationType === "email") {
            const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            const errorMessage = "Please, enter a valid email address";
            if(!regex.test(e.target.value)){
                setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: true, errorMessage: errorMessage, errorType: e.target.validate, value: e.target.value}});
            }
        }
    }

    const finalValidation = (e) => {
        let error = e.target.value.length < 1;
        setFormState({...formState, [e.target.name]: {...formState[e.target.name], validationError: error}});
        return error;
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

    return [formState, updateFormState, inputLengthCheck, setFormState] 
}

export default useForm