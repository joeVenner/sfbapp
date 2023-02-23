import { useEffect, useState } from "react";

const CardNumber = ({increment, duration, Intervalduration, value}) => {
    const [currentValue, setCurrentValue] = useState(value-100);
    //useEffect for the annimation burn & distribute value
    useEffect(()=>{
        let interval;
        let timeout;
        
        //clear the interval when it reached it's original value
        timeout = setTimeout(() => {
            clearInterval(interval);
            setCurrentValue(value);
        }, Intervalduration);
        //animation
        interval = setInterval(() => {
            setCurrentValue(prevValue => {
                const newValue = prevValue + increment;
                if (newValue >= value) {
                  setCurrentValue(value);
                  clearInterval(interval);
                }
                return newValue;
            });
            
        }, duration );
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    })
    return ( 
        <div className=" p-5 border-4 border-orange shadow-card flex flex-col items-center justify-center text-xl gap-3">
            <h3 className="font-poppins capitalize">Total amount burned</h3>
            <span className="uppercase font-bold">{currentValue} stars</span>
        </div>
     );
}
 
export default CardNumber;