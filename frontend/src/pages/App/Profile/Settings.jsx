import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
    Input,
    Label,
    Select,
    Checkbox,
    Switch,
    Button,
} from "../../../components";
import { country, language } from "../../../store";
const displayname = [
    { name: "Mr. Phillip" },
    { name: "Mr. Burke" },
    { name: "Phillip Burke" },
];
function Settings() {
    const [selectedDisplayname, setSelectedDisplayname] = useState(
        displayname[0]
    );
    const [selectedLanguage, setSelectedLanguage] = useState(language[6]);
    const [selectedCountry, setSelectedCountry] = useState(country[227]);
    return (
        <>
            <div className="px-6 pt-4 pb-5">
                <div className="flex flex-wrap items-center -mx-3">
                    <div className="w-full sm:w-1/2 px-3">
                        <div className="py-2">
                            <Label htmlFor="fullName" className="mb-2">
                                Full Name
                            </Label>
                            <Input defaultValue="Phillip Burke" id="fullName" />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                        <div className="py-2">
                            <Label htmlFor="displayName" className="mb-2">
                                Display Name
                            </Label>
                            <Select
                                selected={selectedDisplayname}
                                onChange={(value) => {
                                    setSelectedDisplayname(value);
                                }}
                                options={displayname}
                                id="displayName"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                        <div className="py-2">
                            <Label
                                htmlFor="useremail"
                                className="mb-2 w-full items-center justify-between"
                            >
                                Email
                                <a
                                    className="text-xs text-blue-500 hover:text-blue-700"
                                    href="#"
                                >
                                    Edit Email
                                </a>
                            </Label>
                            <Input
                                defaultValue="phillip@scribbler.ai"
                                id="useremail"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                        <div className="py-2">
                            <Label htmlFor="userphone" className="mb-2">
                                Phone No
                            </Label>
                            <Input
                                defaultValue="088 3579 454 687"
                                id="userphone"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                        <div className="py-2">
                            <Label htmlFor="usercountry" className="mb-2">
                                Country
                            </Label>
                            <Select
                                selected={selectedCountry}
                                options={country}
                                onChange={(value) => {
                                    setSelectedCountry(value);
                                }}
                                id="usercountry"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                        <div className="py-2">
                            <Label htmlFor="userlanguage" className="mb-2">
                                Language
                            </Label>
                            <Select
                                selected={selectedLanguage}
                                options={language}
                                onChange={(value) => {
                                    setSelectedLanguage(value);
                                }}
                                id="userlanguage"
                            />
                        </div>
                    </div>
                    <div className="w-full px-3">
                        <div className="py-3">
                            <Checkbox
                                type="checkbox"
                                id="allowemail"
                                label="Allow Marketing  Email"
                            />
                        </div>
                    </div>
                    <div className="w-full px-3 py-2">
                        <Button className="bg-blue-600 text-white hover:bg-blue-800">
                            Update Profile
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-6 pt-4 pb-5 border-t border-slate-200 dark:border-slate-800">
                <div className="mt-2 mb-2">
                    <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                        Reset Password
                    </h2>
                    <p className="text-sm text-slate-500">
                        Password must be at least 8 character and contain
                        symbols.
                    </p>
                </div>
                <div className="flex flex-wrap items-center -mx-3">
                    <div className="w-full  lg:w-1/3 px-3">
                        <div className="py-2">
                            <Label htmlFor="currentPassword" className="mb-2">
                                Current Password
                            </Label>
                            <Input
                                defaultValue=""
                                id="currentPassword"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-3">
                        <div className="py-2">
                            <Label htmlFor="newPassword" className="mb-2">
                                New Password
                            </Label>
                            <Input
                                defaultValue=""
                                id="newPassword"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 lg:w-1/3 px-3">
                        <div className="py-2">
                            <Label htmlFor="confirmPassword" className="mb-2">
                                Confirm Password
                            </Label>
                            <Input
                                defaultValue=""
                                id="confirmPassword"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="w-full px-3 pb-2 pt-4">
                        <Button className="bg-blue-600 text-white hover:bg-blue-800">
                            Update Password
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-6 pt-4 pb-5 border-t border-slate-200 dark:border-slate-800">
                <div className="mt-2 mb-2 sm:w-2/3">
                    <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                        Connected Accounts
                    </h2>
                    <p className="text-sm text-slate-500">
                        A feature allowing linking and synchronization of
                        multiple accounts or profiles for seamless integration
                        and access across platforms.
                    </p>
                </div>
                <div className="pt-3 flex flex-col gap-4">
                    <div className="border border-slate-200 dark:border-slate-800 rounded-md p-3 relative">
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faGoogle}
                                className="h-5 w-5 text-white p-2 rounded-md bg-rose-600"
                            />
                            <div className="ps-3">
                                <h6 className="text-sm font-bold text-slate-600 dark:text-slate-200">
                                    Google Account
                                </h6>
                                <p className="text-xs text-slate-500">
                                    Your google account is connected.
                                </p>
                            </div>
                            <Switch
                                className="ms-auto items-center"
                                name="google-connect"
                            />
                        </div>
                    </div>
                    <div className="border border-slate-200 dark:border-slate-800 rounded-md p-3 relative">
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faFacebookF}
                                className="h-5 w-5 text-white p-2 rounded-md bg-blue-600"
                            />
                            <div className="ps-3">
                                <h6 className="text-sm font-bold text-slate-600 dark:text-slate-200">
                                    Google Account
                                </h6>
                                <p className="text-xs text-slate-500">
                                    Your google account is connected.
                                </p>
                            </div>
                            <Switch
                                className="ms-auto items-center"
                                name="facebook-connect"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;
