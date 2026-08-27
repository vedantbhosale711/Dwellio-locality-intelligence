import dwellioLogo from "../assets/logos/dwellioLogo.png"

import {Link} from "react-router-dom";

function Navbar(){
    return (
    <div className="px-15 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div  className="p-3 flex gap-25 ">
            <Link to="/">
                <img src={dwellioLogo} alt="Logo" className="h-10 w-auto" />
            </Link>
            
            
            <div className="flex justify-between items-center w-full max-w-130 ">
                <Link className="text-slate-600 font-medium" to="/explore">Explore</Link>
                <Link className="text-slate-600 font-medium" to="/compare">Compare</Link>
                <Link className="text-slate-600 font-medium" to="/quiz">Find My Locality</Link>
                <Link className="text-slate-600 font-medium">About</Link>
                <Link className="text-slate-600 font-medium">Blog</Link>
            </div>

            <div className="flex ml-auto gap-6 mr-10 items-center">
                <Link className="text-slate-600 font-medium">♡Saved</Link>
                <Link className="bg-blue-500 text-white px-5 py-2 rounded-lg">Sign In</Link>
            </div>

        </div>
    </div>
    )
}

export default Navbar