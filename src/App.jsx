import axios from 'axios';
import { useEffect, useState } from 'react'
import { Bar, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie } from 'victory';
import Navbar from './components/Navbar';
import CvictorChart from './components/CustomVictoryChart';
import InterpolationGraph from './components/InterpolationGraph';
import CircularChart from './components/CircularProgressBarChart';



function App() {
  const [burnedStargaze, setBurnedStargaze ] = useState(null);
  const [distributedStargaze, setDistributedStargaze ] = useState(null);
  //console.log("burn",burnedStargaze, burnedStargaze[0][1], new Date(burnedStargaze[0][0]));
  //console.log("distr",distributedStargaze);
  //console.log("burned",burnedStargaze);
  useEffect(()=>{
    const getData = async() =>{
      
      const burnData = await axios.post("https://burn-api.vercel.app/api",{
        apiUrl: "https://metabase.constellations.zone/api/public/card/3f4acb97-796f-40ae-af2c-d3163d09667a/query"
      });
      setBurnedStargaze([...burnData.data.slice(Math.max(burnData.data.length - 6, 0))]);
      
       //distributed stargaze api call
      const distributedCoin = await axios.post("https://burn-api.vercel.app/api",{
        apiUrl: "https://metabase.constellations.zone/api/public/card/dfedf8e8-fd13-4cfb-9d87-e6a13ab45a7f/query"
      });

      setDistributedStargaze([...distributedCoin.data.slice(Math.max(distributedCoin.data.length - 6, 0))]);

    }
    const intervalId = setInterval(() => {
      getData();
      //console.log("interval", burnedStargaze[5][2]);
    }, 5000);
  
    return () => clearInterval(intervalId);
    
  }, [])

  //
  const dateFormat = (date) => {
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm ;

  }
  
  if(!burnedStargaze || !distributedStargaze) return ;
  return (
    <div className="select-none font-poppins">
      <Navbar />
      <main className="p-10 m-auto">
        <div className=" grid gap-10 grid-cols-mobile">
          <div className="flex flex-col justify-center ">
            <h2 className="font-bold text-xl mb-3">Stargaze Fair Burn 🔥</h2>
            <p className="">Real-time tracker of burned & distributed stars</p>
          </div>
          <div className=" p-5 border-4 border-orange shadow-card flex flex-col items-center justify-center text-xl gap-3">
            <h3 className="font-poppins capitalize">Total amount burned</h3>
            <span className="uppercase font-bold">{burnedStargaze.at(-1)[2].toFixed(2)} stars</span>
          </div>
          <div className="p-4 border-4 border-orange shadow-card flex flex-col items-center justify-center text-xl gap-3">
            <h3 className="font-poppins capitalize">Total amount distributed</h3>
            <span className="uppercase font-bold">{distributedStargaze.at(-1)[2].toFixed(2)} stars</span>
          </div>
        </div>

        <div className="my-10 mx-auto grid gap-10 grid-cols-mobile auto-rows-max" aria-label='charts'>
            <InterpolationGraph key="burn" title="Burned stars per day" data={[
                    { x: burnedStargaze[0][0], y: burnedStargaze[0][1] },
                    { x: burnedStargaze[1][0], y: burnedStargaze[1][1] },
                    { x: burnedStargaze[2][0], y: burnedStargaze[2][1] },
                    { x: burnedStargaze[3][0], y: burnedStargaze[3][1] },
                    { x: burnedStargaze[4][0], y: burnedStargaze[4][1] },
                    { x: burnedStargaze[5][0], y: burnedStargaze[5][1] }
                  ]} 
            />
            <InterpolationGraph key="dist" title="Distributed stars per day" data={[
                    { x: new Date(distributedStargaze[0][0]), y: distributedStargaze[0][1] },
                    { x: new Date(distributedStargaze[1][0]), y: distributedStargaze[1][1] },
                    { x: new Date(distributedStargaze[2][0]), y: distributedStargaze[2][1] },
                    { x: new Date(distributedStargaze[3][0]), y: distributedStargaze[3][1] },
                    { x: new Date(distributedStargaze[4][0]), y: distributedStargaze[4][1] },
                    { x: new Date(distributedStargaze[5][0]), y: distributedStargaze[5][1] }
                  ]}
            />
            {/* <CvictorChart title="Burn History for the last 6 days" data={[
                    { x: new Date(burnedStargaze[0][0]), y: burnedStargaze[0][1] },
                    { x: new Date(burnedStargaze[1][0]), y: burnedStargaze[1][1] },
                    { x: new Date(burnedStargaze[2][0]), y: burnedStargaze[2][1] },
                    { x: new Date(burnedStargaze[3][0]), y: burnedStargaze[3][1] },
                    { x: new Date(burnedStargaze[4][0]), y: burnedStargaze[4][1] },
                    { x: new Date(burnedStargaze[5][0]), y: burnedStargaze[5][1] }
                  ]} 
            />
             */}
            
            <CircularChart title="Daily Progress To 15k Burned Stars" value={parseInt(burnedStargaze[5][1])} />
              
          

        </div>
      </main>
    </div>
  )
}

export default App


/**
 * <div className="">
              <div className='relative py-4 px-6 border-4 border-orange shadow-card '>
                <svg viewBox="0 0 400 400" >
                  <VictoryPie
                    colorScale={["#71b1e0", "tomato"]}
                    standalone={false}
                    width={400} height={400}
                    data={[
                      { x: 'Distributed', y: distributedStargaze[5][2] }, { x: "Burned", y: burnedStargaze[5][2] }
                    ]}
                    innerRadius={68} labelRadius={75}
                    style={{ labels: { fontSize: 20, fill: "black" } }}
                  />
                  <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={200} y={200}
                    text="vs"
                  />
                </svg>
              </div>
              <h3 className="mx-auto capitalize mt-2 text-center">Daily Progress To 15k Burned Stars </h3>
            </div>
 */