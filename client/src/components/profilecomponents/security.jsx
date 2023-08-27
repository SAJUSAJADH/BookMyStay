

export default function Security(){
    return(
        <div className="container mx-0 pt-12">
            <h2 className="text-3xl font-bold font-sans">Password Settings</h2>
                <div className="grid grid-rows-2">
                    <div className="grid lg:grid-cols-2 md:space-x-4">
                        <div className="">
                            <div className="my-4">
                                <label className="font-semibold">Login</label><br/>
                                <input className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                            </div>
                            <div className="my-4">
                                <input className="border-2 rounded focus:outline-none  py-1 px-2 border-gray-400" type="checkbox" />
                                <label className="ml-2 font-semibold">Recovery</label>
                            </div>
                        </div>
                        <div className="">
                            <div className="my-4">
                                <label className="font-semibold">Two-factor-auth</label><br/>
                                <input className="border-2 rounded focus:outline-none w-3/4 py-1 px-2 border-gray-400" type="email" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <button className="bg-lightblue px-4 py-2 text-white text-xl rounded">update</button>
                        <button className="bg-gray-300 px-4 py-2 ml-2 text-xl rounded">cancel</button>
                    </div>
                </div>
            </div>
    )
}