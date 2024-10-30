import React, { useState, useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";

import { chats, bots, auth } from "../../../../store";
import { Button, ButtonIcon, Input } from "../../../../components";
import { Bars3Icon, ChatBubbleBottomCenterIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

function ChatItem({data,selected, setSelected,close}) {
    const mainClass = classNames({
        ["flex items-center relative isolate before:transition-all before:duration-300 before:content-[''] before:-z-10 before:rounded-md before:absolute before:-inset-2"]: true,
        ["cursor-pointer hover:before:bg-slate-50 hover:before:dark:bg-slate-800"]:selected !== data.id,
        ["before:bg-slate-100 before:dark:bg-slate-800"]:selected === data.id,
    })
  return (
    <div className={mainClass} onClick={()=> {setSelected(data.id); close(false);}}>
        <div className="inline-flex flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700">
            <img
                src={data.bot.avatar}
                alt=""
            />
        </div>
        <div className="ms-4">
            <h4 className="text-sm text-slate-600 dark:text-slate-200 line-clamp-1">{data.replys[0].text}</h4>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{data.last} ago</div>
        </div>
    </div>
  )
}


function ChatBot() {
    const handeleNewChat=(bot)=> {
        const newChat = {
            id: "cid_blank",
            bot: bots[bot],
            last: "0 Min"
        };
        setChatList([newChat, ...chats]);
        setSelectedChat("cid_blank");
    };

    const [chatList, setChatList] = useState(chats);

    const [selectedChat, setSelectedChat] = useState('');
    const [showList, setShowList] = useState(false);
    const chat = chatList.find((chat) => chat.id === selectedChat);

    const chatWindow = useRef(null);

    useEffect(() => {
        if (chatWindow.current) {
            const scrollElement = chatWindow.current.contentWrapperEl;
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, [selectedChat])
    

    return (
        <Layout title="Chat Bot">
            <Section className="py-10">
                <Container>
                    <div className="relative isolate flex flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200  dark:border-slate-800 min-h-[calc(100vh-theme(space.52))] max-h-[calc(100vh-theme(space.52))] overflow-hidden">
                        {showList && <div className="absolute inset-0 bg-slate-950 bg-opacity-20 z-10 lg:hidden animate-fade" onClick={ () =>  setShowList(false)}></div> }
                        <div className={classNames({
                            "absolute z-20 h-full lg:h-auto bg-white dark:bg-slate-950 lg:static lg:w-1/4 border-e border-slate-200 dark:border-slate-800 flex flex-col max-lg:transition-all duration-300 -translate-x-full lg:translate-x-0" : true,
                            "translate-x-0" : showList,
                        })}
                        >
                            <div className="px-6 py-4 h-16 border-b border-slate-200 dark:border-slate-800 flex items-center">
                                <h3 className="font-bold text-lg text-slate-700 dark:text-white">Continue Conversation</h3>
                            </div>
                            <SimpleBar className="p-6 h-full max-h-full overflow-auto flex-grow">
                                <div className="grid grid-cols-1 gap-5">
                                    {chats.map((item)=>
                                        <ChatItem 
                                            key={item.id} 
                                            data={item} 
                                            selected={selectedChat} 
                                            setSelected={setSelectedChat}
                                            close={setShowList}
                                        />
                                    )}
                                </div>
                            </SimpleBar>
                            <div className="px-6 pb-6 pt-4 mt-auto">
                                <Button className="bg-blue-600 text-white hover:bg-blue-800 w-full" onClick={()=> {setSelectedChat("");setShowList(false);}}>
                                    <div className="h-4">
                                        <ChatBubbleBottomCenterIcon />
                                    </div>
                                    <span>Start New</span>
                                </Button>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 flex flex-col z-0">
                            {selectedChat === "" ?
                                <>
                                    <div className="px-6 py-4 h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                        <h3 className="font-bold text-lg text-slate-700 dark:text-white">Start New Chat</h3>
                                        <button
                                            onClick={ () =>  setShowList(true)}
                                            className="inline-flex lg:hidden -my-1 items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all  text-slate-400 hover:bg-slate-200 hover:text-slate-600 ui-open:bg-slate-200 ui-open:text-slate-600"
                                        >
                                            <Bars3Icon className="h-5" />
                                        </button>
                                    </div>
                                    <SimpleBar className="p-6 h-full max-h-full overflow-auto flex-grow">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {bots.map((item,index)=>
                                                <div key={item.id} onClick={()=> {
                                                    handeleNewChat(index)
                                                }} 
                                                className="text-center px-4 py-6 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 hover:dark:bg-slate-900 transition-all duration-300 rounded-lg cursor-pointer">
                                                    <div className="inline-flex flex-shrink-0 h-14 w-14 rounded-full overflow-hidden">
                                                        <img
                                                            src={item.avatar}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <h4 className="text-sm text-slate-600 dark:text-slate-200">{item.title}</h4>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.subtitle}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </SimpleBar>
                                </> : 
                                <div className="flex flex-col justify-stretch h-full">
                                    {chat && <div className="px-6 py-3 h-15 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center" >
                                            <div className="inline-flex flex-shrink-0 h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-slate-800">
                                                <img
                                                    src={chat.bot.avatar}
                                                    alt={chat.bot.title}
                                                />
                                            </div>
                                            <div className="ms-3">
                                                <h4 className="text-xs text-slate-600 dark:text-slate-200 line-clamp-1 font-bold">{chat.bot.title}</h4>
                                                {chat.replys && <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{chat.last} ago</div>}
                                                {!chat.replys && <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">New Chat</div>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={ () =>  setShowList(true)}
                                            className="-me-1 inline-flex lg:hidden -my-1 items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all duration-300 text-slate-400 hover:bg-slate-200 hover:text-slate-600 ui-open:bg-slate-200 ui-open:text-slate-600"
                                        >
                                            <Bars3Icon className="h-5" />
                                        </button>
                                    </div>}
                                    <SimpleBar ref={chatWindow} className="p-6 h-full max-h-full overflow-auto flex-grow">
                                        <div className="grid grid-cols-1 gap-4">
                                            {chat && chat.replys && chat.replys.map((item,index)=>
                                                <div key={`${item.id}${index}`} 
                                                    className={classNames({
                                                        "flex items-end gap-4" : true,
                                                        "flex-row-reverse" : item.from === "human",
                                                    })}
                                                >
                                                    <div className="inline-flex flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700">
                                                        {item.from === "bot" ? <img src={chat.bot.avatar} alt={chat.bot.title} /> : <img src={auth.avatar} alt={auth.name} />}
                                                    </div>
                                                    <div className={classNames({
                                                        "rounded-md py-3 px-4 max-w-md" : true,
                                                        "bg-slate-100 dark:bg-slate-900" : item.from === "bot",
                                                        "bg-blue-50 dark:bg-blue-950" : item.from === "human",
                                                    })}>
                                                        <p className="text-sm text-slate-500 dark:text-slate-300">{item.text}</p>
                                                    </div>
                                                </div>
                                            )}
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
                            }
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default ChatBot;