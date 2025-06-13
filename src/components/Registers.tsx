import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { registersData } from "@/constants/registers"

// Área chart de registros de usuarios por dispositivo

const chartConfig = {
    visitors: {
        label: "Visitantes",
    },
    web: {
        label: "Web",
        color: "var(--chart-1)",
    },
    smartphone: {
        label: "Smartphone",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function Registers() {
    const [timeRange, setTimeRange] = useState("90d")

    const filteredData = registersData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2025-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0 min-h-[90vh] flex-1 rounded-xl md:min-h-min">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Registro de usuarios</CardTitle>
                    <CardDescription>
                        Usuarios registrados en el último periodo.
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Últimos 3 meses
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Últimos 30 días
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Últimos 7 días
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillWeb" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-web)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-web)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillSmartphone" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-smartphone)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-smartphone)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("es-ES", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("es-ES", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="smartphone"
                            type="natural"
                            fill="url(#fillWeb)"
                            stroke="var(--color-web)"
                            stackId="a"
                        />
                        <Area
                            dataKey="web"
                            type="natural"
                            fill="url(#fillSmartphone)"
                            stroke="var(--color-smartphone)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
