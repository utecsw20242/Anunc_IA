import React from "react";
import ThemeToggle from "./ThemeToggle";
import DropdownMenu from "./DropdownMenu";

const HeaderActions = () => {
    return (
        <ul className="flex items-center gap-x-3 lg:gap-x-5">
            <li className="inline-flex relative">
                <ThemeToggle />
            </li>
            <li className="inline-flex relative">
                <DropdownMenu />
            </li>
        </ul>
    );
};

export default HeaderActions;
