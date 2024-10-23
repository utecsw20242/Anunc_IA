import React, { useState } from "react";
import {
    Label,
    Input,
    Select,
    Checkbox,
    Button,
    Radio,
} from "../../../components";
import UploadZone from "../../../components/forms/UploadZone";
import { timezone } from "../../../store";

let timezoneData = timezone
    .map((item) => `{"name":"${item.text}","value":"${item.value}"}`)
    .join(",");
timezoneData = JSON.parse(`{"options":[${timezoneData}]}`);

const siteLanguage = [
    { name: "English" },
    { name: "Spanish" },
    { name: "Portuguese" },
];
function GeneralSettingsPage() {
    const [selectedLanguage, setSelectedLanguage] = useState(siteLanguage[0]);
    const [selectedTimeZone, setSelectedTimeZone] = useState(
        timezoneData.options[3]
    );
    return (
        <>
            <div className="flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xl text-slate-700 dark:text-white font-bold">
                        General Settings
                    </h4>
                </div>
                <div className="px-6 pt-5 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap -mx-3 -my-2">
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="siteName" className="mb-2">
                                    Site Name
                                </Label>
                                <Input
                                    defaultValue="Scribbler.AI"
                                    id="siteName"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="siteTagline" className="mb-2">
                                    Site Tagline
                                </Label>
                                <Input
                                    defaultValue="No1. AI Copywriter"
                                    id="siteTagline"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="siteEmail" className="mb-2">
                                    Site Email
                                </Label>
                                <Input
                                    defaultValue="contact@scribbler.ai"
                                    id="siteEmail"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="siteURL" className="mb-2">
                                    Site URL
                                </Label>
                                <Input
                                    defaultValue="scribbler.ai"
                                    id="siteURL"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="siteLanguage" className="mb-2">
                                    Site Default Language
                                </Label>
                                <Select
                                    selected={selectedLanguage}
                                    options={siteLanguage}
                                    onChange={(value) => {
                                        setSelectedLanguage(value);
                                    }}
                                    id="siteLanguage"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="siteLanguage" className="mb-2">
                                    Site Time Zone
                                </Label>
                                <Select
                                    selected={selectedTimeZone}
                                    options={timezoneData.options}
                                    onChange={(value) => {
                                        setSelectedTimeZone(value);
                                    }}
                                    value="text"
                                    option="value"
                                    id="siteLanguage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap -mx-3 -my-2">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label htmlFor="siteURL" className="mb-2">
                                    Default Site Theme
                                </Label>
                                <div className="flex flex-wrap -my-1 -mx-2">
                                    <div className="py-1 px-2">
                                        <Radio
                                            id="themeSystem"
                                            name="sitetheme"
                                            label="System"
                                        />
                                    </div>
                                    <div className="py-1 px-2">
                                        <Radio
                                            id="themeDark"
                                            name="sitetheme"
                                            label="Dark"
                                        />
                                    </div>
                                    <div className="py-1 px-2">
                                        <Radio
                                            id="themeLight"
                                            name="sitetheme"
                                            label="Light"
                                            checked
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="siteLogoDarkTheme"
                                    className="mb-2"
                                >
                                    Dark Theme Logo
                                </Label>
                                <UploadZone id="siteLogoDarkTheme" />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="siteLogoLightTheme"
                                    className="mb-2"
                                >
                                    Light Theme Logo
                                </Label>
                                <UploadZone id="siteLogoLightTheme" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-5 border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center -mx-3 -my-2">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Checkbox
                                    type="checkbox"
                                    id="allowsearch"
                                    label="Allow search engines indexing"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Checkbox
                                    type="checkbox"
                                    id="autolanguage"
                                    label="Auto Language Detection"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 py-2">
                            <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                Update Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GeneralSettingsPage;
