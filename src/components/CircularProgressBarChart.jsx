import { useCallback, useEffect, useState } from "react";
import { VictoryAnimation, VictoryLabel, VictoryPie } from "victory";

const CircularChart = ({ value}) => {
    const getData = (percent) => {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }
    const [ percent, setPercent ] = useState(30);
    const [data, setdata] = useState(getData(0));
    //console.log("value",value);
    const recalculatePercent = useCallback(
      () => {
        let per = (value*100)/15000;
        console.log(value, per, percent)
        setdata(getData(per));
        setPercent(per)
      },
      [value],
    )
    
    useEffect(()=>{
        
        recalculatePercent();
    },[ recalculatePercent ]);

    return ( 
        <div>
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <VictoryPie
                    standalone={false}
                    animate={{ duration: 1000 }}
                    width={400} height={400}
                    data={data}
                    innerRadius={120}
                    cornerRadius={25}
                    labels={() => null}
                    style={{
                    data: { fill: ({ datum }) => {
                        const color = datum.y > 30 ? "green" : "red";
                        return datum.x === 1 ? color : "transparent";
                    }
                    }
                    }}
                />
                <VictoryAnimation duration={1000} data={{percent,data}}>
                    {(newProps) => {
                    return (
                        <VictoryLabel
                        textAnchor="middle" verticalAnchor="middle"
                        x={200} y={200}
                        text={`${Math.round(newProps.percent)}%`}
                        style={{ fontSize: 45 }}
                        />
                    );
                    }}
                </VictoryAnimation>
            </svg>
        </div>
     );
}
 
export default CircularChart;