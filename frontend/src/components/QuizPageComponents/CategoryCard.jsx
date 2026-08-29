function CategoryCard({ icon: Icon, title, iconColor, bgColor }) {
    return (
        <div className="flex h-24 flex-col items-center justify-center rounded-xl border bg-white border-slate-200 w-40 ">
            
            <div className={`rounded-lg p-2 ${bgColor}`}>
                <Icon className={`size-5 ${iconColor}`} />
            </div>

            <div className="mt-2 text-sm font-medium text-slate-600">
                {title}
            </div>

        </div>
    );
}

export default CategoryCard;