import React from "react";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Document, ColorPalette, Message } from "../../../components/icons"; 
import { Button } from "../../../components";
import RecentDocument from "./RecentDocument";
import OverviewCard from "./OverviewCard";
import WelcomeCard from "./WelcomeCard";  
import InfoTiles from "./InfoTiles";  
import TemplatesList from "./TemplatesList";

function Home() {
    return (
        <Layout title="Dashboard">
            <Section className="py-10 px-3">
                <Container>
                    {/* Encabezado de la sección de Overview */}
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Resumen
                            </h2>
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/create-new-campaign"
                                className="bg-blue-600 text-white hover:bg-blue-800"
                            >
                                Crear Nueva Campaña
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap -m-3">
                        {/* Tarjeta de bienvenida al usuario */}
                        <WelcomeCard
                            name="Usuario"
                            wordsAvailable="48,610"
                            imageCredit="3500"
                            badge="Premium"
                        />

                        <OverviewCard
                            icon={ColorPalette}
                            value="152"
                            description="Documentos Generados"
                            link="/documents"
                            linkText="Ver Documentos"
                        />
                        <OverviewCard
                            icon={Message}
                            value="872"
                            description="Anuncios Publicados"
                            link="/ads"
                            linkText="Ver Anuncios"
                        />
                        <OverviewCard
                            icon={ColorPalette}
                            value="$8,245"
                            description="Gastos Publicitarios"
                            link="/spending-details"
                            linkText="Ver Gastos"
                        />

                        {/* Información mensual y anual sobre el rendimiento de campañas */}
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="Rendimiento Anuncios"
                                data={{
                                    thisMonth: "4.2%",
                                    lastMonth: "3.8%",
                                    thisYear: "4.0%",
                                }}
                            />
                        </div>
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="Conversiones"
                                data={{
                                    thisMonth: "642",
                                    lastMonth: "548",
                                    thisYear: "7,843",
                                }}
                            />
                        </div>
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="Ingresos del Mes"
                                data={{
                                    thisMonth: "$17,855",
                                    lastMonth: "$8,220",
                                    thisYear: "$87,042",
                                }}
                            />
                        </div>
                        <div className="w-full xs:w-1/2 lg:w-1/4 p-3">
                            <InfoTiles
                                title="Gastos del Mes"
                                data={{
                                    thisMonth: "$2,156",
                                    lastMonth: "$1,227",
                                    thisYear: "$11,510",
                                }}
                            />
                        </div>

                        {/* Documentos Recientes y Plantillas */}
                        <div className="w-full p-3">
                            <RecentDocument />
                        </div>
                        
                        <TemplatesList />
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default Home;
