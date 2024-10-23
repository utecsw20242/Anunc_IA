import React, { useState } from "react";
import {
    Label,
    Input,
    Button,
    Switch,
    Radio,
    Select,
} from "../../../components";

const acceptedCurrencyList = [
    { name: "USD" },
    { name: "AUD" },
    { name: "CAD" },
    { name: "EUR" },
    { name: "GBP" },
];

function PaymentSettingsPage() {
    const [selectedCurrency, setSelectedCurrency] = useState(
        acceptedCurrencyList[0]
    );
    return (
        <>
            <div className="flex-grow-1 w-full bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-xl text-slate-700 dark:text-white font-bold">
                        Payment Settings
                    </h4>
                </div>
                <div className="px-6 py-5">
                    <div className="flex flex-wrap items-center -mx-3">
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Enable Payment System"
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Label htmlFor="siteURL" className="mb-2">
                                    Enabled payment types
                                </Label>
                                <div className="flex flex-wrap -mx-2 -my-1">
                                    <div className="px-2 py-1">
                                        <Radio
                                            id="oneTimePayment"
                                            name="paymentsystem"
                                            label="One Time"
                                        />
                                    </div>
                                    <div className="px-2 py-1">
                                        <Radio
                                            id="recurringPayment"
                                            name="paymentsystem"
                                            label="Recurring"
                                        />
                                    </div>
                                    <div className="px-2 py-1">
                                        <Radio
                                            id="bothPayment"
                                            name="paymentsystem"
                                            label="Both"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="acceptedCurrency"
                                    className="mb-2"
                                >
                                    Accepted Currency
                                </Label>
                                <Select
                                    selected={selectedCurrency}
                                    id="acceptedCurrency"
                                    options={acceptedCurrencyList}
                                    onChange={(value) => {
                                        setSelectedCurrency(value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Enable Discount Codes"
                                    size="sm"
                                    note="Enabling this settings will enable users to add a discount code created from the admin panel, before checkout."
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <div className="py-2">
                                <Switch
                                    label="Enable Invoices"
                                    size="sm"
                                    note="Enableing Invoices will generate invoice for every transaction by an customer"
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <div className="py-2">
                                <Label
                                    htmlFor="expiryReminder"
                                    className="mb-2"
                                >
                                    Plan expiry reminder
                                </Label>
                                <Input
                                    defaultValue="14"
                                    id="expiryReminder"
                                    type="number"
                                    min="0"
                                    end="Days"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 py-2">
                            <Button className="bg-blue-600 text-white hover:bg-blue-800">
                                Update Payment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentSettingsPage;
