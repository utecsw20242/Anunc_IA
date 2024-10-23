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
    DatePicker,
    Card,
} from "../../../../components";

import { coupons } from "../../../../store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
const couponStatus = [
    { name: "Active" },
    { name: "Pending" },
    { name: "Disabled" },
];
function CouponEdit() {
    const { couponId } = useParams();

    const coupon = coupons.filter((coupon) => coupon.id === couponId)[0];

    const statusIndex = couponStatus.findIndex((object) => {
        return object.name.toLowerCase() === coupon.status.toLowerCase();
    });

    const [selectedStatus, setSelectedStatus] = useState(
        couponStatus[statusIndex]
    );

    const [startDate, setStartDate] = useState(new Date(coupon.expdate));

    return (
        <Layout title={`Update - ${coupon.title}`}>
            <Section className="px-3 py-6">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                Edit Coupon
                            </h2>
                            <Breadcrumbs
                                items={[
                                    {
                                        text: "Edit Coupon",
                                        link: "/admin/coupons",
                                    },
                                    { text: coupon.title },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="/admin/coupons"
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
                                {coupon.title}
                            </h2>
                        </div>
                        <div className="px-6 pt-5 pb-6">
                            <div className="flex flex-wrap items-center -mx-3 -my-2">
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label htmlFor="title" className="mb-2">
                                            Coupon Title
                                        </Label>
                                        <Input
                                            defaultValue={coupon.title}
                                            id="title"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 px-3">
                                    <div className="py-2">
                                        <Label htmlFor="code" className="mb-2">
                                            Coupon Code
                                        </Label>
                                        <Input
                                            defaultValue={coupon.code}
                                            id="code"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="discount"
                                            className="mb-2"
                                        >
                                            Discount
                                        </Label>
                                        <Input
                                            defaultValue={coupon.discount}
                                            id="discount"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 xl:w-2/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="couponStatus"
                                            className="mb-2"
                                        >
                                            Coupon Status
                                        </Label>
                                        <Select
                                            options={couponStatus}
                                            selected={selectedStatus}
                                            onChange={(value) => {
                                                setSelectedStatus(value);
                                            }}
                                            id="couponStatus"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="avilable"
                                            className="mb-2"
                                        >
                                            Coupon Count
                                        </Label>
                                        <Input
                                            defaultValue={coupon.avilable}
                                            id="avilable"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 px-3">
                                    <div className="py-2">
                                        <Label
                                            htmlFor="avilable"
                                            className="mb-2"
                                        >
                                            Coupon Expiers
                                        </Label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
                                            }
                                            showTimeSelect={true}
                                            dateFormat="dd-MM-yyyy  h:mm aa"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 pb-2 pt-4">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                        Update Coupon
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

export default CouponEdit;
