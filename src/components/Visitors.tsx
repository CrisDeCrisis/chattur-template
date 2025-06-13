import { useMemo } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { comparativeVisitors, visitorsData } from "@/constants/visitors"

// Chart pie de visitantes por navegador

const chartConfig = {
    visitors: {
        label: "Visitas",
    },
    instagram: {
        label: "Instagram",
        color: "var(--chart-1)",
    },
    qr: {
        label: "QR's",
        color: "var(--chart-2)",
    },
    facebook: {
        label: "Facebook",
        color: "var(--chart-3)",
    },
    web_oficial: {
        label: "Web Oficial",
        color: "var(--chart-4)",
    },
    otros: {
        label: "Otros",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

function calcularPorcentaje(data: { month: string; visitors: number }[]) {
    if (!data.length) return 0;

    const inicio = data[data.length - 2].visitors;
    const fin = data[data.length - 1].visitors;

    const diferencia = inicio - fin;
    const porcentaje = (diferencia / inicio) * 100;

    return (-porcentaje).toFixed(1);
}

export function Visitors() {
    const totalVisitors = useMemo(() => {
        return visitorsData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    const porcentaje = calcularPorcentaje(comparativeVisitors);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Visitantes</CardTitle>
                <CardDescription>Junio 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={visitorsData}
                            dataKey="visitors"
                            nameKey="platform"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitas
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {Number(porcentaje) > 0 ? (
                        <>Aumento del {porcentaje}% este mes <TrendingUp className="h-4 w-4" /></>
                    ) : (
                        <>Descenso del {porcentaje}% este mes <TrendingDown className="h-4 w-4" /></>
                    )}
                </div>
                <div className="text-muted-foreground leading-none">
                    Visitas desde diferentes plataformas
                </div>
            </CardFooter>
        </Card>
    )
}
