import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, ButtonIcon, Card } from "../../../components";
import { EyeIcon } from "@heroicons/react/24/outline";

import { transactions, users, currency } from "../../../store";
function ReacentTransactions() {
    return (
        <Card className="h-full">
            <div className="flex flex-col isolate relative">
                <div className="p-5 flex justify-between items-center gap-x-4">
                    <h6 className="text-md font-bold text-slate-700 dark:text-white">
                        Reacent Transactions
                    </h6>
                    <Link
                        to="/admin/transactions"
                        className="font-medium text-sm text-blue-600 hover:text-blue-800"
                    >
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-600">
                    <table className="table-auto w-full text-sm border-t border-slate-200 dark:border-slate-800 border-collapse">
                        <thead className="text-slate-600 dark:text-slate-100">
                            <tr>
                                <th className="text-start px-5 py-2">Info</th>
                                <th className="text-start px-5 py-2">Status</th>
                                <th className="text-start px-5 py-2">Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length ? (
                                transactions.slice(0, 3).map((item, index) => {
                                    const user = users.filter(
                                        (user) => user.id === item.user
                                    );
                                    const currencySymbol = currency.filter(
                                        function (currency) {
                                            return currency.code.includes(
                                                item.currency
                                            );
                                        }
                                    );
                                    return (
                                        <tr key={index}>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <div className="flex items-center">
                                                    <span className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="rounded-full"
                                                            src={user[0].avatar}
                                                            alt={user[0].name}
                                                        />
                                                    </span>
                                                    <div className="ms-3">
                                                        <span className="block text-slate-600 dark:text-slate-100 font-bold text-xs">
                                                            {user[0].name}
                                                        </span>
                                                        <span className="flex text-slate-400 dark:text-slate-300 gap-x-1">
                                                            <span
                                                                className={`block w-max text-[11px] font-bold ${
                                                                    item.plan ===
                                                                    "Strater"
                                                                        ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                                                                        : "text-slate-500 dark:text-slate-200"
                                                                }`}
                                                            >
                                                                {item.plan}
                                                            </span>
                                                            {" - "}
                                                            <span className="block text-slate-500 dark:text-slate-200 text-[11px] font-bold">
                                                                {
                                                                    currencySymbol[0]
                                                                        .symbol
                                                                }
                                                                {item.amount}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <span
                                                    className={`inline-flex px-2 rounded-full text-[11px] font-bold capitalize ${
                                                        item.status == "active"
                                                            ? "bg-emerald-100 text-emerald-500"
                                                            : item.status ==
                                                              "suspended"
                                                            ? "bg-rose-100 dark:bg-rose-950 text-rose-500"
                                                            : "text-slate-500 dark:text-slate-200 bg-slate-100 dark:bg-slate-900"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                                                <span className="block text-slate-600 dark:text-slate-100 text-xs font-bold whitespace-nowrap">
                                                    {moment(
                                                        item.created
                                                    ).format("ll")}
                                                </span>
                                                <span className="block text-slate-500 dark:text-slate-200 text-[11px] font-medium whitespace-nowrap">
                                                    {moment(
                                                        item.created
                                                    ).format("LT")}
                                                </span>
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
                                        <span className="block text-slate-500 dark:text-slate-200 mb-3">
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

export default ReacentTransactions;
