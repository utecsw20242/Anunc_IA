import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme, useThemeUpdate } from "../../../provider";

const ThemeToggle = () => {
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();

    const handleThemeChange = () => {
        if (theme.mode === "dark") {
            themeUpdate.mode("light");
        } else {
            themeUpdate.mode("dark");
        }
    };

    return (
        <button
            onClick={handleThemeChange}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
        >
            {theme.mode === "dark" ? <SunIcon className="h-4" /> : <MoonIcon className="h-5" />}
        </button>
    );
};

export default ThemeToggle;
