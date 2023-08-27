

import offercard from "../images/offercard.jpeg";
import flight from "../images/flight.png";

export default function Offercard(){
    return(
        <div className="container mx-auto p-2 md:p-6 ">
            <h2 className="font-sans font-bold text-2xl">
                Offers
            </h2>
            <p className="font-sans font-semibold text-lg p-2">Promotions, deals, and special offers for you</p>
            <div className="grid lg:grid-cols-2 gap-4 ">
                <div className="grid grid-cols-2 bg-white font-sans z-40 shadow-lg h-fit md:h-3/5">
                    <div className="p-6">
                        <h2 className="font-bold font-sans text-lg">Take your longest vacation yet</h2>
                        <p className=" font-sans text-base py-2">Browse properties offering long-term stays, many at reduced monthly rates.</p>
                        <button  className="bg-[#006ce4] font-semibold px-2 rounded py-2 text-white font-sans">Find a stay</button>
                    </div>
                    <div className="relative h-full rounded-r">
                        <img className="absolute inset-0 w-full h-full object-cover rounded-r" src={offercard} alt=""/>
                    </div>
                </div>
                <div className=" grid grid-cols-2 bg-white rounded font-sans z-40 shadow-lg h-fit md:h-3/5">
                    <div className="p-6">
                        <h2 className="font-bold font-sans text-lg">Fly away to your dream vacation</h2>
                        <p className=" font-sans text-base py-2">Get inspired – compare and book flights with flexibility</p>
                        <button className="bg-[#006ce4] font-semibold px-2 rounded py-2 text-white font-sans">Search for flights</button>
                    </div>
                    <div className="rounded flex justify-center relative h-2/4">
                        <img className="items-center" src={flight} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}