import Accountnav from "../components/navbarcomponents/accountnav";
import Switches from "../components/navbarcomponents/switches";
import profilepic from '../components/images/defaultavatar.jpg';
import { Link, useParams } from "react-router-dom";
import Accountmanager from "../components/profilecomponents/accountsettings";
import Passwordmanager from "../components/profilecomponents/password";
import Security from "../components/profilecomponents/security";
import Application from "../components/profilecomponents/application";
import Notifications from "../components/profilecomponents/notifications";
import { useEffect } from "react";
import Places from "./places";
import Footer from "../components/bodycomponents/footer";
import { useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import Bookinghistory from "./bookinghistory";
import Middleware from "../Middleware/privateroutes";



export default function Profile(){

    Middleware();

    const {subpage} = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [photoAvailable,setPhotoAvailable] = useState(null);
    const [isImage,setisImage] = useState(false);

    useEffect(()=>{
        axios.get('/upload').then(response=>{
         
         if(response.data?.image){
           setPhotoAvailable(response.data.image);
           setisImage(true);
         }
        })
     },[])

    const addClass = (type = null) => {
        let classes="rounded-full px-4 py-2 font-bold text-white bg-slate-400";
        if(type === subpage){
            classes = "rounded-full px-4 py-2 font-bold text-white bg-red-500"
        }
        return classes;
    }

    
    let {component} = useParams();
    

    const listClass = (type = null) => {
        if(component === undefined){
            component = 'accountmanager'
        }
        let classes = "flex justify-start px-4 py-6 text-xl border-b-2 cursor-pointer";
        if(type === component){
            classes = "flex justify-start px-4 py-6 text-xl cursor-pointer bg-lightblue text-white"
        }
        return classes;
    }

    const HandleFileChange = async (ev) => {
        setSelectedFile(ev.target.files[0]);
      };

    const HandleUpload = async () => {
        if (selectedFile) {
          const imageRef = ref(storage, `profile/${selectedFile.name + v4()}`);
          await uploadBytes(imageRef, selectedFile)
          const latestImageUrl = await getDownloadURL(imageRef);
          const res = await axios.post('/upload',{latestImageUrl});
          if(res.data.user.image){
            setPhotoAvailable(res.data.user.image)
            setisImage(true);
          }
          
        }
      };


    return(
        <>
            <Accountnav/>
            <Switches/>
            <div className="pt-8 flex justify-evenly">
                <Link to={"/account/profile/accountmanager"}><button className={addClass('profile')}>Profile</button></Link>                
                <Link to={"/account/booking"}><button className={addClass('booking')}>bookings</button></Link>
                <Link to={"/account/place"}><button className={addClass('place')}>places</button></Link>            
            </div>

            { subpage === 'profile' &&
                <div className="container mx-auto p-6">
                <h2 className="font-sans font-bold text-4xl">Account Settings</h2>
                <div className="container mx-auto py-4 z-30 shadow-2xl mt-12">
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 space-x-16">
                        <div className="pt-12">
                        <div className="flex justify-center">
                            <input id="profilepic" type="file" multiple hidden onChange={HandleFileChange} />
                            <label htmlFor="profilepic" className="rounded-full cursor-pointer "><img className="rounded-full w-[120px] h-[120px]" src={isImage ? photoAvailable : profilepic} alt=""/></label>
                        </div> 
                            <div className="pt-4 flex justify-center">
                                <button onClick={HandleUpload} className="bg-lightblue px-4 py-2 text-white rounded text-xl font-semibold">upload</button>
                            </div>
                            <div className="pt-4">
                                <div ><Link to={'/account/profile/accountmanager'} className={listClass('accountmanager')}>Account</Link></div>
                                <div ><Link to={'/account/profile/password'} className={listClass('password')}>Password</Link></div>
                                <div ><Link to={'/account/profile/security'} className={listClass('security')}>Security</Link></div>
                                <div ><Link to={'/account/profile/applications'} className={listClass('applications')}>Applications</Link></div>
                                <div ><Link to={'/account/profile/notifications'} className={listClass('notifications')}>Notifications</Link></div>
                            </div>
                        </div>
                        <div className="lg:col-span-3 text-start">
                            {component === 'accountmanager' && 
                                <Accountmanager/>
                            }
                            {component === 'password' && 
                                <Passwordmanager/>
                            }
                            {component === 'security' &&
                                <Security/>
                            }
                            {component === 'applications' && 
                                <Application/>
                            }
                            {component === 'notifications' && 
                                <Notifications/>
                            }
                        </div>
                    </div>
                </div>
            </div>}
            {subpage === 'place' &&
                <Places/>
            }
            {subpage === 'booking' &&
                <Bookinghistory/>
            }
            <Footer/>
        </>
    )
}