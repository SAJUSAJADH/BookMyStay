import Publicroute from "../Middleware/publicroutes";
import Allplaces from "../components/bodycomponents/allplaces";
import Card from "../components/bodycomponents/card";
import Footer from "../components/bodycomponents/footer";
import Hero from "../components/bodycomponents/hero";
import Offercard from "../components/bodycomponents/offers";
import PropertyType from "../components/bodycomponents/propertytype";
import Searchbar from "../components/bodycomponents/searchbar";
import Trend from "../components/bodycomponents/trendingsection";
import Nav from "../components/navbarcomponents/nav";
import Switches from "../components/navbarcomponents/switches";




export default function Home(){

    Publicroute();

    return(
        <>
            <Nav/>
            <Switches/>
            <Hero/>
            <Searchbar/>
            <Trend/>
            <Offercard/>
            <PropertyType/>
            <Allplaces/>
            <Card/>
            <Footer/>
        </>
    )
}