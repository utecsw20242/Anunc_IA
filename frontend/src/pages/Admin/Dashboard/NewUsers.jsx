import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, ButtonIcon, Card } from "../../../components";
import { EyeIcon } from "@heroicons/react/24/outline";

import { users } from "../../../store";
function NewUsers() {
    return (
        <Card className="h-full">
            <div className="flex flex-col isolate relative">
                <div className="p-5 flex justify-between items-center gap-x-4">
                    <h6 className="text-md font-bold text-slate-700 dark:text-white">
                        New Users
                    </h6>
                    <Link
                        to="/admin/users"
                        className="font-medium text-sm text-blue-600 hover:text-blue-800"
                    >
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-600 lg:scrollbar-none">
                    <table className="table-auto w-full text-sm border-t border-slate-200 dark:border-slate-800 border-collapse">
                        <thead className="text-slate-600 dark:text-white">
                            <tr>
                                <th className="text-start px-5 py-2">
                                    Document
                                </th>
                                <th className="text-start px-5 py-2">
                                    Joined At
                                </th>
                                <th className="text-start px-5 py-2">Status</th>
                                <th className="text-start px-5 py-2">Plan</th>
                                <th className="sticky end-0 bg-white dark:bg-slate-950"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length ? (
                                users.slice(0, 3).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <div className="flex items-center">
                                                    <span className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="rounded-full"
                                                            src={item.avatar}
                                                            alt={item.name}
                                                        />
                                                    </span>
                                                    <div className="ms-3">
                                                        <span className="block text-slate-600 dark:text-white font-bold text-xs">
                                                            {item.name}
                                                        </span>
                                                        <span className="block text-slate-500 dark:text-slate-300 text-[11px] font-medium">
                                                            {item.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <span className="block text-slate-600 dark:text-white text-xs font-bold whitespace-nowrap">
                                                    {moment(item.joined).format(
                                                        "ll"
                                                    )}
                                                </span>
                                                <span className="block text-slate-500 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap">
                                                    {moment(item.joined).format(
                                                        "LT"
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <span
                                                    className={`inline-flex px-2 rounded-full text-[11px] font-bold capitalize ${
                                                        item.status == "active"
                                                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-500"
                                                            : item.status ==
                                                              "suspended"
                                                            ? "bg-rose-100 dark:bg-rose-950 text-rose-500"
                                                            : "text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-900"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <span
                                                    className={`block w-max text-xs font-bold ${
                                                        item.plan === "Strater"
                                                            ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                                                            : "text-slate-600 dark:text-white"
                                                    }`}
                                                >
                                                    {item.plan}
                                                </span>
                                            </td>
                                            <td className="ps-2 pe-5 py-3 border-t border-slate-200 dark:border-slate-800 sticky end-0 bg-white dark:bg-slate-950">
                                                <ul className="flex justify-end gap-2">
                                                    <li>
                                                        <ButtonIcon
                                                            as="Link"   
                                                            to={`/admin/users/edit/${item.id}`}
                                                            circle
                                                            size="sm"
                                                            className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-white hover:bg-blue-600 hover:dark:bg-blue-600 hover:text-white"
                                                        >
                                                            <EyeIcon className="h-3 w-3" />
                                                        </ButtonIcon>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        className="px-5 py-8 border-t text-center"
                                        colSpan={4}
                                    >
                                        <span className="block text-slate-500 dark:text-slate-300 mb-3">
                                            There is no document to show
                                        </span>
                                        <Button
                                            as="Link"
                                            to="/templates"
                                            className="bg-blue-600 text-white hover:bg-blue-800"
                                        >
                                            Create New
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}

export default NewUsers;
