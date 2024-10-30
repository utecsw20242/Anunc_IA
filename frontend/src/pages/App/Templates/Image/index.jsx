import React, { useState,useEffect, useRef } from "react";
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";

import { templates, result as resultdata } from "../../../../store";
import { Link } from "react-router-dom";
import { Label, Select, Textarea } from "../../../../components";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import slideDown from "../../../../utilities/slideDown";
import slideUp from "../../../../utilities/slideUp";
import blankImageIllustration from "../../../../assets/images/illustration/blank-image.svg";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { Gallery, Item } from 'react-photoswipe-gallery'

const activityImages = [
    {
        src: "/images/generated/a-modern-and-innovative-commercial-booth-in-the-middle-of-the-desert.jpg",
        link: "#",
        prompt: "A modern and innovative commercial booth in the middle of the desert",
    },
    {
        src: "/images/generated/a-teeny-tiny-cute-redheaded-gremlin-girl-reaching-her-hands-into-the-air-saying-because-I-love-you.jpg",
        link: "#",
        prompt: "a teeny tiny cute redheaded gremlin girl reaching her hands into the air saying 'because I love you!'.jpg",
    },
    {
        src: "/images/generated/angry-doughnut-walking-down-the-street.jpg",
        link: "#",
        prompt: "Angry doughnut walking down the street",
    },
    {
        src: "/images/generated/design-the-world-through-the-eyes-of-a-neurodivergent-child-vivid-and-vibrant-colours-fun-white-background-hyper-realistic.jpg",
        link: "#",
        prompt: "design the world through the eyes of a neurodivergent child vivid and vibrant colours fun white background hyper-realistic",
    },
    {
        src: "/images/generated/happy-ice-cream-sining.jpg",
        link: "#",
        prompt: "Happy ice cream sining",
    },
    {
        src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors.jpg",
        link: "#",
        prompt: "cute cat as calculator macaroon as the buttons of the calculator ribbon happy colors",
    },
    {
        src: "/images/generated/supplement-and-nutrition-company.jpg",
        link: "#",
        prompt: "supplement and nutrition company",
    },
    {
        src: "/images/generated/hyper-realistic-modern-sofa-with-pastel-colors-and-white-background-cinematic-light.jpg",
        link: "#",
        prompt: "Hyper realistic modern sofa with pastel colors and white background cinematic light",
    },
    {
        src: "/images/generated/hyper-realistic-modern-furniture-with-white-background-and-pastel-colors-cinematic-lights.jpg",
        link: "#",
        prompt: "Hyper realistic modern furniture with white background and pastel colors cinematic lights",
    },
    {
        src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors2.jpg",
        link: "#",
        prompt: "cute cat as calculator macaroon as the buttons of the calculator ribbon happy colors",
    },
];

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

const resolution = [
    { name: "256x256" },
    { name: "512x512" },
    { name: "1024x1024" },
]
const lighting = [
    { name: "Ambient" },
    { name: "Worm" },
    { name: "Cold" },
]

const iamgecountoptions = [
    { name: "1" },
    { name: "2" },
    { name: "4" },
]

function ImageGenerator() {
    const template = templates.filter((template) => template.api === "Image");

    const [selectedResolution, setSelectedResolution] = useState(resolution[0]);
    const [selectedCount, setSelectedCount] = useState(iamgecountoptions[0]);
    const [selectedLighting, setSelectedLighting] = useState(lighting[0]);
    const [selectedStyle, setSelectedStyle] = useState('Photo');
    const [showAdvanced, setShowAdvanced] = useState(true);

    const ref = useRef()

    useEffect(() => {
        showAdvanced ? slideDown(ref.current) : slideUp(ref.current);
    }, [showAdvanced])

    const [result, setResult] = useState('');

    return (
        <Layout title="Image Generator">
            <Section className="py-10">
                <Container>
                    <div className="flex items-start">
                        <div className="flex flex-wrap flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="p-5 xs:p-7 w-full lg:w-1/2 border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-4xl text-slate-700 dark:text-white mb-3">AI Image Generator</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-5 max-w-md">Effortlessly Create Striking and Distinctive Images with our AI-Powered Image Generation Tool</p>
                                <a href="#" 
                                    onClick={(e)=>
                                        {e.preventDefault();
                                        setShowAdvanced(!showAdvanced);
                                    }
                                    }
                                    className="text-sm  text-blue-600 flex items-center mb-6">
                                    <span className="">Advanced Options</span>
                                    <div className="h-4 ms-2">{showAdvanced ? <MinusIcon className="h-4" /> : <PlusIcon className="h-4" />}</div>
                                </a>
                                <div className="hidden" ref={ref}>
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full">
                                            <div className="p-3">
                                                <Label
                                                    className="mb-4"
                                                >
                                                    Art Style
                                                </Label>
                                                <RadioGroup value={selectedStyle} onChange={setSelectedStyle} className="grid grid-cols-3 sm:grid-cols-5 gap-3">
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
                                        <div className="w-full sm:w-1/3">
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
                                        <div className="w-full sm:w-1/3">
                                            <div className="p-3">
                                                <Label
                                                    htmlFor="Resolution"
                                                    className="mb-4"
                                                >
                                                    Resolution
                                                </Label>
                                                <Select
                                                    selected={selectedResolution}
                                                    options={resolution}
                                                    onChange={(value) => {
                                                        setSelectedResolution(value);
                                                    }}
                                                    id="Resolution"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/3">
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
                                <div className="w-full mt-3 pb-1">
                                    <Label
                                        htmlFor="prompt"
                                        className="mb-4"
                                    >
                                        Describe your concept
                                    </Label>
                                    <div className="flex flex-wrap sm:flex-nowrap items-center border border-slate-200  dark:border-slate-800 rounded-md p-1">
                                        <div className="relative flex-grow w-full sm:w-auto">
                                            <Textarea className="w-full py-3 px-3 rounded-md text-sm" rows="1" notheme={true} placeholder="Delicious pizza with toppings"
                                            defaultValue="surprise me with an awesome photo"
                                            id="prompt" />
                                        </div>
                                        <button onClick={ () => setResult(resultdata.image) } className="w-full sm:w-auto inline-flex justify-center font-medium text-sm bg-blue-600 text-white hover:bg-blue-800 transition-all px-6 py-3 rounded-md">
                                            Generate
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 lg:p-10 w-full lg:w-1/2">
                                {result ? 
                                    <div className="grid grid-cols-2 gap-7">
                                        <Gallery>
                                            {result.map((item, index) => (
                                                <Item 
                                                    key={index}
                                                    original={item.src}
                                                    thumbnail={item.src}
                                                    width="1000"
                                                    height="1000"
                                                >
                                                    {({ ref, open }) => (
                                                        <div className="relative group">
                                                            <img  className="rounded-lg" src={item.src} />
                                                            <div className="absolute bottom-4 end-4 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 flex flex-col gap-px rounded-md bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                                <button className="h-8 w-8 flex items-center justify-center first:rounded-t-md last:rounded-b-md bg-white dark:bg-slate-900 hover:dark:bg-green-600 hover:bg-green-500 text-slate-600 dark:text-white hover:text-white transition-all" ref={ref} onClick={open}>
                                                                    <ArrowTopRightOnSquareIcon className="h-4" />
                                                                </button>
                                                                <a className="h-8 w-8 flex items-center justify-center first:rounded-t-md last:rounded-b-md bg-white dark:bg-slate-900 hover:dark:bg-green-600 hover:bg-green-500 text-slate-600 dark:text-white hover:text-white transition-all" href={item.src} download>
                                                                    <ArrowDownTrayIcon className="h-4" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Item>
                                            ))}
                                        </Gallery>
                                    </div>
                                : 
                                <div className="h-full w-full flex items-center justify-center text-center">
                                    <div className="flex items-center flex-col py-2">
                                        <div className="h-36">
                                            <img className="h-full" src={blankImageIllustration} alt="" />
                                        </div>
                                        <div className="mt-5 max-w-xs">
                                            <p className="text-slate-500 dark:text-slate-400 text-xl ">Describe your concept or proposal then hit Generate</p>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section className="pb-10">
                <Container>
                    <h5 className="text-lg font-bold text-slate-700 dark:text-white mb-4">Generated History</h5>
                    <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-5 xs:p-7">
                        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-4">
                            {activityImages.map((item, index) => (
                                <Link
                                    className="rounded-md border border-slate-200 dark:border-slate-800 relative group overflow-hidden"
                                    key={index}
                                    to={item.link}
                                >
                                    <img
                                        className="rounded-md"
                                        src={item.src}
                                        alt={item.prompt}
                                    />
                                    <div className="absolute bottom-0 p-3 bg-gradient-to-b from-transparent via-slate-900 via-70% to-slate-900 rounded-b-md transition-all opacity-0 group-hover:opacity-100 w-full">
                                        <span className="inline-flex bg-blue-500 text-white px-2 pb-1 text-xs font-bold mb-1 rounded">
                                            prompt
                                        </span>
                                        <span className="text-white text-xs font-bold line-clamp-2">
                                            {item.prompt}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default ImageGenerator;