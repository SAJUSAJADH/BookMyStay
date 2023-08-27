import AddIcon from '@mui/icons-material/Add';
import { Link, useParams } from 'react-router-dom';
import Addplace from './Addplace';
import Listedplaces from '../components/bodycomponents/listedplaces';
import Middleware from '../Middleware/privateroutes';


export default function Places(){

    Middleware();

    
    const {component} = useParams();

    

    
    return(<>
       {component != 'addplace' ? 
        <div className="container mx-auto pt-12">
                <div className="flex justify-center">
                    <Link to={"/account/place/addplace"} className="bg-red-500 text-white rounded-full px-4 py-2"><AddIcon/> Add new places</Link>
                </div>
                <div className="flex justify-center text-center lg:justify-start pt-16">
                    <h2 className="font-semibold text-4xl italic">Expand your Business Across the world.</h2>
                </div>
                <div className="flex justify-center text-center lg:justify-start">
                <p className="text-lg py-2 italic">Invite customers from diiferent Nations.</p>
                </div>
                <Listedplaces/>
                <div className='flex justify-center text-center pt-4'>
                    <p className="text-base py-6">Desclaimer: We strongly recommend conducting regular inspections, 
                    addressing any necessary repairs or maintenance promptly, and ensuring that your property meets
                    all necessary legal and safety standards.When guests make a reservation for your property through our website, 
                    a binding agreement is formed between you, as the property owner, and the guest.</p>
                </div>
            </div> :
            <div>
                <Addplace/>
            </div>
            }
        </>
    )
}