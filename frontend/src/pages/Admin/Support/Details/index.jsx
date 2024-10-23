import React, { useState, useRef, useEffect } from "react";
import { useNavigate , useParams, useLocation } from "react-router-dom";
import Layout from "../../../../layout/dashboard";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";
import { Breadcrumbs, ButtonIcon, Input, } from "../../../../components";
import { tickets, users } from "../../../../store";
import { PaperAirplaneIcon, Bars3Icon } from "@heroicons/react/24/outline";
import SimpleBar from 'simplebar-react';
import classNames from "classnames";

function SupportMessages() {

    const { supportId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const ticket = tickets.find((item) => item.id === supportId);
    const activeUser = users.find( (user) => user.id === ticket.createdby);

    const [showList, setShowList] = useState(false);

    const convoDetails = useRef(null);

    useEffect(() => {
        if (convoDetails.current) {
            const scrollElement = convoDetails.current.contentWrapperEl;
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, [ticket])

    return (
        <Layout title={`Update - #${ticket.id}`}>
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3 flex-wrap gap-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Support Center
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "Support", link: "/admin/support" },
                                    { text:  '#' + ticket.id},
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flex-grow-1 relative isolate flex max-h-[calc(100vh-theme(space.64))] min-h-[calc(100vh-theme(space.64))] h w-full overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                        <div id="convoAside" className={classNames({
                            "peer absolute z-20 flex h-full w-72 -translate-x-full flex-col border-e border-slate-200 bg-white duration-300 dark:border-slate-800 dark:bg-slate-950 max-lg:transition-all lg:static lg:h-auto lg:w-1/4 lg:!translate-x-0 rtl:translate-x-full [&.active]:translate-x-0":true,
                            "active" : showList
                        })} >
                            <SimpleBar className="h-full max-h-full flex-grow p-6" >
                                <div className="grid grid-cols-1 gap-8">
                                    {tickets.map((item,index)=> {
                                        const user = users.find( (user) => user.id === item.createdby);
                                        return(
                                            <a onClick={(event)=> { event.preventDefault(); setShowList(false); navigate(`/admin/support/details/${item.id}`);}} href="#" key={index} className={classNames({
                                                "relative isolate flex cursor-pointer before:absolute before:-inset-3 before:-z-10 before:rounded-md before:transition-all before:duration-300 before:content-[''] before:border before:border-slate-100 before:dark:border-slate-800 hover:before:border-slate-200 hover:before:dark:border-slate-800 hover:before:bg-slate-50 hover:before:dark:bg-slate-900 [&.active]:before:bg-slate-50 [&.active]:before:dark:bg-slate-900 [&.active]:before:border-slate-200 [&.active]:before:dark:border-slate-800 [&.active]:before:ring-2 [&.active]:before:ring-blue-100 [&.active]:before:dark:ring-blue-950" :true,
                                                "active" : item.id == ticket.id
                                            })}>
                                                <div className="inline-flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-slate-700">
                                                    <img src={user.avatar} alt={user.name} />
                                                </div>
                                                <div className="ms-3 -mt-0.5">
                                                    <div className={classNames({"inline-flex rounded-md border px-2 py-0.5 text-[9px] font-bold capitalize mb-2" : true,
                                                        "border-emerald-100 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-500": item.status === 'active',
                                                        "border-sky-100 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 text-sky-500":item.status === 'new',
                                                        "border-rose-100 dark:border-rose-800 bg-rose-50 dark:bg-rose-950 text-rose-500": item.status === 'closed',
                                                    })}>
                                                        {item.status}
                                                    </div>
                                                    <div className="mb-1 text-xs font-bold text-slate-700 dark:text-white">
                                                        {user.name} - <span className="text-blue-500 text-[11px]">#{item.id}</span>
                                                    </div>
                                                    <div className="line-clamp-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        {item.title}
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    })}
                                </div>
                            </SimpleBar>
                        </div>
                        <div data-target="#convoAside" onClick={()=> setShowList(false)} className="class-toggle absolute inset-0 z-10 hidden bg-slate-950 bg-opacity-20 peer-[.active]:block lg:!hidden"></div>
                        <div className="z-0 flex w-full flex-col lg:w-3/4">
                            <div className="flex h-full flex-col justify-stretch">
                                <div className="h-15 flex items-center justify-between border-b border-slate-200 px-6 py-3 dark:border-slate-800">
                                    <div className="flex items-center">
                                    <div className="inline-flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-slate-800" >
                                        <img src={activeUser.avatar} alt={activeUser.name} />
                                    </div>
                                    <div className="ms-3">
                                        <h4 className="line-clamp-1 text-xs font-bold text-slate-600 dark:text-slate-200" >
                                            {activeUser.name} - <span className="text-blue-500 text-[11px]">#{ticket.id}</span>
                                        </h4>
                                        <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400" >
                                            {ticket.last} ago
                                        </div>
                                    </div>
                                    </div>
                                    <button data-target="#convoAside" onClick={()=> setShowList(!showList)} className="class-toggle -my-1 -me-2 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-600 lg:hidden [&.active]:bg-slate-200 [&.active]:text-slate-600" >
                                        <Bars3Icon className="h-5" />
                                    </button>
                                </div>
                                <SimpleBar ref={convoDetails} className="h-full max-h-full flex-grow overflow-auto p-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        { ticket?.replys?.map((item,index)=> {
                                            return(
                                                <div key={index} className={`${item.from == 'support' ? 'flex-row-reverse' : ''} flex flex-wrap items-end gap-x-4`}>
                                                    <div className="inline-flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-slate-700" >
                                                        { item.from == "user" && <img src={activeUser.avatar} alt={activeUser.name} />}
                                                        { item.from == "support" && <img src="/images/avatar/a.jpg" alt="Phillip Burke" />}
                                                    </div>
                                                    <div className={classNames({
                                                        "max-w-md rounded-md px-4 py-3": true,
                                                        "bg-blue-50 dark:bg-blue-950": item.from == 'support',
                                                        "bg-slate-100 dark:bg-slate-900" :item.from == 'user'
                                                    })}>
                                                        <p className="text-sm text-slate-500 dark:text-slate-300">
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                    <ul className={classNames({
                                                        "w-full flex items-center gap-x-1 text-slate-500 dark:text-slate-300 mt-2": true,
                                                        "flex-row-reverse pe-14": item.from == 'support',
                                                        "ps-14": item.from == 'user'
                                                    })}>
                                                        <li className="text-xs/4 font-bold">
                                                            { item.from == "user"  && activeUser.name}
                                                            { item.from == "support"  && 'Support Team'}
                                                        </li>
                                                        <li className="text-[10px]/4 font-normal">-</li>
                                                        <li className="text-[10px]/4 font-normal">{item.time}</li>
                                                    </ul>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </SimpleBar>
                                <div className="px-6 py-6">
                                    <div className="flex items-center gap-4">
                                        <Input className="w-full" />
                                        <ButtonIcon className="bg-blue-600 text-white hover:bg-blue-800">
                                            <PaperAirplaneIcon className="h-4" />
                                        </ButtonIcon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default SupportMessages;
