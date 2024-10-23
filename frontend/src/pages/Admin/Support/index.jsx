import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs } from "../../../components";
import SupportCard from "./SupportCard";

function SupportMangePage() {
    return (
        <Layout title="Supports">
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3 flex-wrap gap-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Support Center
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "Support Center" },
                                ]}
                            />
                        </div>
                        <div className="flex flex-wrap -space-x-px px-3">
                            <div className="bg-white dark:bg-slate-950 py-3 px-4 first:rounded-s-md last:rounded-e-md border border-slate-200 dark:border-slate-800">
                                <div className="text-base leading-4 font-bold text-rose-600">
                                    08
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                                    In queue
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-950 py-3 px-4 first:rounded-s-md last:rounded-e-md border border-slate-200 dark:border-slate-800">
                                <div className="text-base leading-4 font-bold text-amber-500">
                                    03
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                                    In Progress
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-950 py-3 px-4 first:rounded-s-md last:rounded-e-md border border-slate-200 dark:border-slate-800">
                                <div className="text-base leading-4 font-bold text-blue-600">
                                    689
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                                    All Tickets
                                </div>
                            </div>
                        </div>
                    </div>
                    <SupportCard />
                </Container>
            </Section>
        </Layout>
    );
}

export default SupportMangePage;
