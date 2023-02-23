import { useState } from "react";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryPolarAxis, VictoryScatter } from "victory";


  
const cartesianInterpolations = [
    "basis",
    "bundle",
    "cardinal",
    "catmullRom",
    "linear",
    "monotoneX",
    "monotoneY",
    "natural",
    "step",
    "stepAfter",
    "stepBefore"
];

const polarInterpolations = [
    "basis",
    "cardinal",
    "catmullRom",
    "linear"
];

const InterpolationSelect = ({ currentValue, values, onChange }) => (
    <select onChange={onChange} value={currentValue} style={{ width: 75 }}>
      {values.map(
        (value) => <option value={value} key={value}>{value}</option>
      )}
    </select>
);


const InterpolationGraph = ({data, title}) => {

    const [ interpolation, setIntepolation ] = useState("linear");
    const [polar, setpolar] = useState(false);

    //
    const dateFormat = (dateN) => {
        const date = new Date(dateN);
        //console.log(date, date.getMonth());
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm ;

    }
      
    return ( 
        <div className="h-full flex flex-col justify-between">
            <div className="relative py-4 px-6 border-4 border-orange shadow-card">
                <InterpolationSelect
                    currentValue={interpolation}
                    values={polar ? polarInterpolations : cartesianInterpolations }
                    onChange={(event) => setIntepolation(event.target.value) }
                />
                <input
                type="checkbox"
                id={title}
                value={polar}
                onChange={
                    (event) => {
                        setIntepolation("linear");
                        setpolar(event.target.checked);
                    }
                }
                style={{ marginLeft: 25, marginRight: 5 }}
                />
                <label htmlFor={title}>polar</label>
                <VictoryChart polar={polar} height={390}>
                    <VictoryLine
                        interpolation={interpolation} data={data}
                        style={{ data: { stroke: "#c43a31" } }}
                    />
                    <VictoryScatter data={data}
                        size={5}
                        style={{ data: { fill: "#c43a31" } }}
                    />
                    
                    {polar && <VictoryPolarAxis
                        tickFormat={(x) => dateFormat(x)}
                    />}
                    { polar && <VictoryPolarAxis dependentAxis
                        style={{
                        axis: {stroke: "none"},
                        tickLabels: { fill: "none"},
                        grid: { stroke: "grey", strokeDasharray: "4, 8" }
                        }}
                    />}
                    {!polar && <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickFormat={(x) => dateFormat(x)}
                    />}
                    {!polar && <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`${x / 1000}k`)}
                    />}
                </VictoryChart>
        </div>
        <h3 className="mx-auto capitalize mt-2 text-center">{title} </h3>
      </div>
     );
}
 
export default InterpolationGraph;