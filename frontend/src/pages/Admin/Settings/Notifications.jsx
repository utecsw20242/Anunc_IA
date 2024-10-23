import React from "react";
import { Switch, Button } from "../../../components";

function NotificationsSettingsPage() {
    return (
        <>
            <div className="flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xl text-slate-700 dark:text-white font-bold">
                        Notifications Settings
                    </h4>
                </div>
                <div className="px-6 pt-5 pb-6">
                    <div className="mb-3">
                        <h5 className="text-lg text-slate-700 dark:text-white font-bold">
                            Security Alerts
                        </h5>
                    </div>
                    <div className="flex flex-wrap items-center -mx-3 -my-2">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Unusual activity"
                                    size="sm"
                                    note="Email me whenever encounter unusual activity."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 mt-6">
                        <h5 className="text-lg text-slate-700 dark:text-white font-bold">
                            Other Alerts
                        </h5>
                    </div>
                    <div className="flex flex-wrap items-center -mx-3 -my-2">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="New Payment Recive"
                                    size="sm"
                                    note="Notify me when a new payment is successfully processed."
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Support Request"
                                    size="sm"
                                    note="Send email every time for customer support request."
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Daily summary emails"
                                    size="sm"
                                    note="Send me a daily summary of an overview via email."
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
            </div>
        </>
    );
}

export default NotificationsSettingsPage;
