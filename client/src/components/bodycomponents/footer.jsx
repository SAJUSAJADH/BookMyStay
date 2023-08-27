import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';



export default function Footer(){
    return(<>
        <div className="bg-blue  grid grid-rows-4  mt-4">
            <div className="flex justify-center pt-2 space-x-4">
                <a href="" className="text-white"><TwitterIcon/></a>
                <a href="" className="text-white"><FacebookIcon/></a>
                <a href="" className="text-white"><WhatsAppIcon/></a>
                <a href="" className="text-white"><YouTubeIcon/></a>
                <a href="" className="text-white"><InstagramIcon/></a>
                <a href="" className="text-white"><TelegramIcon/></a>
            </div>
            <div className=" row-span-2 flex  justify-center">
                <div className='grid lg:grid-cols-4 gap-4'>
                    <div>
                        <h2 className="text-white font-bold texl-xl pt-2">Sign up for our Newsletter</h2>
                    </div>
                    <div className=" col-span-2">
                        <input className="focus:outline-none rounded text-gray w-full text-[#777] p-2"  />
                        <p className='text-white text-base text-center'>Email-address</p>
                    </div>
                    <div className='flex items-center justify-center md:inline'>
                        <button className="flex px-2 py-2 justify-center border-2 border-[#fff] rounded text-white hover:text-black hover:bg-white">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="text-white grid grid-rows-2 text-center justify-center py-2">
            <div>
                <p className="text-base">Save time, save money!</p>
            </div>
            <div>
            <p className="text-base">Sign up and we'll send the best deals to you</p>
            </div>
            </div>
        </div>
        <div className='bg-[#052c65] flex justify-center text-white p-2'>
                © 2023 Copyright: BookMyStay.com
        </div>
        </>
    )
}