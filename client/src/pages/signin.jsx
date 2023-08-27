import google from "../components/images/google.png";
import fb from "../components/images/fb.png";
import { useState } from 'react';
import axios from 'axios';
import Nav from "../components/navbarcomponents/nav";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contextprovider/usercontext";
import Publicroute from "../Middleware/publicroutes";
import Auth from "../components/bodycomponents/auth";


export default function Signin(){

    Publicroute();

    const {setUser} = useContext(UserContext);
    const router = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Submit = async (event) => {
        event.preventDefault();
        try{
            const res = await axios.post('/signin',{email,password})
            if(res.data?.email === email){
                setUser(res.data)
                router('/account');
            }if(res.data === "#errorcode"){
                console.log('invalid user id or password')
            }

        }catch(error){
            console.log(error)
        }
        
    }

    return(<>
        <Nav/>
        <div className="flex items-center justify-center ">
                <div className="max-w-screen-md p-4 mt-16">
                    <form method="POST">
                        <div className="">
                        <h2 className="text-xl font-bold font-sans my-6">Sign in </h2>
                        <label className="text-base font-semibold font-sans">Email address</label><br/>
                        <input value={email} onChange={ev=>setEmail(ev.target.value)} type='email' className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2] " placeholder='youremail@example.com'></input><br/>
                        <label className="text-base font-semibold font-sans">Password</label><br/>
                        <input value={password} onChange={ev=>setPassword(ev.target.value)} type='password' className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2] " placeholder='password'></input>
                        <div className="my-4 w-full flex justify-center">
                            <Link href="" onClick={Submit}  className="px-14 py-3 bg-blue opacity-95 text-white hover:opacity-100 rounded hover:shadow-xl font-bold ">Sign in</Link>
                        </div>
                        {/*<Auth/>*/}
                        </div>
                    </form>
                </div>
            </div>
            </>
    )
}