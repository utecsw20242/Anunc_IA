import React from "react";
import classNames from "classnames";
import { ColorPalette, Layers, Login } from "../../../components/icons";
import { Link } from "react-router-dom";

const activityImages = [
    {
        src: "/images/generated/angry-doughnut-at-a-concert.jpg",
        link: "",
        prompt: "Angry doughnut at a concert",
    },
    {
        src: "/images/generated/angry-doughnut-walking-down-the-street.jpg",
        link: "",
        prompt: "Angry doughnut walking down the street",
    },
    {
        src: "/images/generated/baby-bandsaurus-drinking-coffee-with-baby-bottle.jpg",
        link: "",
        prompt: "Baby bandsaurus, drinking coffee with baby bottle",
    },
    {
        src: "/images/generated/happy-ice-cream-sining.jpg",
        link: "",
        prompt: "Happy ice cream sining",
    },
    {
        src: "/images/generated/melted-candle-looks-like-a-fried-chicken-burger-in-pastel-colours.jpg",
        link: "",
        prompt: "Melted candle looks like a fried chicken burger in pastel colours",
    },
    {
        src: "/images/generated/hyper-realistic-modern-sofa-with-pastel-colors-and-white-background-cinematic-light.jpg",
        link: "",
        prompt: "Hyper realistic modern sofa with pastel colors and white background cinematic light",
    },
    {
        src: "/images/generated/hyper-realistic-modern-furniture-with-white-background-and-pastel-colors-cinematic-lights.jpg",
        link: "",
        prompt: "Hyper realistic modern furniture with white background and pastel colors cinematic lights",
    },
    {
        src: "/images/generated/hype-realistic-modern-bed-with-sandy-colors-white-background-and-cinematic-lights.jpg",
        link: "",
        prompt: "Hyper realistic modern bed with sandy colors white background and cinematic lights",
    },
];

function ActivityTimeline({ className }) {
    const compClass = classNames({
        "flex flex-col max-w-xl": true,
        [`${className}`]: className,
    });
    return (
        <div className={compClass}>
            <div className="flex py-2">
                <div className="w-10 h-10 flex-shrink-0 p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full">
                    <Layers />
                </div>
                <div className="w-[calc(100%-theme(space.10))] ps-4 py-1">
                    <h6 className="text-sm font-bold text-slate-600 dark:text-slate-200 mb-1">
                        3 New document created
                    </h6>
                    <p className="text-xs text-slate-400">05:10 PM - Today</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                        <div className="py-2 px-3 rounded-md border border-dashed border-slate-200 dark:border-slate-800">
                            <h6 className="text-slate-600 dark:text-slate-200 font-bold text-xs">
                                10 React Best practices
                            </h6>
                            <span className="text-slate-500 text-xs">
                                <strong>254 </strong>
                                Words
                            </span>
                        </div>
                        <div className="py-2 px-3 rounded-md border border-dashed border-slate-200 dark:border-slate-800">
                            <h6 className="text-slate-600 dark:text-slate-200 font-bold text-xs">
                                Write a useEffect function with clean up
                            </h6>
                            <span className="text-slate-500 text-xs">
                                <strong>624 </strong>
                                Words
                            </span>
                        </div>
                        <div className="py-2 px-3 rounded-md border border-dashed border-slate-200 dark:border-slate-800">
                            <h6 className="text-slate-600 dark:text-slate-200 font-bold text-xs">
                                Hourse riding course for dummys
                            </h6>
                            <span className="text-slate-500 text-xs">
                                <strong>355 </strong>
                                Words
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-2">
                <div className="w-10 h-10 flex-shrink-0 p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full">
                    <ColorPalette />
                </div>
                <div className="w-[calc(100%-theme(space.10))] ps-4 py-1">
                    <h6 className="text-sm font-bold text-slate-600 dark:text-slate-200 mb-1">
                        21 New Images created
                    </h6>
                    <p className="text-xs text-slate-400">
                        03:43 PM - Yesterday
                    </p>
                    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                        {activityImages.map((item, index) => (
                            <Link
                                className="rounded-md border border-slate-200 dark:border-slate-800 relative group overflow-hidden"
                                key={index}
                                to={item.link}
                            >
                                <img
                                    className="rounded-md"
                                    src={item.src}
                                    alt={item.prompt}
                                />
                                <div className="absolute bottom-0 p-3 bg-gradient-to-b from-transparent via-slate-900 via-70% to-slate-900 rounded-b-md transition-all opacity-0 group-hover:opacity-100">
                                    <span className="inline-flex bg-blue-500 text-white px-2 pb-1 text-xs font-bold mb-1 rounded">
                                        prompt
                                    </span>
                                    <span className="text-white text-xs font-bold line-clamp-2">
                                        {item.prompt}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex py-2">
                <div className="w-10 h-10 flex-shrink-0 p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full">
                    <Login />
                </div>
                <div className="w-[calc(100%-theme(space.10))] ps-4 py-1">
                    <h6 className="text-sm font-bold text-slate-600 dark:text-slate-200 mb-1">
                        Logged in on Chrome on windows
                    </h6>
                    <p className="text-xs text-slate-400">
                        03:43 PM - 14 Mar 2023
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ActivityTimeline;
