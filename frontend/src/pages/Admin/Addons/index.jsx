import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs, Button } from "../../../components";
const addons = [
    {
        img: "/images/addons/shopify.png",
        name: "Shopify",
        status: "Connected",
        description:
            "Crafts engaging and informative written products discription then put directly into in shopify.",
    },
    {
        img: "/images/addons/dropbox.png",
        name: "Dropbox",
        status: "Connected",
        description:
            "Connect dropbox to store your generated content directly from this panel to your account.",
    },
    {
        img: "/images/addons/mailchimp.png",
        name: "Mailchimp",
        status: "Connect",
        description:
            "Connect dropbox to store your generated content directly from this panel to your account.",
    },
    {
        img: "/images/addons/stripe.png",
        name: "Stripe",
        status: "Connected",
        description:
            "Connect dropbox to store your generated content directly from this panel to your account.",
    },
    {
        img: "/images/addons/slack.png",
        name: "Slack",
        status: "Connect",
        description:
            "Connect dropbox to store your generated content directly from this panel to your account.",
    },
    {
        img: "/images/addons/instagram.png",
        name: "Instagram",
        status: "Connected",
        description:
            "Connect dropbox to store your generated content directly from this panel to your account.",
    },
    {
        img: "/images/addons/tiktok.png",
        name: "Tiktok",
        status: "Connected",
        description:
            "Connect dropbox to store your generated content directly from this panel to your account.",
    },
];
function AddonsPage() {
    return (
        <Layout title="Addons">
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Addons
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "Addons" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="grid gap-5 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {addons.map((item, index) => (
                            <div
                                key={index}
                                className="relative bg-white dark:bg-slate-950 p-5 rounded-lg border border-slate-200 dark:border-slate-800 transition-all"
                            >
                                <div className="absolute top-5 end-5">
                                    {item.status == "Connected" && (
                                        <Button
                                            size="sm"
                                            className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200"
                                        >
                                            <span>Connected</span>
                                        </Button>
                                    )}
                                    {item.status == "Connect" && (
                                        <Button
                                            size="sm"
                                            className="bg-blue-600 text-white hover:bg-blue-800"
                                        >
                                            <span>Connect</span>
                                        </Button>
                                    )}
                                </div>
                                <div className="h-10 mb-2">
                                    <img
                                        className="h-full"
                                        src={item.img}
                                        alt={item.name}
                                    />
                                </div>
                                <h6 className="text-lg font-bold text-slate-700 dark:text-white mb-2">
                                    {item.name}
                                </h6>
                                <p className="text-sm text-slate-500 dark:text-slate-300">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default AddonsPage;
