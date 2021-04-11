import React, { useEffect, useState } from 'react';
import { motion, useAnimation} from "framer-motion"




const ServiceDesc = (props) => {

    const textArray = props.textArray
    
    const [textIndex, setVal] = useState(0)

    const controls = useAnimation()

    const animVariants = {shrunk: {scale: 0},
                        expanded: {scale: 1}}

    controls.start("expanded")                        
  
    useEffect(() =>{

        const actions = async () =>{
            await controls.start("shrunk")
            let newIndex = (textIndex + 1 >= textArray.length) ?  0 : (textIndex + 1);
            setVal(newIndex)
        }

        const intervalId = setTimeout(actions, 2500)

        return () => clearInterval(intervalId);
    })
    

    return (
        <div style = {{ height: '100px', 
                        marginTop: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'}}>

        <motion.p initial = "shrunk" 
                    animate = {controls} 
                    style = {{fontSize: '30px'}}
                    transition = {{duration: 0.5}}
                    variants = {animVariants}> {textArray[textIndex]} </motion.p>

  
        </div>
    )
}

export default ServiceDesc