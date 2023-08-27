import Homepageimg from "../images/Homepage.jpeg";


export default function Hero(){

    return(
        <div className="relative">
            <img className="w-full homeimg" src={Homepageimg} alt="" />
            <button className="rounded px-4 absolute top-20 left-10  md:left-52 text-xs hover:bg-[#2f65a2] text-white font-semibold  p-2 bg-[#1565c0]" >EXPLORE VECATION RENTALS</button>
            <h2 className="absolute top-36 left-10 text-2xl md:left-52 font-bold md:text-5xl font-sans text-white">Your kind of vacation.<br/>Your kind of rental.</h2>
        </div>
    )
  }