import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Layout from "../../../../layout/app";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";

import { result as resultdata } from "../../../../store";
import { Label, Select, Textarea } from "../../../../components";
import blankCodeIllustration from "../../../../assets/images/illustration/blank-code.svg";
import SimpleBar from "simplebar-react";

const languageoptions = [
    { name: "Python" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "Angular" },
    { name: "Vue" },
]

function CodeGenerator() {

    const [selectedLanguage, setSelectedLanguage] = useState(languageoptions[0]);

    const [result, setResult] = useState('');

    return (
        <Layout title="Code Generator">
            <Section className="py-10">
                <Container>
                    <div className="flex items-start">
                        <div className="flex flex-wrap lg:flex-nowrap flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden xl:max-h-[calc(100vh-theme(space.52))]">
                            <div className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-800">
                                <SimpleBar className="p-7 h-full">
                                    <h3 className="font-bold text-4xl text-slate-700 dark:text-white mb-3">AI Code Generator</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-5">An AI-powered tool that automates source code generation based on input specifications, aiding programmers in development tasks.</p>
                                    <div className="p-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 mb-4">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Your have <strong className="text-slate-600 dark:text-slate-200">3,47,179</strong> remaining snippets.</p>
                                    </div>
                                    <div className="-my-2">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="Language"
                                                className="mb-2"
                                            >
                                                Programming Language
                                            </Label>
                                            <Select
                                                selected={selectedLanguage}
                                                options={languageoptions}
                                                onChange={(value) => {
                                                    setSelectedLanguage(value);
                                                }}
                                                id="Language"
                                            />
                                        </div>
                                        <div className="py-2">
                                            <Label htmlFor="prompt" className="mb-2">
                                                Describe What Kind of Code You Need
                                            </Label>
                                            <Textarea
                                                className="h-44"
                                                placeholder="Please specify the type of function or code you would like me to generate."
                                                id="prompt"
                                            />
                                        </div>
                                        <div className="py-2">
                                            <button onClick={ () => setResult(resultdata.code) }  className="inline-flex font-medium text-sm bg-blue-600 text-white hover:bg-blue-800 transition-all px-5 py-2 rounded-full">
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </SimpleBar>
                            </div>
                            <div className="w-full lg:w-3/5">
                                {result ? 
                                <SimpleBar className="h-full p-7">
                                    <SimpleBar className="bg-slate-900 rounded-lg">
                                        <SyntaxHighlighter language="javascript" className="!p-7 !rounded-lg !overflow-visible !bg-slate-900" style={a11yDark}>
                                            {result}
                                        </SyntaxHighlighter>
                                    </SimpleBar>
                                </SimpleBar>
                                : 
                                <div className="p-6 h-full w-full flex items-center justify-center text-center">
                                    <div className="flex items-center flex-col py-2">
                                        <div className="h-36">
                                            <img className="h-full" src={blankCodeIllustration} alt="" />
                                        </div>
                                        <div className="mt-5 max-w-xs">
                                            <p className="text-slate-500 dark:text-slate-400 text-xl ">Code will be displayed in this section.</p>
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

export default CodeGenerator;