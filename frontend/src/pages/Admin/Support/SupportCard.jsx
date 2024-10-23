import React, { useState } from "react";
import classNames from "classnames";
import {
    Input,
    Select,
} from "../../../components";
import { tickets, users } from "../../../store";
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";

import Pagination from "./Pagination";
import PageStatus from "./PageStatus";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("id", {
        header: (info) => "",
        cell: ({ row }) => {
            const statusClass = classNames({
                "inline-flex px-2.5 py-0.5 border rounded-md text-[11px] font-bold capitalize": true,
                ["bg-emerald-50 dark:bg-emerald-950 border-emerald-100 dark:border-emerald-800 text-emerald-500"]:
                    row.original.status === "active",
                ["bg-sky-50 dark:bg-sky-950 border-sky-100 dark:border-sky-800 text-sky-500"]:
                    row.original.status === "new",
                ["bg-rose-50 dark:bg-rose-950 border-rose-100 dark:border-rose-800 text-rose-500"]:
                    row.original.status === "closed",
            });

            const cratedAt = moment().diff(
                moment(row.original.created),
                "days"
            );
            const user = users.filter(
                (user) => user.id === row.original.createdby
            );
            return (
                <>
                    <div className="flex items-center mb-2">
                        <div className={statusClass}>{row.original.status}</div>
                        <div className="text-blue-500 font-bold text-xs ms-2">
                            Ticket id :{" "}
                            <span className="text-[11px]">
                                #{row.original.id}
                            </span>
                        </div>
                    </div>
                    <Link to={`/admin/support/details/${row.original.id}`}>
                        <h6 className="font-bold text-sm text-slate-600 dark:text-slate-200 line-clamp-2 mb-2">
                            {row.original.title}
                        </h6>
                    </Link>
                    <div className="flex justify-between gap-x-3 mt-6">
                        <div className="flex items-center">
                            <span className="inline-flex rounded-full outline outline-2 outline-offset-1 outline-slate-200 dark:outline-slate-800">
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={user[0].avatar}
                                    alt={user[0].name}
                                />
                            </span>
                            <div className="ms-3">
                                <div className="text-slate-600 dark:text-slate-200 font-bold text-xs mb-1.5">
                                    {user[0].name}
                                </div>
                                <div className="text-xs leading-3 font-medium text-slate-500 dark:text-slate-400">
                                    Asked {cratedAt} days ago
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        },
    }),
];

function SupportCard() {
    const [data, setData] = useState(() => [...tickets]);
    const [globalFilter, setGlobalFilter] = useState("");

    // Update the state when input changes
    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setGlobalFilter(value);
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 12,
            },
        },
    });
    const pageSizeSelect = [
        { name: 12 },
        { name: 20 },
        { name: 40 },
        { name: 60 },
    ];
    const [selected, setSelected] = useState(pageSizeSelect[0]);

    return (
        <>
            <div className="pb-6 flex gap-3 items-center justify-between">
                <div className="w-full xs:w-64">
                    <Input
                        value={globalFilter}
                        onChange={handleFilterChange}
                        placeholder="Search by id"
                    />
                </div>
                <div className="flex items-center gap-x-3">
                    <div className="text-slate-500 dark:text-slate-300 text-sm hidden xs:block">
                        Show
                    </div>
                    <div className="w-16 xs:w-20">
                        <Select
                            selected={selected}
                            options={pageSizeSelect}
                            onChange={(value) => {
                                table.setPageSize(Number(value.name));
                                setSelected(value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                {table.getRowModel().rows.map((row) => (
                    <div
                        key={row.id}
                        className="bg-white dark:bg-slate-950 p-5 rounded-lg border border-slate-200 dark:border-slate-800"
                    >
                        {row.getVisibleCells().map((cell) => (
                            <React.Fragment key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
            <div className="pt-6 flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <Pagination table={table} />
                <PageStatus table={table} />
            </div>
        </>
    );
}

export default SupportCard;
