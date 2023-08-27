
import HotelIcon from '@mui/icons-material/Hotel';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import CabinOutlinedIcon from '@mui/icons-material/CabinOutlined';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import { Button } from '@mui/material';


export default function Switches(){
    return(
        <div className="hidden md:flex bg-blue pb-6 justify-evenly">
            <Button style={{borderRadius:'20px', color:'white'}} variant="outlined" href="#outlined-buttons"><HotelIcon/>STAYS</Button>
            <Button style={{borderRadius:'20px', color:'white'}} variant="outlined" href="#outlined-buttons"><BusinessOutlinedIcon/>APARTMENTS</Button>
            <Button style={{borderRadius:'20px', color:'white'}} variant="outlined" href="#outlined-buttons"><BedroomChildOutlinedIcon/>CLUBS</Button>
            <Button style={{borderRadius:'20px', color:'white'}} variant="outlined" href="#outlined-buttons"><CabinOutlinedIcon/>CABINS</Button>
            <Button style={{borderRadius:'20px', color:'white'}} variant="outlined" href="#outlined-buttons"><LuggageOutlinedIcon/>TRIPS</Button>
        </div>
    )
}