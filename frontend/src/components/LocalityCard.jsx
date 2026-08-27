import { Link } from "react-router-dom"

function resolveScore(score){
    if(score>=9){
        return "Amazing"
    }
    else if(score>=8 && score<9){
        return "Very Good"
    }
    else if(score>=7 && score<8){
        return "Good"
    }
    else if(score>=6 && score<7){
        return "Decent"
    }
    else if(score>=5 && score<6){
        return "Average"
    }
    else if(score>=4 && score<5){
        return "Poor"
    }
    else if(score<4){
        return "Very Poor"
    }
    return "Invalid Score"
}
function LocalityCard(props){
    
    return (
        <div className="rounded-4xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img src={props.image} alt="hello" className="h-50 w-80 object-cover"/>

            <div className="flex p-3">
                <div >
                    <p className="text-lg text-slate-800 font-bold">{props.name}</p>
                    <p className="text-slate-600 font-normal text-sm">{props.city}</p>
                </div>

                <div className="flex flex-col justify-center items-center ml-auto bg-emerald-100 rounded-md p-1">

                    <p className="text-emerald-500 font-bold">{props.score}</p>
                    <p className="text-[10px] text-emerald-500 font-bold">{resolveScore(props.score)}</p>
                </div>
            </div>

            <div className="flex flex-col p-3 gap-2">
                <div className="flex w-full">
                    <div className="font-semibold text-slate-500">🚌Connectivity</div>
                    <div className="ml-auto font-semibold text-slate-800">{props.connectivity}</div>
                </div>
                <div className="flex w-full">
                    <div className="font-semibold text-slate-500">🛡️Safety</div>
                    <div className="ml-auto font-semibold text-slate-800">{props.safety}</div>
                </div>
                <div className="flex w-full">
                    <div className="font-semibold text-slate-500">🌳Environment</div>
                    <div className="ml-auto font-semibold text-slate-800">{props.environment}</div>
                </div>
                <div className="flex w-full">
                    <div className="font-semibold text-slate-500">🏙️Lifestyle</div>
                    <div className="ml-auto font-semibold text-slate-800">{props.lifestyle}</div>
                </div>
            </div>

            <Link to="/details" className=" my-3 mx-10 h-8 flex items-center justify-center text-blue-700 bg-sky-200 rounded-md ">View Details ➜</Link>
            
        </div>
    )
}

export default LocalityCard