import { useContext } from "react"
import { UserContext } from "../contextprovider/usercontext"
import Nav from '../components/navbarcomponents/nav'
import Accountnav from '../components/navbarcomponents/accountnav'
import Footer from '../components/bodycomponents/footer'




function Help(){

    const {user} = useContext(UserContext);

    return(
        <>
        {!user ? <Nav/> : <Accountnav/>}
        <div className="container mx-auto mt-12 text-center lg:text-start">
            <h2 className="text-3xl italic font-semibold">FAQ</h2>
            <div className="grid grid-rows-6 text-center lg:text-start">
                <div className="">
                    <h2 className="text-xl text-[#0dcaf0] py-2">Q: How do I make a hotel reservation online?</h2>
                    <p className="text-lg">A: Making a hotel reservation is simple! Go to our website's homepage, Browse through the available hotels and select the one that suits your preferences and budget. Enter your destination, check-in and check-out dates, and the number of guests. Click on "Book Now" and follow the prompts to complete the reservation securely.</p>
                </div>
                <div className="">
                    <h2 className="text-xl text-[#0dcaf0] py-2">Q: Can I modify or cancel my hotel reservation?</h2>
                    <p className="text-lg">Yes, you can modify or cancel your hotel reservation through our website. Log in to your account and access your bookings. Select the reservation you wish to modify or cancel, and follow the instructions provided. Please note that cancellation policies may vary depending on the hotel and booking conditions.</p>
                </div>
                <div className="">
                    <h2 className="text-xl text-[#0dcaf0] py-2">Q: What payment methods do you accept for hotel reservations?</h2>
                    <p className="text-lg">We accept a variety of payment methods, including major credit cards (Visa, Mastercard, American Express), and popular online payment platforms. Rest assured, our payment process is secure and encrypted to protect your personal information.</p>
                </div>
                <div className="">
                    <h2 className="text-xl text-[#0dcaf0] py-2">Q: Is my credit card information secure when booking through your website?</h2>
                    <p className="text-lg">Absolutely! We take your privacy and security seriously. Our website uses industry-standard SSL encryption to protect your credit card information during the booking process. Your data is transmitted securely, ensuring it remains confidential.</p>
                </div>
                <div className="">
                    <h2 className="text-xl text-[#0dcaf0] py-2">Q: Do I need to pay for my hotel reservation in advance?</h2>
                    <p className="text-lg">It depends on the hotel's booking policy and the type of rate you choose. Some rates may require prepayment, while others allow payment upon arrival. The payment details will be provided during the booking process. Be sure to review the terms and conditions before finalizing your reservation.</p>
                </div>
                <div className="">
                    <h2 className="text-xl text-[#0dcaf0] py-2">Q: What amenities are included in the hotel room rate?</h2>
                    <p className="text-lg">The amenities included in the hotel room rate vary depending on the property. Generally, the room rate covers standard amenities like Wi-Fi, toiletries, and access to common facilities such as the gym or swimming pool. For specific amenities, check the hotel's description and facilities section on our website.</p>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Help;