import React from "react";
import { twMerge } from 'tailwind-merge'

function Logo({ rootClassName, className, classNameDark, classNameWhite }) {
    return (
        <div className={twMerge('flex items-center', rootClassName)}>
            <img className={twMerge('h-16 dark:hidden', className, classNameDark)} src="/logo.png" alt="Logo" />
            <img className={twMerge('h-16 hidden dark:block', className, classNameWhite)} src="/logo-white.png" alt="Logo Blanco" />
        </div>
    );
}


export default Logo;
