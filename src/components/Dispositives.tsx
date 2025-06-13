import { TrendingDown, TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
import { comparativeDispositives, dispositivesData } from "@/constants/dispositives"

// Chart radial de interacciones por dispositivo

const chartConfig = {
    smartphone: {
        label: "Smartphone",
        color: "var(--chart-1)",
    },
    web: {
        label: "Web",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

function calcularPorcentaje(data: { month: string; dispositives: number }[]) {
    if (!data.length) return 0;

    const inicio = data[data.length - 2].dispositives;
    const fin = data[data.length - 1].dispositives;

    const diferencia = inicio - fin;
    const porcentaje = (diferencia / inicio) * 100;

    return (-porcentaje).toFixed(1);
}

export function Dispositives() {
    const totalVisitors = dispositivesData[0].smartphone + dispositivesData[0].web

    const porcentaje = calcularPorcentaje(comparativeDispositives);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Interacciones</CardTitle>
                <CardDescription>Junio 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={dispositivesData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Interacciones
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="smartphone"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-smartphone)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="web"
                            fill="var(--color-web)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
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
                    Total de interacciones en el último mes
                </div>
            </CardFooter>
        </Card>
    )
}
