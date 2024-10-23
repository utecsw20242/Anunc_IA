/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

function MenuLink({ to, icon: Icon, label, className }) {
    const linkClass = classNames(
        "flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all",
        className
    );

    return (
        <NavLink to={to} className={linkClass}>
            {Icon && <Icon className="w-4 me-2" />} {/* Renderiza el ícono si se pasa */}
            <span>{label}</span>
        </NavLink>
    );
}

export default MenuLink;
