import { Button } from '@mui/material';
import Globe from "../images/GlobeGeniusBadge.png";


function Card(){
    
    return(
        <div className="hidden md:block container mx-auto border-2 border-gray-300 rounded w-3/4">
            <div className="grid lg:grid-cols-4">
                <div className="flex justify-center">
                    <img src={Globe} alt="" width={170} height={130} className=""/>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                <div className="">
                    <h2 className="font-sans font-bold text-xl">Get instant discounts</h2>
                    <p className="font-sans text-base py-2">Just sign into your BookMyStay.com account and grab 25% off on your first purchase.</p>
                    <Button className="text-blue bg-white font-bold" variant="outlined" size="small" href="/register">Sign Up</Button>
                    <Button style={{marginLeft:"5px"}} className="text-blue bg-white font-bold " variant="outlined" size="small" href="/signin">Sign In</Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Card;