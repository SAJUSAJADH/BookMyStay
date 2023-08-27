import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { UserContext } from "../contextprovider/usercontext";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/navbarcomponents/nav";
import Accountnav from "../components/navbarcomponents/accountnav";
import Switches from "../components/navbarcomponents/switches";
import Footer from "../components/bodycomponents/footer";
import Allplaces from "../components/bodycomponents/allplaces";



export default function SearchResult(){

    const {user} = useContext(UserContext);
    const {query} = useParams();
    const [searchData, setSearchData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(query === ''){
            query === 'empty search'
        }
        axios.get(`/search/${query}`).then(response=>{
            console.log(response.data)
            setSearchData(response.data);
        })
    },[])


    return(
        <>
            {!user ? <Nav/> : <Accountnav/>}
            <Switches/>
            <div className="container mx-auto mt-12">
            {searchData.length > 0 && <div className="flex justify-center lg:justify-start">
                    <h2 className="text-2xl font-semibold">Search Result For "<span style={{ fontStyle:"italic"}}>{query.toUpperCase()}</span> "</h2>
            </div>}
            {searchData.length > 0 ? 
                <div className="grid lg:grid-cols-3 gap-4 justify-center lg:justify-start">
                    {searchData.map((data,index)=>(
                        <div onClick={()=>{navigate(`/account/book/${data._id}`)}} key={index} className="mt-12 cursor-pointer max-w-sm rounded overflow-hidden shadow-lg my-2">
                            <img className="w-full" src={data.photos[0]} alt=""/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{data.title}</div>
                                <p className="text-gray-700 text-base font-bold">
                                {data.address}
                                </p>
                                <p className="text-gray-700 text-base font-bold">
                                {data.price}
                                </p>
                            </div>        
                        </div>
                    ))}
                </div> 
                : 
                <div className="my-8">       
                        <label className="text-2xl italic font-bold">Search: </label>
                        <input className="text-2xl rounded border-0 text-white font-bold bg-lightblue mx-2 text-center" type="text" value={query.toUpperCase()} readOnly/>
                        <h2 className="text-gray-300 font-bold italic text-2xl">404 Search Not Found</h2>
                </div>
            }
            <Allplaces/>
            </div>
            <Footer/>
        </>
    )
}