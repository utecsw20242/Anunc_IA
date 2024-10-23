import React from "react";
import { Label, Input, Button, Switch } from "../../../components";

function UsersSettingsPage() {
    return (
        <>
            <div className="flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xl text-slate-700 dark:text-white font-bold">
                        Users Settings
                    </h4>
                </div>
                <div className="px-6 py-5">
                    <div className="flex flex-wrap items-center -mx-3">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Enable new users registration"
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Email Verification"
                                    size="sm"
                                    note="Send email verification when a user create account or changes email address."
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="unverifiedUsers"
                                    className="mb-2"
                                >
                                    Delete unverified users
                                </Label>
                                <Input
                                    defaultValue="3"
                                    id="unverifiedUsers"
                                    type="number"
                                    min="0"
                                    end="Days"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label htmlFor="inactiveUsers" className="mb-2">
                                    Delete inactive users
                                </Label>
                                <Input
                                    defaultValue="4"
                                    id="inactiveUsers"
                                    type="number"
                                    min="0"
                                    end="Weeks"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Testimonial reminders"
                                    size="sm"
                                    note="Send an email reminding customer for a tesimonial"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Notify via email for server down time"
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 py-2">
                            <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                Update User
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersSettingsPage;
