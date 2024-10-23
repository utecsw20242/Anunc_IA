import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const MenuToggleButton = ({ setVisibility }) => {
    return (
        <button
            onClick={() => setVisibility(true)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200"
        >
            <Bars3Icon className="h-5" />
        </button>
    );
};

export default MenuToggleButton;
