import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { ColorPalette, Document, Message } from "../../../components/icons";
import RecentDocument from "./RecentDocument";
import OverviewCard from "./OverviewCard";
import WelcomeCard from "./WelcomeCard";  
import InfoTiles
 from "./InfoTiles";  

function Home() {
    return (
        <Layout title="User Dashboard">
            <Section className="py-10 px-3">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Overview
                            </h2>
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/#"
                                className="bg-blue-600 text-white hover:bg-blue-800"
                            >
                                Create New
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-3">
                        <WelcomeCard
                            name="Phillip Burke"
                            wordsAvailable="48,610"
                            imageCredit="1987"
                            badge="Premium"
                        />
                        <OverviewCard
                            icon={Document}
                            value="132"
                            description="Document Created"
                            link="/#"
                            linkText="Create Document"
                        />
                        <OverviewCard
                            icon={ColorPalette}
                            value="28"
                            description="Image Created"
                            link="/#"
                            linkText="Create Image"
                        />
                        <OverviewCard
                            icon={Message}
                            value="289"
                            description="Chat Session"
                            link="/#"
                            linkText="Chat Now"
                            badge="Premium"
                        />
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
                        <div className="w-full p-3">
                            <RecentDocument />
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default Home;
