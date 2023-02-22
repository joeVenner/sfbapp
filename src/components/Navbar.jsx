import { useState } from "react";

const Navbar = () => {

    const [menuOpen,setMenuOpen] = useState(false);

    const toggleClick = () => {
        if(window.innerWidth<768){
          setMenuOpen(!menuOpen);
        }
        
    }

    return ( 
        <header className="relative h-14 p-1 md:p-2 text-noir flex justify-between" aria-label="primary navigation" >
            
                <div className="flex min-w-fit h-full">
                    <a href="/" className="pt-2 md:pt-0 flex items-center" ><img src="https://www.stargaze.zone/logo.svg" alt="logo" className="w-28  object-cover"   /> <h2 className="text-xl ml-0 font-bold  uppercase "></h2></a>
                </div>

                <ul className={`absolute top-[56px] left-0 right-0 md:inset-0 md:relative w-full h-[calc(100vh-56px)] md:h-auto z-30 bg-white md:bg-transparent self-center flex flex-col md:flex-row justify-center items-center capitalize   gap-y-5 gap-x-3 ${menuOpen? "translate-x-0 " : "-translate-x-full bg-transparent"}  md:translate-x-0 ease-in-out duration-300`} >
                    <li className="text-lg ml-0 font-light  "><a href="https://www.stargaze.zone/launchpad" onClick={toggleClick} className="p-2 transition duration-100 ease-in-out rounded-md hover:bg-blanc ">lanchpad</a></li>
                    <li className="text-lg font-extralight "><a href="https://www.stargaze.zone/marketplace"onClick={toggleClick} className="p-2 transition duration-100 ease-in-out rounded-md hover:bg-blanc ">marketplace</a></li>
                    <li className="text-lg font-extralight"><a href="https://www.stargaze.zone/names" onClick={toggleClick} className="p-2 transition duration-100 ease-in-out rounded-md hover:bg-blanc">names</a></li>
                    <li className="text-lg font-extralight"><a href="https://info.stargaze.zone" onClick={toggleClick} className="p-2 transition duration-100 ease-in-out rounded-md hover:bg-blanc">indexer</a></li>
                    <li className="text-lg font-extralight"><a href="https://stargaze-codes-explorer.vercel.app/#/codes" onClick={toggleClick} className="p-2 transition duration-100 ease-in-out rounded-md hover:bg-blanc">codes</a></li>
                </ul>


                { !menuOpen && <button className="absolute right-1 top-1 md:hidden" onClick={toggleClick} id="open">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 128L216 128"></path> <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 64L216 64" ></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M40 192L216 192" ></path>  </svg>
                </button>}
                { menuOpen && <button className="absolute right-1 top-1  md:hidden"  id="close" onClick={toggleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"  viewBox="0 0 256 256"> <path fill="none" d="M0 0H256V256H0z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M200 56L56 200" ></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M200 200L56 56" ></path> </svg>      
                </button>}


        </header>
     );
}
 
export default Navbar;