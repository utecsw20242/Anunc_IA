import React from "react";
import moment from "moment";
import { ButtonIcon } from "../../../components";
import { coupons } from "../../../store";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { DataTable } from "../../../components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("title", {
        header: (info) => "Title",
        cell: ({ row }) => {
            return (
                <div className="flex gap-1 items-baseline">
                    <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs  whitespace-nowrap">
                        {row.original.title}
                    </span>

                    <span className="ms-1 text-[10px] font-semibold leading-3 text-slate-500 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-1 py-1 rounded">
                        {row.original.discount}
                    </span>
                </div>
            );
        },
    }),
    columnHelper.accessor("code", {
        header: (info) => "Code",
        cell: ({ row }) => {
            return (
                <div className="text-sm font-bold leading-3 text-slate-600 dark:text-slate-200">
                    "{row.original.code}"
                </div>
            );
        },
    }),
    columnHelper.accessor("avilable", {
        header: (info) => "Counts",
        cell: ({ row }) => {
            return (
                <>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                        {row.original.redeemed} Redeemed
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-200 font-bold">
                        {row.original.avilable - row.original.redeemed} Avilable
                    </div>
                </>
            );
        },
    }),
    columnHelper.accessor("expdate", {
        header: (info) => "Exp Date",
        cell: (info) => {
            const date = moment(info.getValue()).format("ll");
            return (
                <>
                    <span className="block text-slate-600 dark:text-slate-200 text-xs font-bold whitespace-nowrap">
                        {date}
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
                                to={`/admin/coupons/edit/${info.row.original.id}`}
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

function CouponTable() {
    return (
        <>
            <DataTable columns={columns} tableData={coupons} />
        </>
    );
}

export default CouponTable;
