import React from "react";
import classNames from "classnames";

function Robot({ className, primaryColor, shadeColor }) {
    const compClass = classNames({
        "h-full": !className,
        [`${className}`]: className,
    });
    const primaryColorClass = classNames({
        "fill-blue-600": !primaryColor,
        [`${primaryColor}`]: primaryColor,
    });
    const shadeColorClass = classNames({
        "fill-blue-300": !shadeColor,
        [`${shadeColor}`]: shadeColor,
    });

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className={compClass}
            >
                <rect x="14" y="20" width="36" height="24" rx="6" ry="6" className={primaryColorClass} />
                <rect x="10" y="16" width="44" height="32" rx="6" ry="6" className={shadeColorClass} />
                <circle cx="22" cy="28" r="4" className={primaryColorClass} />
                <circle cx="42" cy="28" r="4" className={primaryColorClass} />
                <rect x="28" y="36" width="8" height="6" className={primaryColorClass} />
                <rect x="18" y="12" width="6" height="4" className={primaryColorClass} />
                <rect x="40" y="12" width="6" height="4" className={primaryColorClass} />
                <rect x="26" y="4" width="12" height="6" className={primaryColorClass} />
                <path d="M16 50v4h32v-4" className={primaryColorClass} />
                <rect x="24" y="46" width="4" height="8" className={shadeColorClass} />
                <rect x="36" y="46" width="4" height="8" className={shadeColorClass} />
            </svg>
        </>
    );
}

export default Robot;
