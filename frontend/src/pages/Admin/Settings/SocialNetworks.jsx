import React from "react";
import { Label, Input, Checkbox, Button } from "../../../components";

function SocialNetworksSettingsPage() {
    return (
        <>
            <div className="flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xl text-slate-700 dark:text-white font-bold">
                        Social Networks Settings
                    </h4>
                </div>
                <div className="px-6 pt-5 pb-6">
                    <div className="flex flex-wrap items-center -mx-3 -my-2">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label htmlFor="tiktokProfile" className="mb-2">
                                    Tiktok
                                </Label>
                                <Input
                                    defaultValue="scribbler.ai"
                                    id="tiktokProfile"
                                    start="tiktok.com/@"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="youtubeProfile"
                                    className="mb-2"
                                >
                                    Youtube
                                </Label>
                                <Input
                                    defaultValue="scribbler.ai"
                                    id="youtubeProfile"
                                    start="youtube.com/"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="twitterProfile"
                                    className="mb-2"
                                >
                                    Twitter
                                </Label>
                                <Input
                                    placeholder="username"
                                    defaultValue=""
                                    id="twitterProfile"
                                    start="twitter.com/"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="instagramProfile"
                                    className="mb-2"
                                >
                                    Instagram
                                </Label>
                                <Input
                                    placeholder="username"
                                    defaultValue=""
                                    id="instagramProfile"
                                    start="instagram.com/"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="facebookProfile"
                                    className="mb-2"
                                >
                                    Facebook
                                </Label>
                                <Input
                                    placeholder="username"
                                    defaultValue=""
                                    id="facebookProfile"
                                    start="facebook.com/"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-3">
                                <Checkbox
                                    type="checkbox"
                                    id="allowNetworkShow"
                                    label="Show this on landing page"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 py-2">
                            <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                Update Networks
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SocialNetworksSettingsPage;
