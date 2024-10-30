import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { templates } from "../../../store";
import { Breadcrumbs } from "../../../components";

function TemplatesPage() {
    return (
        <Layout title="Templates">
            <Section className="py-10 px-3">
                <Container>
                    <div className="mb-7 flex flex-col items-center">
                        <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                            Plantillas Disponibles
                        </h2>
                        <Breadcrumbs
                            items={[
                                { text: "Inicio", link: "/" },
                                { text: "Plantillas" },
                            ]}
                        />
                    </div>
                    <div className="grid gap-6 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {templates.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="bg-white dark:bg-slate-950 p-5 rounded-lg border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-1"
                            >
                                <div className="h-10 mb-2">{item.icon}</div>
                                <h6 className="text-lg font-bold text-slate-700 dark:text-white mb-2">
                                    {item.name}
                                </h6>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default TemplatesPage;
