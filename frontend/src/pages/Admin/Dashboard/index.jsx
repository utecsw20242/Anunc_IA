import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Button } from "../../../components";
import InfoTiles from "./InfoTiles";
import NewUsers from "./NewUsers";
import ReacentTransactions from "./ReacentTransactions";
import TemplatesList from "./TemplatesList";

function AdminDashboard() {
    return (
        <Layout title="Admin Dashboard">
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex flex-wrap gap-3 justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Overview
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-200">
                                Welcome back to Scribbler.AI
                            </p>
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/admin/settings"
                                className="bg-blue-600 text-white hover:bg-blue-800"
                            >
                                Update Settings
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-3">
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="New Users"
                                accent
                                data={{
                                    thisMonth: "487",
                                    lastMonth: "225",
                                    thisYear: "187500",
                                }}
                            />
                        </div>
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="New Subscribers"
                                data={{
                                    thisMonth: "78",
                                    lastMonth: "124",
                                    thisYear: "759",
                                }}
                            />
                        </div>
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="Total Income"
                                data={{
                                    thisMonth: "$17855",
                                    lastMonth: "$822",
                                    thisYear: "$87042",
                                }}
                            />
                        </div>
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="Total Spending"
                                data={{
                                    thisMonth: "$856",
                                    lastMonth: "$227",
                                    thisYear: "$11510",
                                }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 p-3">
                            <NewUsers />
                        </div>
                        <div className="w-full lg:w-1/2 p-3">
                            <ReacentTransactions />
                        </div>
                    </div>
                    <TemplatesList />
                </Container>
            </Section>
        </Layout>
    );
}

export default AdminDashboard;
