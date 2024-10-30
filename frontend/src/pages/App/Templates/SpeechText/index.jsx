import React, { useState,useEffect, useRef } from "react";
import parse from 'html-react-parser';
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";

import { result as resultdata } from "../../../../store";
import { Label, Select, Textarea, UploadZone } from "../../../../components";
import blankAudioIllustration from "../../../../assets/images/illustration/blank-audio.svg";
import SimpleBar from "simplebar-react";

const language = [
    { name: "Auto Detect" },
    { name: "English" },
    { name: "Spanish" },
]

const tasktypes = [
    { name: "Transcribe Audio File" },
    { name: "Translate Audio File" },
]

function SpeechText() {

    const [selectedTypes, setSelectedTypes] = useState(tasktypes[0]);
    const [selectedLanguage, setSelectedLanguage] = useState(language[0]);

    const [result, setResult] = useState('');

    return (
        <Layout title="Speech To Text Generator">
            <Section className="py-10">
                <Container>
                    <div className="flex items-start">
                        <div className="flex flex-wrap lg:flex-nowrap flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 xl:max-h-[calc(100vh-theme(space.52))]">
                            <div className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-800">
                                <SimpleBar className="p-7 h-full">
                                    <h3 className="font-bold text-4xl text-slate-700 dark:text-white mb-3">AI Speech to Text</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-5">Transcribe and translate your audio files with ease.</p>
                                    <div className="p-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 mb-4">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Your have <strong className="text-slate-600 dark:text-slate-200">3,47,179</strong> remaining tokens.</p>
                                    </div>
                                    <div className="-my-2">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="UploadFiles"
                                                className="mb-2"
                                            >
                                                Upload Audio
                                            </Label>
                                            <UploadZone text="Drag and Drop Your Audio File" id="UploadFiles" />
                                        </div>
                                        <div className="py-2">
                                            <Label
                                                htmlFor="Language"
                                                className="mb-2"
                                            >
                                                Audio Language <span className="text-[10px] text-slate-400 ms-2">(Optional)</span>
                                            </Label>
                                            <Select
                                                selected={selectedLanguage}
                                                options={language}
                                                onChange={(value) => {
                                                    setSelectedLanguage(value);
                                                }}
                                                id="Language"
                                            />
                                        </div>
                                        <div className="py-2">
                                            <Label
                                                htmlFor="Types"
                                                className="mb-2"
                                            >
                                                Task Type <span className="text-[10px] text-slate-400 ms-2">(Optional)</span>
                                            </Label>
                                            <Select
                                                selected={selectedTypes}
                                                options={tasktypes}
                                                onChange={(value) => {
                                                    setSelectedTypes(value);
                                                }}
                                                id="Types"
                                            />
                                        </div>
                                        <div className="py-2">
                                            <Label htmlFor="prompt" className="mb-2">
                                                Audio Description <span className="text-[10px] text-slate-400 ms-2">(Optional)</span>
                                            </Label>
                                            <Textarea
                                                className="h-32"
                                                placeholder="Describe the speech from the file to help the AI."
                                                id="prompt"
                                            />
                                        </div>
                                        <div className="py-2">
                                            <button onClick={ () => setResult(resultdata.transcribe) } className="inline-flex font-medium text-sm bg-blue-600 text-white hover:bg-blue-800 transition-all px-5 py-2 rounded-full">
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </SimpleBar>
                            </div>
                            <div className="w-full lg:w-3/5">
                                {result ? 
                                <SimpleBar className="p-6 h-full">
                                    <div className="prose dark:prose-invert">
                                        {parse(result)}
                                    </div>
                                </SimpleBar>
                                : 
                                <div className="p-6 h-full w-full flex items-center justify-center text-center">
                                    <div className="flex items-center flex-col py-2">
                                        <div className="h-28">
                                            <img className="h-full" src={blankAudioIllustration} alt="" />
                                        </div>
                                        <div className="mt-5 max-w-xs">
                                            <p className="text-slate-500 dark:text-slate-400 text-xl ">Upload audio and get it transcribed</p>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default SpeechText;