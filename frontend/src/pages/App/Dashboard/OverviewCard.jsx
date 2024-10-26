import React from "react";
import { Link } from "react-router-dom";

const OverviewCard = ({ icon: Icon, value, description, link, linkText, badge }) => {
    return (
        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
            <div className="bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 p-5 h-full">
                <div className="flex flex-col isolate relative">
                    {badge && (
                        <div className="absolute end-0 top-0">
                            <div className="text-[11px] font-medium text-white bg-gradient-to-r from-blue-600 to-pink-500 px-2 py-0.5 rounded">
                                {badge}
                            </div>
                        </div>
                    )}
                    <div className="h-16 opacity-30 -mb-8 relative -z-10">
                        <Icon />
                    </div>
                    <div className="mt-2 ms-1">
                        <p className="flex items-baseline gap-x-2 -ms-0.5">
                            <span className="text-4xl font-bold tracking-tight text-blue-500">
                                {value}
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-slate-500 dark:text-slate-400">
                                Este Mes
                            </span>
                        </p>
                        <h6 className="text-md font-bold text-slate-700 dark:text-white mb-1">
                            {description}
                        </h6>
                        {link && (
                            <Link
                                to={link}
                                className="font-medium text-sm text-blue-600 hover:text-blue-800"
                            >
                                {linkText}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewCard;
