import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contextprovider/usercontext";


export default function Accountmanager(){

    const {user} = useContext(UserContext);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [company, setCompany] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [designation, setDesignation] = useState('');
    const [bio, setBio] = useState('');
    const [updateStatus, setUpdateStatus] = useState(false);


    useEffect(() => {
        const fetchdata = async () => {
          try {
            const response = await axios.get('/additionalInfo');
            const { phone, bio, company, designation, firstname, lastname } = response.data.user;
    
            setPhonenumber(phone);
            setBio(bio);
            setCompany(company);
            setDesignation(designation);
            setFirstname(firstname);
            setLastname(lastname);
          } catch (error) {
            console.log('no user');
          }
        };
    
        fetchdata();
      }, []);

    const AdditionalChangeUpdate = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('/profile', { phonenumber, bio, company, designation, firstname, lastname });
          setUpdateStatus(true);
          setTimeout(() => {
                     setUpdateStatus(false);
                   },2000)
          console.log(response);
        } catch (error) {
          console.log(error);
          setUpdateStatus(false);
          alert('updation failed!');
        }
      };
    


    return(
        <div className="container mx-0 pt-12">
                                    <h2 className="text-3xl font-bold font-sans">Account Settings</h2>
                                    
                                        <div className="grid lg:grid-cols-2 md:space-x-4">
                                            <div className="">
                                                <div className="my-4">
                                                    <label className="font-semibold ">FirstName</label><br/>
                                                    <input value={firstname} onChange={(ev)=>{setFirstname(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                                                </div>
                                                <div className="my-4">
                                                    <label className="font-semibold ">Email</label><br/>
                                                    <input value={user?.email} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" readOnly />
                                                </div>
                                                <div className="my-4">
                                                    <label className="font-semibold ">Company</label><br/>
                                                    <input value={company} onChange={(ev)=>{setCompany(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                                                </div>       
                                            </div>
                                            <div className="">
                                                <div className="my-4">
                                                        <label className="font-semibold">LastName</label><br/>
                                                        <input value={lastname} onChange={(ev)=>{setLastname(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                                                    </div>
                                                    <div className="my-4">
                                                        <label className="font-semibold ">Phone no</label><br/>
                                                        <input value={phonenumber} onChange={(ev)=>{setPhonenumber(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                                                    </div>
                                                    <div className="my-4">
                                                        <label className="font-semibold ">Designation</label><br/>
                                                        <input value={designation} onChange={(ev)=>{setDesignation(ev.target.value)}} className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                                                    </div> 
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="font-semibold">Bio</label><br/>
                                            <textarea value={bio} onChange={(ev)=>{setBio(ev.target.value)}} className="w-3/4 px-2 rounded focus:outline-none border-2 border-gray-400" rows="4"></textarea>
                                        </div>
                                        {updateStatus && 
                                            <div className="py-2 text-green-700">Updated Successfully.....</div>
                                        }
                                        <div className="">
                                            <button onClick={AdditionalChangeUpdate} className="bg-lightblue font-bold text-xl rounded px-4 py-2 text-white">update</button>
                                        </div>
                                                                      
        </div>
    )
}