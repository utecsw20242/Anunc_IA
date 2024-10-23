/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext, useEffect, useLayoutEffect } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

const ThemeProvider = ({ ...props }) => {
    const defaultTheme = {
        mode: "dark",  
        direction: "ltr",
    };
    const [theme, setTheme] = useState(defaultTheme);

    const themeUpdate = {
        mode: function (value) {
            setTheme({ ...theme, mode: value });
        },
        direction: function (value) {
            setTheme({ ...theme, direction: value });
        },
        reset: function (e) {
            setTheme({
                ...theme,
                main: defaultTheme.direction,
                mode: defaultTheme.mode,
            });
        },
    };

    const bodyClass = classNames({
        "min-w-[320px] bg-slate-100 dark:bg-slate-900": true,
    });
    const htmlClass = classNames({
        "dark": theme.mode === 'dark',
    });

    useLayoutEffect(() => {
        document.body.setAttribute('dir', theme.direction);
        document.documentElement.className = htmlClass;
        document.body.className = bodyClass;
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            <ThemeUpdateContext.Provider value={themeUpdate}>
                <Outlet />
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;
