import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs, Button } from "../../../components";
import PackageTable from "./PackageTable";

function PackageManagePage() {
    return (
        <Layout title="Packages">
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Package Manager
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "Packages" },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                className="bg-blue-600 text-white hover:bg-blue-800"
                            >
                                Create Package
                            </Button>
                        </div>
                    </div>
                    <PackageTable />
                </Container>
            </Section>
        </Layout>
    );
}

export default PackageManagePage;
