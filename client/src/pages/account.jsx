import Allplaces from "../components/bodycomponents/allplaces";
import Footer from "../components/bodycomponents/footer";
import Hero from "../components/bodycomponents/hero";
import Offercard from "../components/bodycomponents/offers";
import PropertyType from "../components/bodycomponents/propertytype";
import Searchbar from "../components/bodycomponents/searchbar";
import Trend from "../components/bodycomponents/trendingsection";
import Accountnav from "../components/navbarcomponents/accountnav";
import Switches from "../components/navbarcomponents/switches";
import Middleware from "../Middleware/privateroutes";



export default function Account(){
    Middleware();
    return(
        <>
            <Accountnav/>
            <Switches/>
            <Hero/>
            <Searchbar/>
            <Trend/>
            <Offercard/>
            <PropertyType/>
            <Allplaces/>
            <Footer/>
        </>
    )
}