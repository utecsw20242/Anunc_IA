import React from "react";
import { ButtonIcon } from "../../../components";
import { packages, currency } from "../../../store";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { DataTable } from "../../../components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("name", {
        header: (info) => "Name",
        cell: ({ row }) => {
            return (
                <div className="flex items-baseline">
                    <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs">
                        {row.original.name}
                    </span>

                    {row.original.name === "Free" && (
                        <span className="ms-1 text-[10px] font-semibold leading-3 text-slate-500 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-1 py-1 rounded">
                            Default
                        </span>
                    )}
                </div>
            );
        },
    }),
    columnHelper.accessor("price.monthly", {
        header: (info) => "Price",
        cell: (info) => {
            const currencySymbol = currency.filter(function (currency) {
                return currency.code.includes(info.row.original.currency);
            });
            return (
                <div className="flex flex-col">
                    <div className="text-xs text-slate-600 dark:text-slate-200 font-bold">
                        {currencySymbol[0].symbol}
                        {info.getValue()}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Month
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor("subscriber", {
        header: (info) => "Subscriber",
        cell: (info) => {
            return (
                <>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {info.getValue()}
                    </span>
                </>
            );
        },
    }),

    columnHelper.accessor("status", {
        header: (info) => "Status",
        cell: (info) => {
            return (
                <>
                    <span
                        className={`inline-flex px-2 rounded-full text-[11px] font-bold capitalize ${
                            info.getValue() == "active"
                                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-500"
                                : info.getValue() == "disabled"
                                ? "bg-rose-100 dark:bg-rose-950 text-rose-500"
                                : "text-slate-500"
                        }`}
                    >
                        {info.getValue()}
                    </span>
                </>
            );
        },
    }),
    columnHelper.display({
        id: "tableAction",
        header: (info) => "",
        cell: (info) => {
            return (
                <>
                    <ul className="flex justify-end gap-2">
                        <li>
                            <ButtonIcon
                                as="Link"
                                to={`/admin/package-manager/edit/${info.row.original.id}`}
                                circle
                                size="sm"
                                className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:dark:bg-blue-600 hover:dark:text-white"
                            >
                                <PencilIcon className="h-3 w-3" />
                            </ButtonIcon>
                        </li>
                        <li>
                            <ButtonIcon
                                circle
                                size="sm"
                                className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-rose-600 hover:text-white hover:dark:bg-rose-600 hover:dark:text-white"
                            >
                                <XMarkIcon className="h-3 w-3" />
                            </ButtonIcon>
                        </li>
                    </ul>
                </>
            );
        },
    }),
];

function PackageTable() {
    return (
        <>
            <DataTable columns={columns} tableData={packages} />
        </>
    );
}

export default PackageTable;
