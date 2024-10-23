/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import classNames from "classnames";
import { MenuItem } from "./MenuItem"; 

export function MenuSub({ className, sub, column, mobile }) {
    const compClass = classNames({
        ["relative py-2"]: true,
        ["xl:grid"]: column,
        ["xl:grid-cols-2 [&_.heading]:col-span-2"]: column === "2",
        ["xl:grid-cols-3 [&_.heading]:col-span-3"]: column === "3",
        [`${className}`]: className,
    });
    return (
        <ul className={compClass}>
            {sub.map((item, index) => (
                <MenuItem
                    text={item.text}
                    tag={item.tag}
                    sub={item.sub}
                    link={item.link}
                    divider={item.divider}
                    label={item.label}
                    column={item.column}
                    heading={item.heading}
                    key={index}
                    dropdown={true}
                    mobile={mobile}
                />
            ))}
        </ul>
    );
}
