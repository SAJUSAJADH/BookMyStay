import google from "../images/google.png";
import fb from "../images/fb.png";
import axios from 'axios'


export default  function Auth(){

    const Handleclick = async ()=>{
    
    }

    return(
        <div className="my-4">
                            <p className="text-base text-center  text-[#777]">or use one of these options</p>
                            <div className="flex justify-center gap-6 my-4 ">
                                <div className=''>
                                    <img onClick={Handleclick} className="w-12 h-12 mb-4 cursor-pointer" src={fb} alt=""/>
                                </div>
                                <div className=''>
                                    <img onClick={Handleclick} className="w-12 h-12 mb-4 cursor-pointer" src={google} alt=""/>
                                </div>
                            </div>
        </div>
    )
}