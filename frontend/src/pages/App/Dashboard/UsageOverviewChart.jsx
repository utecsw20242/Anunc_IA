import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../../../layout/provider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


function UsageOverviewChart() {
    const theme = useTheme();
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                displayColors: false,
                callbacks: {
                    labelColor: function (context) {
                        return {
                            borderColor: "rgb(30 41 59)",
                            backgroundColor: "rgb(30 41 59)",
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 2,
                        };
                    },
                    label: function (context) {
                        let label = context.dataset.label || "";
                        if (label) {
                            label += ` : ${context.parsed.y}`;
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            y: {
                display: true,
                beginAtZero: true,
                ticks: {
                    color: "rgb(100 116 139)",
                    font: {
                        size: "11px",
                    },
                    padding: 10,
                },
                grid: {
                    color: theme.mode !== "dark" ? "rgb(226 232 240)" : "rgb(30 41 59)",
                    tickMarkLength: 0,
                },
            },
            x: {
                display: true,
                ticks: {
                    color: "rgb(100 116 139)",
                    font: {
                        size: "9px",
                    },
                    source: "auto",
                    padding: 5,
                    callback: function (value) {
                        return value;
                    },
                },
                grid: {
                    color: "transparent",
                    tickMarkLength: 0,
                    zeroLineColor: "transparent",
                },
            },
        },
    };
    
    const labels = [
        "01 May",
        "02 May",
        "03 May",
        "04 May",
        "05 May",
        "06 May",
        "07 May",
        "08 May",
        "09 May",
        "10 May",
        "11 May",
        "12 May",
        "13 May",
        "14 May",
        "15 May",
        "16 May",
        "17 May",
        "18 May",
        "19 May",
        "20 May",
        "21 May",
        "22 May",
        "23 May",
        "24 May",
        "25 May",
        "26 May",
        "27 May",
        "28 May",
        "29 May",
        "30 May",
    ];
    
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Word Used",
                data: [
                    260, 270, 280, 400, 550, 400, 390, 360, 400, 500, 700, 900, 800,
                    600, 550, 500, 520, 540, 580, 620, 670, 700, 700, 710, 690, 620,
                    640, 680, 660, 630,
                ],
                borderWidth: 2,
                borderColor: "rgb(37,99,235)",
                backgroundColor: "rgba(37,99,235, 0.5)",
                lineTension: 0.4,
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 4,
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBorderColor: "rgb(37,99,235)",
                pointHoverBackgroundColor: "#fff",
            },
        ],
    };
    return <Line options={options} data={data} />;
}

export default UsageOverviewChart;
