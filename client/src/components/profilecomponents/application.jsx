

export default function Application(){
    return(
        <div className="container mx-0 pt-12">
            <h2 className="text-3xl font-bold font-sans">Application Settings</h2>
            <div className="my-4">
                <input className="border-2 rounded focus:outline-none  py-1 px-2 border-gray-400" type="checkbox" />
                <label className="ml-2 font-semibold">Dark mode</label>
            </div>  
        </div>
    )
}