import {useEffect} from 'react'

const useCartFetch = (cart, contents, setContents) => {
    useEffect(()=>{
        let new_contents = {}
        const fetchData = async function (item) {
            let res = await fetch(item.link, {method: 'GET'});
            let json = await res.json();
            let data = await json.data;
            new_contents[data.id] = data

            return data
        }

        const fetchAll = async function(){
            return Promise.all((Object.values(cart)).map(item => {return fetchData(item)}))
        }
        
        if (Object.keys(cart) !== Object.keys(contents)){
            fetchAll().then(()=>setContents(new_contents))
        }
        
    },[cart])
}


export default useCartFetch