import React from "react";
import { ButtonIcon } from "../../../components";
import { templates } from "../../../store";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DataTable } from "../../../components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("name", {
        header: (info) => "Info",
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span className="h-6 w-6 block">{row.original.icon}</span>
                    <div className="ms-3">
                        <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs whitespace-nowrap">
                            {row.original.name}
                        </span>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor("description", {
        header: (info) => "Description",
        cell: (info) => {
            return (
                <>
                    <span className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[160px]">
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
                                ? "bg-emerald-100 text-emerald-500"
                                : info.getValue() == "disabled"
                                ? "bg-rose-100 text-rose-500"
                                : "text-slate-500 dark:text-slate-300"
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
                                circle
                                as="Link"
                                to={`/admin/template-manager/edit/${info.row.original.id}`}
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

function TemplateTable() {
    return (
        <>
            <DataTable columns={columns} tableData={templates} />
        </>
    );
}

export default TemplateTable;
