import { Bar, VictoryAxis, VictoryBar, VictoryChart } from "victory";

const CustomVictoryChart = ({ data, title}) => {

    //
    const dateFormat = (date) => {
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm ;

    }

    return ( 
        <div className="relative py-4 px-6 border-4 border-orange shadow-card overflow-visible">
            <VictoryChart height={300} width={370} className="overflow-visible"
            domainPadding={{ x: 20, y: [70, 20] }}
            scale={{ x: "time" }}
            >
            <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickFormat={(x) => dateFormat(x)}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`${x / 1000}k`)}
            />
            <VictoryBar
                dataComponent={
                <Bar />
                }
                style={{data: { fill: "#fdf59f" }}}
                data={data}
            />
            </VictoryChart>
            <h3 className="absolute inset-0 mx-auto capitalize mt-3 text-center">{title} </h3>
        </div>
     );
}
 
export default CustomVictoryChart;