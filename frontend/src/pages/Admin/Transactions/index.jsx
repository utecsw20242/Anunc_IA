import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs } from "../../../components";
import TransactionTable from "./TransactionTable";

function TransactionsPage() {
    return (
        <Layout title="Transactions">
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Transactions
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Dashboard", link: "/admin" },
                                    { text: "Transactions" },
                                ]}
                            />
                        </div>
                    </div>
                    <TransactionTable />
                </Container>
            </Section>
        </Layout>
    );
}

export default TransactionsPage;
