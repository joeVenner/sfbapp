import { useEffect, useRef, useState } from "react";

const CardNumber = ({increment, duration, Intervalduration, value}) => {
    const [currentValue, setCurrentValue] = useState(100);
    const intervalRef = useRef(null);
    console.log("cardNumber",value,duration,(currentValue<value));
    //useEffect for the annimation burn & distribute value
    useEffect(()=>{
        if(currentValue < value){
            const increment = Math.ceil((value - currentValue) / (duration / 100));
            intervalRef.current = setInterval(() => {
                setCurrentValue(prevNumber => prevNumber + increment);
            }, 10);
        }
        clearInterval(intervalRef);
        setCurrentValue(value)
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [value, currentValue, duration])
    return ( 
        <div className=" p-5 border-4 border-orange shadow-card flex flex-col items-center justify-center text-xl gap-3">
            <h3 className="font-poppins capitalize">Total amount burned</h3>
            <span className="uppercase font-bold">{currentValue} stars</span>
        </div>
     );
}
 
export default CardNumber;