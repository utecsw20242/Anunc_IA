import React, { useEffect } from "react";
import classNames from "classnames";
import { menuData } from "./menuData";
import { MenuItem } from "./MenuItem"; 

function Menu({ mobile, className }) {
    const compClass = classNames({
        "flex flex-col xl:flex-row xl:items-center gap-x-6 px-4 menu-base": true,
        [`${className}`]: className,
    });
    return (
        <ul className={compClass}>
            {menuData.map((item, index) => (
                <MenuItem
                    text={item.text}
                    tag={item.tag}
                    sub={item.sub}
                    link={item.link}
                    column={item.column}
                    heading={item.heading}
                    key={index}
                    mobile={mobile}
                />
            ))}
        </ul>
    );
}

export default Menu;

