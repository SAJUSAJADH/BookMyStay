import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contextprovider/usercontext";


export default function Searchbar(){

    const navigate= useNavigate();
    const {user} = useContext(UserContext);
    const [destinations, setDestinations] = useState('');
    const [dates, setDates] = useState('');
    const [noOfPeople, setNoofPeople] = useState('');

    function disableSpace(event) {
        if (event.key === " "|| event.key === '_' || event.key === '-') {
            event.preventDefault();
        }
    }

    const HandleSearch = async(ev) => {
        ev.preventDefault();
        if(user){
            if(destinations.length === 0){
                navigate('/account/search/emptyquery')
            }else{
                navigate(`/account/search/${destinations}`);
            }
            
        }
        else{
            if(destinations.length === 0){
                navigate('/search/emptyquery')
            }else{
                navigate(`/search/${destinations}`);
            }
        }
    }


    return(
        <div className="p-6 container mx-auto hidden md:flex justify-center">
            <input onKeyDown={disableSpace} value={destinations} onChange={ev=>setDestinations(ev.target.value)} className="focus:outline-none border-4 rounded text-[#777] text-center text-base py-4 px-8 border-[#ffb700]" placeholder="Where are you going ?"></input>
            <input value={dates} onChange={ev=>setDates(ev.target.value)} className="focus:outline-none border-4 rounded text-[#777] text-center text-base py-4 px-8 border-[#ffb700]" placeholder="31-07-2001"></input>
            <input value={noOfPeople} onChange={ev=>setNoofPeople(ev.target.value)} className="focus:outline-none border-4 rounded text-[#777] text-center text-base py-4 px-8 border-[#ffb700]" placeholder="Number of people"></input>
            <button onClick={HandleSearch} className="bg-[#1565c0] px-4 text-white border-4 rounded border-[#ffb700]" >Search</button>
        </div>
    )
}