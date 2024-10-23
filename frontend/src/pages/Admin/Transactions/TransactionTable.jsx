import React from "react";
import moment from "moment";
import classNames from "classnames";
import { transactions, users, currency } from "../../../store";

import { DataTable } from "../../../components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("name", {
        header: (info) => "Info",
        cell: ({ row }) => {
            const user = users.filter((user) => user.id === row.original.user);
            return (
                <div className="flex items-center">
                    <span className="flex-shrink-0 h-10 w-10">
                        <img
                            className="rounded-full"
                            src={user[0].avatar}
                            alt={user[0].name}
                        />
                    </span>
                    <div className="ms-3">
                        <span className="block text-slate-600 dark:text-slate-200 font-bold text-sm">
                            {user[0].name}
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {user[0].email}
                        </span>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor("plan", {
        header: (info) => "Plan",
        cell: ({ row }) => {
            const currencySymbol = currency.filter(function (currency) {
                return currency.code.includes(row.original.currency);
            });
            return (
                <div className="flex items-center">
                    <span className="flex flex-col text-slate-400 gap-x-1">
                        <span
                            className={`block w-max text-sm font-bold ${
                                row.original.plan === "Strater"
                                    ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                                    : "text-slate-600 dark:text-slate-200"
                            }`}
                        >
                            {row.original.plan}
                        </span>

                        <span className="block text-slate-500 dark:text-slate-400 text-xs font-medium">
                            {currencySymbol[0].symbol}
                            {row.original.amount}
                        </span>
                    </span>
                </div>
            );
        },
    }),
    columnHelper.accessor("created", {
        header: (info) => "Paid At",
        cell: (info) => {
            return (
                <>
                    <span className="block text-slate-600 dark:text-slate-200 text-xs font-bold whitespace-nowrap mb-0.5">
                        {moment(info.getValue()).format("ll")}
                    </span>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs font-medium">
                        {moment(info.getValue()).format("LT")}
                    </span>
                </>
            );
        },
    }),

    columnHelper.accessor("status", {
        header: (info) => "Status",
        cell: (info) => {
            const compClass = classNames({
                "inline-flex px-2 rounded-full text-[11px] font-bold capitalize": true,
                ["bg-emerald-100 dark:bg-emerald-950 text-emerald-500"]:
                    info.getValue() === "completed",
                ["bg-amber-100 dark:bg-amber-950 text-amber-500"]: info.getValue() === "pending",
                ["bg-sky-100 dark:bg-sky-950 text-sky-500"]: info.getValue() === "upcoming",
                ["bg-rose-100 dark:bg-rose-950 text-rose-500"]: info.getValue() === "rejected",
            });
            return <span className={compClass}>{info.getValue()}</span>;
        },
    }),
];

function TransactionTable() {
    return (
        <>
            <DataTable columns={columns} tableData={transactions} />
        </>
    );
}

export default TransactionTable;
