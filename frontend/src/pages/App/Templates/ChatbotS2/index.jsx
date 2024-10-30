import React, { useState, useEffect, useRef, Fragment } from "react";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";
import { chats2 } from "../../../../store";
import { Button, ButtonIcon, Tooltip } from "../../../../components";
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, EllipsisHorizontalIcon, TrashIcon, ShareIcon, PencilSquareIcon, ArrowPathRoundedSquareIcon, EyeIcon, ArrowDownTrayIcon, HandThumbDownIcon, Bars3Icon} from "@heroicons/react/24/outline";
import { PlusCircleIcon} from "@heroicons/react/20/solid";
import { Link, useSearchParams } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { usePopper } from 'react-popper';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useTheme } from "../../../../layout/provider";

const ChatItem = ({ data, setListVisibility }) => {
    const theme = useTheme();
    let [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement : "bottom-end",
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [theme.direction === 'ltr' ? -12 : 12,-8],
                },
            },
        ],
    })
    
  return (
    <li className="group flex items-center justify-stretch max-w-full relative" >
        <Link to={`/app/templates/chatbot-s2?id=${data.id}`} onClick={()=> setListVisibility(false)} className={classNames({
            "flex gap-2 items-center px-4 py-3 w-full rounded-md  [&.active]:bg-blue-100 [&.active]:dark:bg-blue-950":true, 
            "active": data.id === id}
        )}>
            <div className="flex-shrink-0">
                <ChatBubbleLeftRightIcon className="h-4 text-slate-600 dark:text-slate-200" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-300 capitalize truncate">{data.title}</p>
        </Link>
        <Menu className="absolute end-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10" as="div">
            <Menu.Button ref={setReferenceElement} className="h-7 w-7 bg-slate-100 dark:bg-slate-900 rounded-full flex justify-center items-center">
                <EllipsisHorizontalIcon className="h-5 text-slate-600 dark:text-slate-200" />
            </Menu.Button>
            <Menu.Items ref={setPopperElement} style={styles.popper} {...attributes.popper} className="absolute end-0 top-10 w-36 bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
                <ul className="py-2 border-slate-200 dark:border-slate-800">
                    <li>
                        <a href="#" className="flex text-xs px-4 py-2 font-medium text-slate-500 dark:text-slate-200 hover:text-blue-600 hover:dark:text-blue-600 transition-all" >
                            <PencilSquareIcon className="w-4 me-2" />
                            <span>Rename</span>
                        </a>
                        <a href="#" className="flex text-xs px-4 py-2 font-medium text-slate-500 dark:text-slate-200 hover:text-blue-600 hover:dark:text-blue-600 transition-all" >
                            <ShareIcon className="w-4 me-2" />
                            <span>Share</span>
                        </a>
                        <a href="#" className="flex text-xs px-4 py-2 font-medium text-slate-500 dark:text-slate-200 hover:text-blue-600 hover:dark:text-blue-600 transition-all" >
                            <TrashIcon className="w-4 me-2" />
                            <span>Delete</span>
                        </a>
                    </li>
                </ul>
            </Menu.Items>
        </Menu>
    </li>
  )
}

function ChatBotS2() {
    const chatWindow = useRef(null);
    const theme = useTheme();
    let [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [selectedChat, setSelectedChat] = useState('');
    const [mobile, setMobile] = useState(false);
    const [listVisibility, setListVisibility] = useState(false);
    
    useEffect(() => {
        const handleMobile = () => {
            if (window.innerWidth < 1140) {
                setTimeout(setMobile(true), 3000);
            } else {
                setMobile(false);
                setListVisibility(false);
            }
        }
    
        handleMobile();
        window.addEventListener('resize', handleMobile);
        return () => {
            window.removeEventListener('resize', handleMobile);
        };
    }, []);

    useEffect(() => {
        if (id !== undefined || null || "") {
            let selectedChatbot = chats2.find((item) => item.id === id);
            setSelectedChat(selectedChatbot);
        }else{
            setSelectedChat('')
        };
    }, [searchParams]);
    return (
        <Layout title="Chat Bot">
            <Section className="py-5 xl:py-10">
                <Container>
                    <div className="flex flex-wrap gap-x-8 xl:flex-nowrap min-h-[calc(100vh-theme(space.52))] max-h-[calc(100vh-theme(space.52))] max-xl:max-h-[calc(100vh-theme(space.40)-theme(space.2))] max-xl:min-h-[calc(100vh-theme(space.40)-theme(space.2))]">
                        {listVisibility &&<div onClick={()=>{ setListVisibility(false) }} className="fixed inset-0 bg-slate-950 bg-opacity-50 z-[1019] xl:hidden"></div>}
                        <div className={classNames({
                            "fixed start-0 z-[1020] top-[calc(theme(space.16)+theme(space.1))] bottom-0 w-[calc(100%-40px)] max-xl:max-w-80 xl:w-[360px] xl:static flex-shrink-0  xl:translate-x-0":true,
                            "transition-transform": mobile,
                            "-translate-x-full":theme.direction === 'ltr',
                            "translate-x-full":theme.direction === 'rtl',
                            "translate-x-0":listVisibility
                        })}>
                            <div className="flex flex-col justify-stretch  h-full xl:rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                <div className="px-4 sm:px-7 pt-4 sm:pt-7">
                                    <Link className="flex items-center gap-x-2 text-blue-600 text-sm" onClick={()=> setListVisibility(false)}>
                                        <PlusCircleIcon className="h-4" />
                                        <span>New Conversation</span>
                                    </Link>
                                </div>
                                <SimpleBar ref={chatWindow} className="p-4 sm:p-7 h-full overflow-auto flex-grow">
                                    
                                    <ul className="flex flex-col -mx-4 -my-3">
                                        {chats2.map((item,index)=> {
                                            return(
                                                <ChatItem key={index} data={item} setListVisibility={setListVisibility} />
                                            )
                                        })}
                                    </ul>
                                </SimpleBar>
                                <div className="p-4 sm:p-7">
                                    <Link to="/app/packages" className="flex justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-200 hover:dark:border-blue-950 transition-all">
                                        <div className="">
                                            <span className="text-[11px] font-medium text-blue-500 bg-gradient-to-r from-blue-100 dark:from-blue-950 to-pink-100 dark:to-pink-950 px-2 py-1 rounded">
                                                Upgrade
                                            </span>
                                            <h3 className="mt-2 font-bold text-sm text-slate-600 dark:text-slate-100">Scribbler Pro</h3>
                                        </div>
                                        <div className="text-end">
                                            <del className="font-medium text-xs text-slate-400 dark:text-slate-300">$24.88</del>
                                            <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text ">
                                                $19.88
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-[calc(100%-theme(space.8)-360px)] max-xl:h-[calc(100vh-theme(space.40)-theme(space.2))] relative">
                            <button onClick={()=>{ setListVisibility(!listVisibility) }}
                                className={classNames({
                                    "inline-flex items-center justify-center h-8 w-8 rounded overflow-hidden transition-all text-slate-500 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200 xl:hidden absolute top-4 z-10":true,
                                    "end-0": !selectedChat,
                                    "end-4": selectedChat,
                                })} >
                                <Bars3Icon className="h-5" />
                            </button>
                            <div className="flex flex-col justify-stretch h-full">
                                {selectedChat ? 
                                    <SimpleBar ref={chatWindow} className="h-full overflow-auto flex-grow rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                        <div className="flex flex-col justify-end h-full p-4 sm:p-6 -my-2.5">
                                            {selectedChat.replys.map((item,index)=> {
                                                return(
                                                    <div key={index} className="flex flex-col py-2.5">
                                                        <div className="flex items-center gap-x-2">
                                                            <div className="inline-flex flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border-2 border-white dark:border-slate-700">
                                                                {item.from === 'human' && <img src="/images/avatar/a.jpg" alt="" />}
                                                                {item.from === 'bot' && <img src="/images/avatar/bots/1.jpg" alt="" />}
                                                            </div>
                                                            <h6 className="font-bold text-sm capitalize text-slate-600 dark:text-slate-100"> {item.from === 'human' ? 'you' : 'Scribbler.Ai'}</h6>
                                                        </div>
                                                        {item.text && <div className="ps-10 w-full">
                                                            <div className=" max-w-full text-slate-500 dark:text-slate-300 prose-strong:dark:text-white text-sm prose prose-code:![text-shadow:none] *:max-w-xl prose-pre:!max-w-full prose-pre:!w-full prose-pre:p-0">
                                                                <Markdown
                                                                    children={item.text}
                                                                    components={{
                                                                    code(props) {
                                                                        const {children, className, node, inline, ...rest} = props
                                                                        const match = /language-(\w+)/.exec(className || '')
                                                                        const [copied, setCopied] = useState(false);
                                                                        return !inline && match ? (
                                                                            <>
                                                                                <div className="flex flex-wrap justify-between px-4 py-2 bg-slate-800">
                                                                                    <h6 className="font-bold uppercase tracking-widest">{match[1]}</h6> 
                                                                                    <CopyToClipboard className={classNames({"text-green-500": copied})} text={children} onCopy={() => {setCopied(true); setTimeout(() => {setCopied(false)}, 1000);}}>
                                                                                        <button>{copied ? "Copied" : "Copy"}</button>
                                                                                    </CopyToClipboard>
                                                                                </div>
                                                                                <SyntaxHighlighter
                                                                                    {...rest}
                                                                                    PreTag="div"
                                                                                    children={String(children).replace(/\n$/, '')}
                                                                                    language={match[1]}
                                                                                    useInlineStyles={false}
                                                                                    className={classNames({
                                                                                        'p-4 overflow-x-auto bg-slate-900 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600':true,
                                                                                        [`${className}`]:className
                                                                                    })}
                                                                                />
                                                                            </>
                                                                        ) : (
                                                                        <code {...rest} className={classNames({
                                                                            'p-4':true,
                                                                            [`${className}`]:className
                                                                        })}>
                                                                            {children}
                                                                        </code>
                                                                        )
                                                                    }
                                                                    }}
                                                                />
                                                            </div>
                                                            {item.from === 'bot' && <ul className="pt-4 flex gap-x-2">
                                                                <li>
                                                                    <Tooltip content="Regenerate">
                                                                        <ButtonIcon size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-500 hover:dark:border-blue-500 hover:dark:bg-blue-500 hover:text-white hover:dark:text-white">
                                                                            <ArrowPathRoundedSquareIcon className="h-4" />
                                                                        </ButtonIcon>
                                                                    </Tooltip>
                                                                </li>
                                                                <li>
                                                                    <Tooltip content="Bad Response">
                                                                        <ButtonIcon size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-500 hover:dark:border-blue-500 hover:dark:bg-blue-500 hover:text-white hover:dark:text-white">
                                                                            <HandThumbDownIcon className="h-4" />
                                                                        </ButtonIcon>
                                                                    </Tooltip>
                                                                </li>
                                                                <li>
                                                                    <Button size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-green-500 hover:bg-green-500 hover:dark:border-green-500 hover:dark:bg-green-500 hover:text-white hover:dark:text-white">
                                                                        Share
                                                                    </Button>
                                                                </li>
                                                            </ul>}
                                                        </div> 
                                                        }
                                                        {item.images &&
                                                            <div className="ps-10 w-full">
                                                                <div className="max-w-sm mt-2 border border-l-slate-200 dark:border-slate-700 p-3 rounded-lg">
                                                                    <div className="grid grid-flow-dense grid-cols-2 gap-2">
                                                                        <Gallery>
                                                                            {item.images.map((image, imageIndex) => (
                                                                                <Item 
                                                                                    key={imageIndex}
                                                                                    original={image.src}
                                                                                    thumbnail={image.src}
                                                                                    width="1000"
                                                                                    height="1000" >
                                                                                    {({ ref, open }) => (
                                                                                        <div className="relative group">
                                                                                            <img  className="rounded-lg" src={image.src} />
                                                                                            <div className="absolute bottom-4 end-4 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 flex flex-col gap-px rounded-md bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                                                                <button className="h-8 w-8 flex items-center justify-center first:rounded-t-md last:rounded-b-md bg-white dark:bg-slate-900 hover:dark:bg-green-600 hover:bg-green-500 text-slate-600 dark:text-white hover:text-white transition-all" ref={ref} onClick={open}>
                                                                                                    <EyeIcon className="h-4" />
                                                                                                </button>
                                                                                                <a className="h-8 w-8 flex items-center justify-center first:rounded-t-md last:rounded-b-md bg-white dark:bg-slate-900 hover:dark:bg-green-600 hover:bg-green-500 text-slate-600 dark:text-white hover:text-white transition-all" href={image.src} download>
                                                                                                    <ArrowDownTrayIcon className="h-4" />
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Item>
                                                                            ))}
                                                                        </Gallery>
                                                                    </div>
                                                                    <ul className="pt-3 flex gap-x-2">
                                                                        <li>
                                                                            <Tooltip content="Regenerate">
                                                                                <ButtonIcon size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-500 hover:dark:border-blue-500 hover:dark:bg-blue-500 hover:text-white hover:dark:text-white">
                                                                                    <ArrowPathRoundedSquareIcon className="h-4" />
                                                                                </ButtonIcon>
                                                                            </Tooltip>
                                                                        </li>
                                                                        <li>
                                                                            <Tooltip content="Bad Response">
                                                                                <ButtonIcon size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-500 hover:dark:border-blue-500 hover:dark:bg-blue-500 hover:text-white hover:dark:text-white">
                                                                                    <HandThumbDownIcon className="h-4" />
                                                                                </ButtonIcon>
                                                                            </Tooltip>
                                                                        </li>
                                                                        <li>
                                                                            <Button size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-500 hover:dark:border-blue-500 hover:dark:bg-blue-500 hover:text-white hover:dark:text-white">
                                                                                Edit
                                                                            </Button>
                                                                        </li>
                                                                        <li className="ms-auto">
                                                                            <Button size="xs" className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-green-500 hover:bg-green-500 hover:dark:border-green-500 hover:dark:bg-green-500 hover:text-white hover:dark:text-white">
                                                                                Share
                                                                            </Button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </SimpleBar>
                                : 
                                    <div className="h-full relative">
                                        <div className="pt-4 pb-7">
                                            <h2 className="font-bold text-3xl w-max pb-2 bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text">Hi, Phillip</h2>
                                            <h4 className="font-bold text-2xl text-slate-600 dark:text-slate-100">What can i do for you ?</h4>
                                        </div>
                                        <div className="flex flex-col gap-6">
                                            <div className="">
                                                <h5 className="font-bold text-sm mb-3 text-slate-700 dark:text-slate-100">Lets try</h5>
                                                <div className="grid grid-flow-dense sm:grid-cols-2 md:grid-cols-3 gap-5">
                                                    <div className="px-4 py-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <h6 className="font-bold text-base mb-1 text-slate-600 dark:text-slate-100">Plan a trip</h6>
                                                        <p className="text-sm line-clamp-1 text-slate-500 dark:text-slate-300">I have 4 days holiday from my job so plan paris trip for me.</p>
                                                    </div>
                                                    <div className="px-4 py-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <h6 className="font-bold text-base mb-1 text-slate-600 dark:text-slate-100">Write Code for me</h6>
                                                        <p className="text-sm line-clamp-1 text-slate-500 dark:text-slate-300">Can you write tik tak to game fom me with react js.</p>
                                                    </div>
                                                    <div className="px-4 py-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <h6 className="font-bold text-base mb-1 text-slate-600 dark:text-slate-100">Article title</h6>
                                                        <p className="text-sm line-clamp-1 text-slate-500 dark:text-slate-300">Write me title for a react blog post.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <h5 className="font-bold text-sm mb-3 text-slate-700 dark:text-slate-100">Or Create</h5>
                                                <div className="grid grid-flow-dense sm:grid-cols-2 md:grid-cols-3 gap-5">
                                                    <div className="px-4 py-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <h6 className="font-bold text-base mb-1 text-slate-600 dark:text-slate-100">Generate Image</h6>
                                                        <p className="text-sm line-clamp-1 text-slate-500 dark:text-slate-300">Start with <strong>/imagine</strong></p>
                                                    </div>
                                                    <div className="px-4 py-3 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                                        <h6 className="font-bold text-base mb-1 text-slate-600 dark:text-slate-100">Edit / Modify it</h6>
                                                        <p className="text-sm line-clamp-1 text-slate-500 dark:text-slate-300">Hit the edit button to modify</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="pt-3">
                                    <ul className="flex gap-x-3">
                                        <li>
                                            <div className="flex">
                                                <input className="appearance-none h-0 w-0 opacity-0 peer" type="radio" id="gpt-4" name="language-model" defaultChecked />
                                                <label className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-800 rounded-md px-3 py-1 cursor-pointer peer-checked:cursor-default peer-checked:text-blue-600 peer-checked:border-blue-300 peer-checked:dark:border-blue-900 transition-all" htmlFor="gpt-4">GPT 4</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex">
                                                <input className="appearance-none h-0 w-0 opacity-0 peer" type="radio" id="Gemini" name="language-model" />
                                                <label className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-800 rounded-md px-3 py-1 cursor-pointer peer-checked:cursor-default peer-checked:text-blue-600 peer-checked:border-blue-300 peer-checked:dark:border-blue-900 transition-all" htmlFor="Gemini">Gemini</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex">
                                                <input className="appearance-none h-0 w-0 opacity-0 peer" type="radio" id="Llama-3" name="language-model" />
                                                <label className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-800 rounded-md px-3 py-1 cursor-pointer peer-checked:cursor-default peer-checked:text-blue-600 peer-checked:border-blue-300 peer-checked:dark:border-blue-900 transition-all" htmlFor="Llama-3">Llama 3</label>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="flex items-start gap-4 mt-3">
                                        <div contentEditable className="py-2.5 px-4 z-10 w-full rounded-md text-sm/[1.125rem] bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 placeholder:text-slate-400 placeholder:dark:text-slate-500 border border-slate-200 dark:border-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-blue-200 focus:shadow-none focus:outline-none"></div>
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

export default ChatBotS2;