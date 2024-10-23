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
    Switch,
    Card,
} from "../../../../components";
import { packages, currency } from "../../../../store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const packageStatus = [
    { name: "Active" },
    { name: "Pending" },
    { name: "Disabled" },
];

function PackageEdit() {
    const { packageId } = useParams();

    const plan = packages.filter((item) => item.id === packageId)[0];

    const planIndex = packageStatus.findIndex((object) => {
        return object.name.toLowerCase() === plan.status.toLowerCase();
    });

    const currencyIndex = currency.findIndex((object) => {
        return object.code.toLowerCase() === plan.currency.toLowerCase();
    });

    const [selectedStatus, setSelectedStatus] = useState(
        packageStatus[planIndex]
    );
    const [selectedCurrency, setSelectedCurrency] = useState(
        currency[currencyIndex]
    );
    return (
        <Layout title={`Update - ${plan.name}`}>
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Edit Package
                            </h2>
                            <Breadcrumbs
                                items={[
                                    {
                                        text: "Packages",
                                        link: "/admin/package-manager",
                                    },
                                    { text: plan.name },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/admin/package-manager"
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
                                <span className="text-base text-slate-400 font-normal">
                                    Edit -{" "}
                                </span>{" "}
                                {plan.name}
                            </h2>
                        </div>
                        <div className="px-6 pt-5 pb-6 border-b border-slate-200 dark:border-slate-800">
                            <div className="w-full 2xl:w-4/5">
                                <div className="flex flex-wrap items-center -mx-3 -my-2">
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packagename"
                                                className="mb-2"
                                            >
                                                Package Name
                                            </Label>
                                            <Input
                                                defaultValue={plan.name}
                                                id="packagename"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="traildays"
                                                className="mb-2"
                                            >
                                                Trial days
                                            </Label>
                                            <Input
                                                defaultValue={0}
                                                id="traildays"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageStatus"
                                                className="mb-2"
                                            >
                                                Package Status
                                            </Label>
                                            <Select
                                                options={packageStatus}
                                                selected={selectedStatus}
                                                onChange={(value) => {
                                                    setSelectedStatus(value);
                                                }}
                                                id="packageStatus"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageCurrency"
                                                className="mb-2"
                                            >
                                                Package Currency
                                            </Label>
                                            <Select
                                                options={currency}
                                                selected={selectedCurrency}
                                                onChange={(value) => {
                                                    setSelectedCurrency(value);
                                                }}
                                                id="packageCurrency"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packagepricemonthly"
                                                className="mb-2"
                                            >
                                                Price Monthly
                                            </Label>
                                            <Input
                                                defaultValue={
                                                    plan.price.monthly
                                                }
                                                id="packagepricemonthly"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packagepriceyearly"
                                                className="mb-2"
                                            >
                                                Price Yearly
                                            </Label>
                                            <Input
                                                defaultValue={plan.price.yearly}
                                                id="packagepriceyearly"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3">
                                        <div className="py-3">
                                            <div className="flex flex-wrap -my-1 -mx-2">
                                                <div className="py-1 px-2">
                                                    <Switch
                                                        label="Set as Default"
                                                        size="sm"
                                                        checked={plan.default}
                                                    />
                                                </div>
                                                <div className="py-1 px-2">
                                                    <Switch
                                                        label="Set as Featured"
                                                        size="sm"
                                                        checked={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pt-5 pb-6">
                            <div className="mb-2">
                                <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                    Package Features
                                </h2>
                            </div>
                            <div className="w-full 2xl:w-4/5">
                                <div className="flex flex-wrap items-center -mx-3 -my-2">
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageworeds"
                                                className="mb-2"
                                            >
                                                Words
                                            </Label>
                                            <Input
                                                defaultValue={10000}
                                                id="packageworeds"
                                            />
                                            <p className="text-slate-500 text-xs mt-1">
                                                <strong>-1</strong> for
                                                unlimited. <strong>0</strong>{" "}
                                                for disabled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageDocuments"
                                                className="mb-2"
                                            >
                                                Documents
                                            </Label>
                                            <Input
                                                defaultValue={500}
                                                id="packageDocuments"
                                            />
                                            <p className="text-slate-500 text-xs mt-1">
                                                <strong>-1</strong> for
                                                unlimited. <strong>0</strong>{" "}
                                                for disabled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageImages"
                                                className="mb-2"
                                            >
                                                Images
                                            </Label>
                                            <Input
                                                defaultValue={250}
                                                id="packageImages"
                                            />
                                            <p className="text-slate-500 text-xs mt-1">
                                                <strong>-1</strong> for
                                                unlimited. <strong>0</strong>{" "}
                                                for disabled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageAudio"
                                                className="mb-2"
                                            >
                                                Audio to Text
                                            </Label>
                                            <Input
                                                defaultValue={100}
                                                id="packageAudio"
                                            />
                                            <p className="text-slate-500 text-xs mt-1">
                                                <strong>-1</strong> for
                                                unlimited. <strong>0</strong>{" "}
                                                for disabled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageAiCode"
                                                className="mb-2"
                                            >
                                                Ai Code Snippet
                                            </Label>
                                            <Input
                                                defaultValue={150}
                                                id="packageAiCode"
                                            />
                                            <p className="text-slate-500 text-xs mt-1">
                                                <strong>-1</strong> for
                                                unlimited. <strong>0</strong>{" "}
                                                for disabled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full xs:w-1/2 md:w-2/6 px-3">
                                        <div className="py-2">
                                            <Label
                                                htmlFor="packageTeamMembers"
                                                className="mb-2"
                                            >
                                                Team Members
                                            </Label>
                                            <Input
                                                defaultValue={10}
                                                id="packageTeamMembers"
                                            />
                                            <p className="text-slate-500 text-xs mt-1">
                                                <strong>-1</strong> for
                                                unlimited. <strong>0</strong>{" "}
                                                for disabled.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 pb-2 pt-4">
                                        <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                            Update Package
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
            </Section>
        </Layout>
    );
}

export default PackageEdit;
