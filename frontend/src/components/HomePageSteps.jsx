function HomePageSteps(props) {
    return (
        <div className="flex justify-center items-center gap-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl p-3 max-w-150">

            <div className={`${props.lightTheme} h-22 w-22 rounded-full flex justify-center items-center`}>
                <img src={props.icon} alt="icon" className="h-14" />
            </div>

            <div className="flex flex-col p-2 gap-3">
                
                <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center h-7 w-7 rounded-full ${props.theme} text-white`}>
                        {props.id}
                    </span>

                    <div className="font-semibold text-slate-800">
                        {props.heading}
                    </div>
                </div>

                <div className="max-w-60">
                    {props.subtext}
                </div>

            </div>
        </div>
    );
}
export default HomePageSteps;   