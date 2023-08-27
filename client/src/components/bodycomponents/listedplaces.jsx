import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Listedplaces(){

    const navigate = useNavigate();
    const [Listedplaces, setListedPlaces] = useState([]);
    const [showTempComponent, setShowTempComponent] = useState(true);

    useEffect(()=>{
        try{axios.get('/listedplaces').then(response=>{
            setListedPlaces(response.data);
            //console.log(response.data)
        })}catch(error){
            console.log(error)
        }
    },[])

    return(<>
        {Listedplaces.length === 0 ?
            <div className="flex justify-center pt-8">
                <h1 className="text-3xl font-bold italic text-gray-500 py-8">You Have No Places Listed !</h1>
            </div> :
            <div className="container mx-auto py-4">
                <div className="grid lg:grid-cols-3 justify-center ">
                    {Listedplaces.map((place,index)=>(
                        <div onClick={()=>{navigate(`/account/place/edit/${place._id}`)}} key={index} className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg my-2">
                            <img className="w-full" src={place.photos[0]} alt="Sunset in the mountains"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{place.title}</div>
                                <p className="text-gray-700 text-base">
                                {place.description}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                {place.features[0] && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.features[0]}</span>}
                                {place.features[1] && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.features[1]}</span>}
                                {place.features[2] && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.features[2]}</span>}
                                {place.features[3] && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.features[3]}</span>}
                                {place.features[4] && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.features[4]}</span>}
                                {place.features[5] && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{place.features[5]}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            }
        </>
    )
}