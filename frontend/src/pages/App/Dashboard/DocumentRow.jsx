import React from "react";
import { Link } from "react-router-dom";
import { ButtonIcon } from "../../../components";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

const DocumentRow = ({ item, icon }) => {
    return (
        <tr>
            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center">
                    <span className="h-6 w-6 block">{icon}</span>
                    <div className="ms-3">
                        <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs whitespace-nowrap">
                            {item.name}
                        </span>
                        <span className="block text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                            {item.tool}
                        </span>
                    </div>
                </div>
            </td>
            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                <span className="block text-slate-600 dark:text-slate-200 text-xs font-bold  whitespace-nowrap">
                    {item.created.split(",")[0]}
                </span>
                <span className="block text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                    {item.created.split(",")[1]}
                </span>
            </td>
            <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 sticky end-0 bg-white dark:bg-slate-950">
                <ul className="flex justify-end gap-2">
                    <li>
                        <ButtonIcon
                            as="Link"
                            to={`/app/documents/edit/${item.id}`}
                            circle
                            size="sm"
                            className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:dark:bg-blue-600 hover:dark:text-white"
                        >
                            <EyeIcon className="h-3 w-3" />
                        </ButtonIcon>
                    </li>
                    <li>
                        <ButtonIcon
                            circle
                            size="sm"
                            className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-rose-600 hover:text-white hover:dark:bg-rose-600 hover:dark:text-white"
                        >
                            <TrashIcon className="h-3 w-3" />
                        </ButtonIcon>
                    </li>
                </ul>
            </td>
        </tr>
    );
};

export default DocumentRow;
