import {Routes,Route} from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import Account from "../pages/account";
import axios from "axios";
import Signin from "../pages/signin";
import { UserContextProvider } from "../contextprovider/usercontext";
import Profile from "../pages/profile";
import Editlistedplaces from "../pages/editlistedplaces";
import Bookplace from "../pages/bookplace";
import BookingInfo from "../pages/bookinginfo";
import SearchResult from "../pages/searchresults";
import Help from "../pages/help";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true


export default function Mainrouter(){
    return(
        <>
            <UserContextProvider>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/signin'} element={<Signin/>}/>
                    <Route path={'/account'} element={<Account/>}/>
                    <Route path={'/account/:subpage'} element={<Profile/>}/>
                    <Route path={'/account/:subpage/:component'} element={<Profile/>}/>
                    <Route path={'/account/place/edit/:id'} element={<Editlistedplaces/>} />
                    <Route path={'/account/book/:id'} element={<Bookplace/>}/>
                    <Route path={'/book/:id'} element={<Bookplace/>}/>
                    <Route path={'/account/booking/:id'} element={<BookingInfo/>}/>
                    <Route path={"/account/search/:query"} element={<SearchResult/>} />
                    <Route path={"/search/:query"} element={<SearchResult/>} />
                    <Route path={'/account/faq'} element={<Help/>}/>
                    <Route path={'/faq'} element={<Help/>}/>
                </Routes>
            </UserContextProvider>       
        </>
    )
}