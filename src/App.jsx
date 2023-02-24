import axios from 'axios';
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import InterpolationGraph from './components/InterpolationGraph';
import CircularChart from './components/CircularProgressBarChart';
import CardNumber from './components/CardNumber';



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
  
  //separateur des miliers
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <div className="min-h-screen select-none font-poppins">
      <Navbar />
      {(burnedStargaze && distributedStargaze) ? 
        (<main className="p-10 px-20 m-auto">
          <div className=" grid gap-10 grid-cols-mobile mx-auto">
            <div className="flex flex-col justify-center ">
              <h2 className="font-bold text-[1.8rem] ">Stargaze Fair Burn 🔥</h2>
              <p className="">Real-time tracker of burned & distributed stars</p>
            </div>
            <br className="block mb-10 lg:hidden" />
            {/* <CardNumber intervalduration={10000} duration={1000} increment={0.5} value={parseFloat(burnedStargaze.at(-1)[2].toFixed(2))}  /> */}
            <div className=" p-5 border-4 border-orange shadow-card flex flex-col items-center justify-center text-xl gap-3">
              <h3 className="capitalize">Total amount burned</h3>
              <span className="uppercase font-bold">{numberWithCommas( burnedStargaze.at(-1)[2].toFixed(2) )} stars</span>
            </div>
            <div className="p-4 border-4 border-orange shadow-card flex flex-col items-center justify-center text-xl gap-3">
              <h3 className="capitalize">Total amount distributed</h3>
              <span className="uppercase font-bold">{distributedStargaze.at(-1)[2].toFixed(2)} stars</span>
            </div>
          </div>

          <div className="my-10 mx-auto grid gap-10 grid-cols-mobile auto-rows-[1fr]" aria-label='charts'>
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
                      { x: distributedStargaze[0][0], y: distributedStargaze[0][1] },
                      { x: distributedStargaze[1][0], y: distributedStargaze[1][1] },
                      { x: distributedStargaze[2][0], y: distributedStargaze[2][1] },
                      { x: distributedStargaze[3][0], y: distributedStargaze[3][1] },
                      { x: distributedStargaze[4][0], y: distributedStargaze[4][1] },
                      { x: distributedStargaze[5][0], y: distributedStargaze[5][1] }
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
              
              <CircularChart title="Burned Stars Daily Progress" average={burnedStargaze.reduce((accumalator, value, i) => i!== 5 ? value[1] + accumalator : accumalator, 0 )/5} value={parseInt(burnedStargaze[5][1])} />
              
          </div>
        </main>) :
        (
          <div className="w-full h-96 relative flex justify-center items-center pt-10 ">
            <img src="https://www.stargaze.zone/logo.png" alt="" className='w-12 h-12 mt-auto animate-spin'/>
          </div> 
        )
      }
    </div>
  )
}

export default App


/**
 * 
 * <video src="src/assets/burning_coin_2.webm" autoPlay muted loop className='h-[300px] m-auto   '></video>          

 *             <img src="https://www.stargaze.zone/logo.png" alt="" className='w-12 h-12 m-auto animate-spin'/>

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