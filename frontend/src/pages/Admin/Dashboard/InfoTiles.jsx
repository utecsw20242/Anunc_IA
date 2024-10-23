import React from "react";
import {
    ArrowLongUpIcon,
    ArrowLongDownIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../../../components";

function InfoTiles({ title, data, accent }) {
    const thisMonth = isNaN(parseInt(data.thisMonth))
        ? parseInt(data.thisMonth.slice(1))
        : parseInt(data.thisMonth);
    const lastMonth = isNaN(parseInt(data.lastMonth))
        ? parseInt(data.lastMonth.slice(1))
        : parseInt(data.lastMonth);

    const isUp = thisMonth > lastMonth;
    const changeValue = (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(
        2
    );
    return (
        <Card className="relative p-5 h-full">
            <div className="flex flex-col isolate relative">
                <p className="flex items-baseline gap-x-2 -ms-0.5 -mt-1">
                    <span className="text-2xl font-bold tracking-tight text-blue-500">
                        {data.thisMonth}
                    </span>
                    <span
                        className={`inline-flex items-center font-medium text-xs ${
                            isUp ? "text-emerald-500" : "text-rose-500"
                        }`}
                    >
                        {isUp ? (
                            <ArrowLongUpIcon className="h-3 me-0.5" />
                        ) : (
                            <ArrowLongDownIcon className="h-3 me-0.5" />
                        )}
                        {changeValue} %
                    </span>
                </p>
                <h6 className="text-md font-bold text-slate-600 dark:text-white mt-1">
                    {title}
                </h6>
                <div className="flex mt-2 -mx-3">
                    <div className="flex flex-col w-1/2 px-3">
                        <span className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                            Last Month
                        </span>
                        <span className="text-sm font-bold text-slate-600 dark:text-white">
                            {data.lastMonth}
                        </span>
                    </div>
                    <div className="flex flex-col w-1/2 px-3">
                        <span className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                            This Year
                        </span>
                        <span className="text-sm font-bold text-slate-600 dark:text-white">
                            {data.thisYear}
                        </span>
                    </div>
                </div>
            </div>
            {accent && (
                <div className=" absolute h-[1px] w-full bottom-0 start-0 bg-gradient-to-r from-transparent from-10% via-blue-500 to-transparent to-90%"></div>
            )}
        </Card>
    );
}

export default InfoTiles;
