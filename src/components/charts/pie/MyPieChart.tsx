import { PieChart } from "@mui/x-charts/PieChart";

const data = [
    {
        id: 0,
        value: 80,
        label: "Правильные ответы",
        color: "var(--light-green-2)",
    },
    {
        id: 1,
        value: 20,
        label: "Неправильные ответы",
        color: "var(--light-red-2)",
    },
];

export interface IPieChartDataType {
    id: number;
    value: number;
    label: string;
    color?: string;
}

interface MyPieChartProps {
    data: IPieChartDataType[];
}

const MyPieChart = ({ data }: MyPieChartProps) => {
    return (
        <PieChart
            height={300}
            slotProps={{
                legend: { hidden: true },
            }}
            tooltip={{
                trigger: "item",
            }}
            series={[
                {
                    data: data,
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 3,
                    cornerRadius: 6,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                        innerRadius: 50,
                        additionalRadius: -10,
                        color: "gray",
                    },
                    valueFormatter: (v) =>
                        v === null ? "" : String(v.value) + "%",
                },
            ]}
        />
    );
};

export default MyPieChart;
