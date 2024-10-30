import React, { useState,useEffect, useRef } from "react";
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";

import { Gallery, Item } from 'react-photoswipe-gallery'
import { templates, result as resultdata } from "../../../../store";
import { Label, Select, Textarea } from "../../../../components";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { TrashIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/16/solid";

import 'photoswipe/dist/photoswipe.css'


const imagestyle = [
    {
        src: "/images/generated/a-childrens-school-made-of-classrooms-made-of-geodesic-domes-situated-on-an-old-golf-course-in-hawaii.jpg",
        name:"Photo"
    },
    {
        src: "/images/generated/baby-bandsaurus-drinking-coffee-with-baby-bottle.jpg",
        name:"Concept Art"
    },
    {
        src: "/images/generated/happy-ice-cream-sining.jpg",
        name:"Illustration"
    },
    {
        src: "/images/generated/melted-candle-looks-like-a-fried-chicken-burger-in-pastel-colours.jpg",
        name:"Fantasy"
    },
    {
        src: "/images/generated/hype-realistic-modern-bed-with-sandy-colors-white-background-and-cinematic-lights.jpg",
        name:"Isometric"
    },
]
const ratio = [
    { name: "Square" },
    { name: "Portrait" },
    { name: "Landscape" },
]
const lighting = [
    { name: "Ambient" },
    { name: "Warm" },
    { name: "Cold" },
    { name: "Mood Light" },
]
const iamgecountoptions = [
    { name: "1" },
    { name: "2" },
    { name: "4" },
]

const results = [
    {
        prompt: "Surprise me with random cute awesome photo",
        tags: ["Fantasy", "Warm", "Portrait"],
        ratio: "Portrait",
        images: [
            "/images/generated/happy-ice-cream-sining.jpg", 
            "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors2.jpg",
            "/images/generated/melted-candle-looks-like-a-fried-chicken-burger-in-pastel-colours.jpg",
            "/images/generated/design-the-world-through-the-eyes-of-a-neurodivergent-child-vivid-and-vibrant-colours-fun-white-background-hyper-realistic.jpg",
        ]
    },
    {
        prompt: "Hyper Realistic Modern Furniture with Mood Lighting",
        tags: ["Isometric", "Mood Light", "Landscape"],
        ratio: "Landscape",
        images: [
            "/images/generated/hyper-realistic-modern-sofa-with-pastel-colors-and-white-background-cinematic-light.jpg", 
            "/images/generated/hyper-realistic-modern-furniture-with-white-background-and-pastel-colors-cinematic-lights.jpg",
            "/images/generated/hype-realistic-modern-bed-with-sandy-colors-white-background-and-cinematic-lights.jpg"
        ]
    },
]

function ImageGeneratorS2() {
    const template = templates.filter((template) => template.api === "Image");

    const [selectedRatio, setSelectedRatio] = useState(ratio[0]);
    const [selectedCount, setSelectedCount] = useState(iamgecountoptions[0]);
    const [selectedLighting, setSelectedLighting] = useState(lighting[0]);
    const [selectedStyle, setSelectedStyle] = useState('Photo');

    const [result, setResult] = useState('');

    return (
        <Layout title="Image Generator">
            <Section className="py-10">
                <Container>
                    <div className="flex flex-wrap gap-x-8 xl:flex-nowrap items-start">
                        <div className="w-full xl:w-[360px] flex-shrink-0">
                            <div className="p-4 sm:p-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-xl:rounded-b-none">
                                <div className="flex flex-wrap -m-3">
                                    <div className="w-full">
                                        <div className="p-3">
                                            <Label
                                                className="mb-4"
                                            >
                                                Art Style
                                            </Label>
                                            <RadioGroup value={selectedStyle} onChange={setSelectedStyle} className="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-3 gap-3">
                                                {imagestyle.map((item, index) => 
                                                    <RadioGroup.Option key={index} value={item.name} className={({ active, checked }) =>
                                                        classNames({
                                                            ["rounded-md transition-all duration-500"]: true,
                                                            ["cursor-default"]: checked,
                                                            ["cursor-pointer"]: !checked,
                                                        })
                                                    }>
                                                        {({ checked }) => (
                                                            <div className="h-full flex flex-col">
                                                                <img className="rounded-t-md flex-shrink-0" src={item.src} />
                                                                <div className={
                                                                    classNames({
                                                                        ["flex items-center justify-center flex-grow p-2 rounded-b-md border border-t-0 text-xs font-bold text-center transition-all duration-500"]:true,
                                                                        ["text-slate-700 dark:text-white border-blue-200 dark:border-blue-900 bg-blue-100 dark:bg-blue-950"]: checked,
                                                                        ["text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-800"]: !checked,
                                                                    })
                                                                }>{item.name}</div>
                                                            </div>
                                                        )}
                                                    </RadioGroup.Option>
                                                )}
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/3 xl:w-full">
                                        <div className="p-3">
                                            <Label
                                                htmlFor="Lighting"
                                                className="mb-4"
                                            >
                                                Lighting
                                            </Label>
                                            <Select
                                                selected={selectedLighting}
                                                options={lighting}
                                                onChange={(value) => {
                                                    setSelectedLighting(value);
                                                }}
                                                id="Lighting"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/3 xl:w-full">
                                        <div className="p-3">
                                            <Label
                                                htmlFor="AspectRatio"
                                                className="mb-4"
                                            >
                                                Aspect Ratio
                                            </Label>
                                            <Select
                                                selected={selectedRatio}
                                                options={ratio}
                                                onChange={(value) => {
                                                    setSelectedRatio(value);
                                                }}
                                                id="AspectRatio"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/3 xl:w-full">
                                        <div className="p-3">
                                            <Label
                                                htmlFor="Count"
                                                className="mb-4"
                                            >
                                                Count
                                            </Label>
                                            <Select
                                                selected={selectedCount}
                                                options={iamgecountoptions}
                                                onChange={(value) => {
                                                    setSelectedCount(value);
                                                }}
                                                id="Count"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow-1 w-full">
                            <div className="p-4 sm:p-7 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-xl:rounded-t-none max-xl:-mt-px">
                                <Label
                                    htmlFor="prompt"
                                    className="mb-4"
                                >
                                    Describe your concept
                                </Label>
                                <div className="flex flex-wrap sm:flex-nowrap items-center border border-slate-200  dark:border-slate-800 rounded-md p-1">
                                    <div className="relative flex-grow w-full sm:w-auto max-sm:pb-1">
                                        <Textarea className="w-full py-3 px-3 rounded-md text-sm" rows="1" notheme={true} placeholder="Delicious pizza with toppings"
                                        defaultValue="surprise me with an awesome photo"
                                        id="prompt" />
                                    </div>
                                    <button onClick={ () => setResult(resultdata.image) } className="w-full sm:w-auto inline-flex justify-center font-medium text-sm bg-blue-600 text-white hover:bg-blue-800 transition-all px-6 py-3 rounded-md">
                                        Generate
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-5 pt-8">
                                {results.map((item,index)=> {
                                    return(
                                        <div key={index}>
                                            <div className="flex flex-wrap justify-between items-end gap-3 pb-4">
                                                <div>
                                                    <h6 className="text-lg/relaxed font-bold text-slate-700 dark:text-white mb-2">{item.prompt}</h6>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.tags?.map((tItem,tIndex)=>
                                                            <div key={tIndex} className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold capitalize bg-white dark:bg-slate-950 text-slate-600 dark:text-white border border-slate-200  dark:border-slate-800">
                                                                <span className="me-2">{tItem}</span>
                                                                <button className="h-3 w-3 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-300 hover:text-rose-500 hover:dark:text-rose-400 transition-all"><XCircleIcon className="h-4" /></button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <button className="group inline-flex justify-center items-center font-medium transition-all text-xs px-4 py-2 gap-3 rounded-md bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-red-500 hover:bg-red-500 hover:dark:border-red-500 hover:dark:bg-red-500 hover:text-white hover:dark:text-white">
                                                        <TrashIcon className="h-4 text-slate-500 dark:text-slate-300 group-hover:text-white group-hover:dark:text-white"/>
                                                        <span className="whitespace-nowrap">Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-7">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                                                    <Gallery>
                                                        {item.images?.map((imItem,imIndex)=>{
                                                            const imageClassName= classNames({
                                                                "object-cover rounded-md border border-slate-200 dark:border-slate-800": true,
                                                                "aspect-[4/3]": item.ratio === "Landscape",
                                                                "aspect-square": item.ratio === "Square",
                                                                "aspect-[3/4] ": item.ratio === "Portrait",
                                                            })
                                                            return(
                                                                <Item
                                                                    key={imIndex}
                                                                    original={imItem}
                                                                    thumbnail={imItem}
                                                                    width="1000"
                                                                    height="1000"
                                                                >
                                                                    {({ ref, open }) => (
                                                                        <div className="relative group">
                                                                            <img className={imageClassName} src={imItem} alt="" />
                                                                            <div className="absolute bottom-4 end-4 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 flex flex-col gap-px rounded-md bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                                                <button className="h-8 w-8 flex items-center justify-center first:rounded-t-md last:rounded-b-md bg-white dark:bg-slate-900 hover:dark:bg-green-600 hover:bg-green-500 text-slate-600 dark:text-white hover:text-white transition-all" ref={ref} onClick={open}>
                                                                                    <ArrowTopRightOnSquareIcon className="h-4" />
                                                                                </button>
                                                                                <a className="h-8 w-8 flex items-center justify-center first:rounded-t-md last:rounded-b-md bg-white dark:bg-slate-900 hover:dark:bg-green-600 hover:bg-green-500 text-slate-600 dark:text-white hover:text-white transition-all" href={imItem} download>
                                                                                    <ArrowDownTrayIcon className="h-4" />
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Item>
                                                            )}
                                                        )}
                                                    </Gallery>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default ImageGeneratorS2;