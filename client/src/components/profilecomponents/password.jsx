import { useState } from "react"
import axios from "axios";



export default function Passwordmanager(){

    const [oldpassword, setOldpassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [confirmNewPassword, setConfirmnewpassword] = useState('');
    const [mismatch,setMismatch] = useState(false);
    const [unUsable,setUnUsable] = useState(false);
    const [wrongPassword, setWrongpassword] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);

    const updatePassword = async (ev)=>{
        ev.preventDefault();
        if(newPassword != confirmNewPassword){
            setMismatch(true);
            setTimeout(() => {
                setMismatch(false);
            },2000);
        }else if(oldpassword === newPassword){
            setUnUsable(true);
            setTimeout(() => {
                setUnUsable(false);
            },2000);
        }else{
            const res = await axios.post('/updatepassword',{oldpassword,newPassword});
            if(res.data === 'wrong password'){
                setWrongpassword(true);
                setTimeout(() => {
                    setWrongpassword(false);
                }, 2000);
            }else{
                setUpdateStatus(true);
                setTimeout(() => {
                setUpdateStatus(false);
                },2000);
            }
        }
    }

    return(
        <div className="container mx-0 pt-12">
                                        <h2 className="text-3xl font-bold font-sans">Password Settings</h2>
                                        <div className="grid grid-rows-2">
                                            <div className="grid lg:grid-cols-2 md:space-x-4">
                                                <div className="">
                                                    <div className="my-4">
                                                        <label className="font-semibold">Old password</label><br/>
                                                        <input value={oldpassword} onChange={(ev)=>{setOldpassword(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="password" />
                                                    </div>
                                                    <div className="my-4">
                                                        <label className="font-semibold">New password</label><br/>
                                                        <input value={newPassword} onChange={(ev)=>{setNewpassword(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="password" />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="my-4">
                                                        <label className="font-semibold">Confirm new Password</label><br/>
                                                        <input value={confirmNewPassword} onChange={(ev)=>{setConfirmnewpassword(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="">
                                            {updateStatus && <div className="text-green-700 ">Updated Successfully.....</div>}
                                            {mismatch && <div className="text-red-500 ">Password MisMatch please check again !.</div> }
                                            {unUsable && <div className="text-red-500 ">Password Already Used !.</div> }
                                            {wrongPassword && <div className="text-red-500">Wrong Old password..!</div>}
                                                <button onClick={updatePassword} className="bg-lightblue px-4 py-2 text-white text-xl rounded">update</button>
                                            </div>
                                        </div>
            </div>
    )
}