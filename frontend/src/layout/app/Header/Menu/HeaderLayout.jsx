import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../global/Logo";

const HeaderLayout = ({ children, MenuComponent }) => {
    return (
        <div className="flex items-center justify-between w-full">
            {/* Logo a la izquierda */}
            <div className="flex items-center gap-x-2">
                <Link className="flex-shrink-0" to="/app">
                    <Logo />
                </Link>
            </div>
            
            {/* Menú centrado solo en pantallas grandes */}
            <div className="hidden xl:flex flex-1 justify-center">
                {MenuComponent}
            </div>

            {/* Acciones a la derecha */}
            <div className="flex items-center gap-x-3 lg:gap-x-5">
                {children}
            </div>
        </div>
    );
};
export default HeaderLayout;