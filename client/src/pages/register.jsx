import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from '../components/navbarcomponents/nav';
import Publicroute from "../Middleware/publicroutes";
import Auth from "../components/bodycomponents/auth";

 

 export default function Register(){

    Publicroute();

  const router = useNavigate();
  const [page, setPage] = useState(0);
  const [isValid, setIsvalid] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isUserExist, setIsuserExist] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(()=>{
    let timer;
    setTimeout(() => {
        setIsvalid(false)
    }, 2000);
    return () => clearTimeout(timer);
  },[isValid])

  useEffect(()=>{
    let timer;
    setTimeout(() => {
        setValidPassword(false)
    }, 1000);
    return () => clearTimeout(timer);
  },[validPassword])

  useEffect(()=>{
    let timer;
    setTimeout(() => {
        setIsuserExist(false)
    }, 2000);
    return () => clearTimeout(timer);
  },[isUserExist])


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailResult = emailRegex.test(username);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}|;:'",.<>/?]).{8,}$/;
  const passwordResult = passwordRegex.test(password);
  

  const HandleClick = () => {
        
        if(page === 0 && emailResult){
            setPage(page + 1);
        }
        if(!emailResult){
            setIsvalid(true)
        }
  }

  const Submit = async (ev) => {
    ev.preventDefault();
    try{
        const {data} = await axios.post('/register',{username, password})
        console.log(data)
        if(data.email === username){
            alert('registration successfull please login')
            router('/signin');
        }else{
            alert("registration failed")
        }
    }catch(error){
        console.log(error)
    }
  }

    return(<>
    <Nav/>
        <div className="flex items-center justify-center ">
        <div className="max-w-screen-md p-4 mt-16">
        <form>
            <div className="">
                {page === 0 ? <>
                    <h2 className="text-xl font-bold font-sans my-6">Create an account</h2>
                        <label className="text-base font-semibold font-sans">Email address</label><br/>
                        <input value={username} onChange={ev=>{setUsername(ev.target.value)}} type='email' className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-2 lg:px-11 bg-[#f2f2f2] " placeholder='youremail@example.com'></input>
                        {isValid && <div className="flex justify-center">
                            <p className="text-blue">Invalid Email address</p>
                        </div>}
                        <div className="my-4 w-full flex justify-center">
                            <Link href="#" onClick={HandleClick} className="px-4 lg:px-14 py-3  hover:bg-orange bg-blue opacity-95 text-white hover:opacity-100 rounded hover:shadow-xl font-bold ">Continue with email</Link>
                        </div>
                        {/*<Auth/>*/}
                        </>
                        :
                        <>
                            <h2 className="text-xl font-bold font-sans my-6">Create password</h2>
                            <label className="text-base font-semibold font-sans">Password</label><br/>
                            <input value={password} onChange={ev=>setPassword(ev.target.value)} type='password' className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-2 lg:px-11 bg-[#f2f2f2] " placeholder='Enter a password'></input><br/>
                            <label className="text-base font-semibold font-sans">Confirm password</label><br/>
                            <input value={confirmPassword} onChange={ev=>setConfirmPassword(ev.target.value)} type='password' className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-2 lg:px-11 bg-[#f2f2f2] " placeholder='Confirm your password'></input>
                            {validPassword && <div className="flex justify-center">
                            <p className="text-orange">Password is weak</p>
                            </div>}
                            {password != confirmPassword && <>
                                {!validPassword && <>
                                    {confirmPassword.length > 0 && <div className="flex justify-center">
                                    <p className="text-orange">Password Mismatch</p>
                                    </div>}
                                </>}
                            </>}
                            {isUserExist && <div className="flex justify-center">
                                    <p className="text-orange">This email is already registered</p>
                                    </div>}
                            <div className="my-4 w-full flex justify-center">
                                <Link href="/" onClick={Submit} className="px-4 lg:px-14 py-3 bg-blue opacity-95 text-white hover:opacity-100 rounded hover:shadow-xl font-bold ">Create account</Link>
                            </div>  
                        </>
                }
            </div>
        </form>
      </div>
    </div>
    </>
    
  )
    
 }
 