import { useCallback, useEffect, useState } from "react";
import { VictoryAnimation, VictoryLabel, VictoryPie } from "victory";

const CircularChart = ({ value, title, average }) => {
    const getData = (percent) => {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }
    const [ percent, setPercent ] = useState(30);
    const [data, setdata] = useState(getData(0));
    //console.log("value",value);
    //console.log("av",average);
    const recalculatePercent = useCallback(
      () => {
        let per = (value*100)/average;
        //console.log(value, per, percent)
        setdata(getData(per));
        setPercent(per)
      },
      [value],
    )
    
    useEffect(()=>{
        
        recalculatePercent();
    },[ recalculatePercent ]);

    return ( 
        <div className="h-full box-border">
            <div className="relative h-auto">
                <svg viewBox="0 0 400 400" width="100%" height="100%" className="relative h-full w-full py-4 px-6 border-4 border-orange shadow-card" >
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
                <h3 className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap mx-auto text-xs mt-2 text-center"> Target = Moving avg of burned stars ({average.toFixed(2)}) </h3>
            </div>
            
            <h3 className="mx-auto capitalize mt-2 text-center">{title} </h3>
        </div>
     );
}
 
export default CircularChart;