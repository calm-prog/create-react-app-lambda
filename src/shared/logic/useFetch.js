import { useState, useEffect } from 'react'

const useFetch = (url, options) => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let res = await fetch(url, options);
            let json = await res.json();
            let arr = await json.data;
            setData(arr);
        }
        fetchData();
    // eslint-disable-next-line
    }, [url]);     

    return data;
}

export default useFetch