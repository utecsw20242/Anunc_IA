import React from "react";

const WelcomeCard = ({ name, wordsAvailable, imageCredit, badge }) => {
    return (
        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
            <div className="bg-slate-800 rounded-md border border-slate-800 p-5 h-full">
                <div className="flex flex-col isolate relative h-full">
                    {badge && (
                        <div className="absolute end-0 top-0">
                            <div className="text-[11px] font-medium text-white bg-gradient-to-r from-blue-600 to-pink-500 px-2 py-0.5 rounded">
                                {badge}
                            </div>
                        </div>
                    )}
                    <div className=" absolute end-0 top-0"></div>
                    <div className="mb-auto">
                        <h6 className="font-bold text-xl w-max bg-gradient-to-r from-blue-300 to-pink-500 text-transparent bg-clip-text">
                            Welcome
                        </h6>
                        <div className="font-bold text-sm text-white mt-2">
                            Mr. {name}
                        </div>
                    </div>
                    <div className="flex gap-x-6 mt-4">
                        <div>
                            <div className="text-xs text-slate-300 mt-1">
                                Words Available
                            </div>
                            <div className="text-base font-bold text-slate-100 mt-1">
                                {wordsAvailable}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-300 mt-1">
                                Image Credit
                            </div>
                            <div className="text-base font-bold text-slate-100 mt-1">
                                {imageCredit}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeCard;
