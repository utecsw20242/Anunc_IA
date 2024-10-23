import React from "react";

const MenuOverlay = ({ setVisibility }) => {
    return (
        <div
            onClick={() => setVisibility(false)}
            className="fixed inset-0 bg-slate-950 bg-opacity-50 z-[1019]"
        ></div>
    );
};

export default MenuOverlay;
