import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../../layout/dashboard";
import Section from "../../../../layout/global/Section";
import Container from "../../../../layout/global/Container";
import {
    Breadcrumbs,
    Button,
    Label,
    Input,
    Select,
    Textarea,
    Card,
} from "../../../../components";
import { templates } from "../../../../store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const templateStatus = [
    { name: "Active" },
    { name: "Pending" },
    { name: "Disabled" },
];

const templateApi = [
    { name: "Text" },
    { name: "Image" },
    { name: "Video" },
    { name: "Chat" },
    { name: "Code" },
];

const templateAiModel = [
    { name: "gpt-4" },
    { name: "gpt-3.5" },
    { name: "dall-e" },
    { name: "codex" },
    { name: "davinci" },
    { name: "curie" },
    { name: "babbage" },
    { name: "ada" },
    { name: "whisper" },
    { name: "motion" },
];

function TemplateEdit() {
    [];
    const { templateId } = useParams();

    const template = templates.filter(
        (template) => template.id === templateId
    )[0];

    const statusIndex = templateStatus.findIndex((object) => {
        return object.name.toLowerCase() === template.status.toLowerCase();
    });

    const [selectedStatus, setSelectedStatus] = useState(
        templateStatus[statusIndex]
    );

    const apiIndex = templateApi.findIndex((object) => {
        return object.name.toLowerCase() === template.api.toLowerCase();
    });

    const [selectedApi, setSelectedApi] = useState(templateApi[apiIndex]);

    const aiModelIndex = templateAiModel.findIndex((object) => {
        return object.name.toLowerCase() === template.aimodel.toLowerCase();
    });

    const [selectedAiModel, setSelectedAiModel] = useState(
        templateAiModel[aiModelIndex]
    );

    return (
        <Layout title={`Update - ${template.name}`}>
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Edit Template
                            </h2>
                            <Breadcrumbs
                                items={[
                                    {
                                        text: "Edit Template",
                                        link: "/admin/template-manager",
                                    },
                                    { text: template.name },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/admin/template-manager"
                                className="bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white"
                            >
                                <ArrowLeftIcon className="h-5 -mx-2 sm:mx-0 sm:h-4" />
                                <span className="hidden sm:block">Back</span>
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                                <span className="text-base text-slate-400 dark:text-slate-300 font-normal">
                                    Edit -{" "}
                                </span>{" "}
                                {template.name}
                            </h2>
                        </div>
                        <div className="px-6 pt-5 pb-6">
                            <div className="flex flex-wrap -mx-3 -my-2">
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="templatename"
                                            className="mb-2"
                                        >
                                            Template Name
                                        </Label>
                                        <Input
                                            defaultValue={template.name}
                                            id="templatename"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="templateStatus"
                                            className="mb-2"
                                        >
                                            Template Status
                                        </Label>
                                        <Select
                                            options={templateStatus}
                                            selected={selectedStatus}
                                            onChange={(value) => {
                                                setSelectedStatus(value);
                                            }}
                                            id="templateStatus"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="templateApi"
                                            className="mb-2"
                                        >
                                            API Type
                                        </Label>
                                        <Select
                                            options={templateApi}
                                            selected={selectedApi}
                                            onChange={(value) => {
                                                setSelectedApi(value);
                                            }}
                                            id="templateApi"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="templateAiModel"
                                            className="mb-2"
                                        >
                                            AI Model
                                        </Label>
                                        <Select
                                            options={templateAiModel}
                                            selected={selectedAiModel}
                                            onChange={(value) => {
                                                setSelectedAiModel(value);
                                            }}
                                            id="templateAiModel"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="templatedescription"
                                            className="mb-2"
                                        >
                                            Template Name
                                        </Label>
                                        <Textarea
                                            defaultValue={template.description}
                                            id="templatedescription"
                                            rows="6"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="templateprompt"
                                            className="mb-2"
                                        >
                                            Template Prompt
                                        </Label>
                                        <Textarea
                                            defaultValue={template.prompt}
                                            id="templateprompt"
                                            rows="6"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 pb-2 pt-4">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                        Update Template
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
            </Section>
        </Layout>
    );
}

export default TemplateEdit;
