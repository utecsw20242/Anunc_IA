import React from "react";
import { Menu as Dropdown, Transition } from "@headlessui/react";
import {
    PowerIcon,
    RocketLaunchIcon,
    SquaresPlusIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import MenuLink from "./MenuLink";

const DropdownMenu = () => {
    return (
        <Dropdown>
            <Dropdown.Button className="inline-flex h-9 w-9 rounded-full overflow-hidden outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700">
                <img src="/images/avatar/a.jpg" alt="User avatar" />
            </Dropdown.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Dropdown.Items className="absolute end-0 top-10 w-48 bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
                    <div className="p-4 flex items-center">
                        <div className="inline-flex flex-shrink-0 h-10 w-10 rounded-full overflow-hidden outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700">
                            <img src="/images/avatar/a.jpg" alt="User avatar" />
                        </div>
                        <div className="ms-4">
                            <h6 className="text-xs font-bold text-slate-700 dark:text-white -mt-0.5">
                                Phillip Burke
                            </h6>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-blue-500 bg-blue-100 dark:bg-blue-950">
                                Balance $18.89
                            </span>
                        </div>
                    </div>
                    <ul className="py-2 border-t border-slate-200 dark:border-slate-800">
                        <li>
                            <MenuLink to="/admin/dashboard" icon={SquaresPlusIcon} label="Admin" />
                        </li>
                        <li>
                            <MenuLink to="/app/profile" icon={UserIcon} label="Profile" />
                        </li>
                        <li>
                            <MenuLink to="/app/packages" icon={RocketLaunchIcon} label="Upgrade" />
                        </li>
                        <li>
                            <MenuLink to="/login" icon={PowerIcon} label="Logout" />
                        </li>
                    </ul>
                </Dropdown.Items>
            </Transition>
        </Dropdown>
    );
};

export default DropdownMenu;
