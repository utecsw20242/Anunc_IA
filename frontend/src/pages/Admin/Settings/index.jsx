import React, { useState } from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs } from "../../../components";
import { NavLink, Outlet } from "react-router-dom";
import {
    AdjustmentsHorizontalIcon,
    UsersIcon,
    BanknotesIcon,
    ShareIcon,
    BellAlertIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

const menuData = [
    {
        name: "General",
        link: "/admin/settings",
        icon: <AdjustmentsHorizontalIcon className="h-full" />,
    },
    {
        name: "Users",
        link: "/admin/settings/users",
        icon: <UsersIcon className="h-full" />,
    },
    {
        name: "Payment",
        link: "/admin/settings/payment",
        icon: <BanknotesIcon className="h-full" />,
    },
    {
        name: "Notifications",
        link: "/admin/settings/notifications",
        icon: <BellAlertIcon className="h-full" />,
    },
    {
        name: "Social Networks",
        link: "/admin/settings/social-networks",
        icon: <ShareIcon className="h-full" />,
    },
];

function Settings() {
    const [pageMenu, setPageMenu] = useState(false);
    const body = document.querySelector("body");
    const observer = new ResizeObserver((entries) => {
        if (entries[0].contentRect.width >= 1140 && pageMenu === true) {
            setPageMenu(false);
        }
    });
    observer.observe(body);
    return (
        <Layout title="Settings">
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Settings
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "Settings" },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <button
                                onClick={() => {
                                    setPageMenu(!pageMenu);
                                }}
                                className="xl:hidden inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 dark:text-slate-300 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200"
                            >
                                <Bars3Icon className="h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div
                            className={`fixed top-20 end-4 xl:static w-60 xl:w-96 bg-white dark:bg-slate-950 px-7 py-5 xl:me-8 rounded-lg border border-slate-200 dark:border-slate-800 xl:block z-[1010] ${
                                !pageMenu ? "hidden" : "block"
                            }`}
                        >
                            <h4 className="text-xl text-slate-700 dark:text-white font-bold mb-3">
                                Settings
                            </h4>
                            <ul>
                                {menuData.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            end
                                            to={item.link}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "flex relative isolate before:content-[''] before:-z-10 before:rounded-md before:absolute before:inset-y-0 before:-inset-x-3 before:bg-blue-100 before:dark:bg-blue-950 before:dark:bg-opacity-50 text-blue-600"
                                                    : "text-slate-500 dark:text-slate-200"
                                            }
                                            onClick={() => {
                                                setPageMenu(false);
                                            }}
                                        >
                                            <div className="flex items-center py-2">
                                                <div className="h-5 me-3">
                                                    {item.icon}
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div
                            onClick={() => {
                                setPageMenu(!pageMenu);
                            }}
                            className={`fixed inset-0 bg-slate-950 bg-opacity-50 z-[1009] transition-all duration-200 ${
                                pageMenu
                                    ? "opacity-100"
                                    : "opacity-0 pointer-events-none"
                            }`}
                        ></div>
                        <Outlet />
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default Settings;
