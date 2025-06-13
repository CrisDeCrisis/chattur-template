import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import { QRData } from "@/constants/qrs"

// Chart área de usuarios registrados con QR

const chartConfig = {
    smartphone: {
        label: "Smartphone",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

function calcularPorcentaje(data: { month: string; smartphone: number }[]) {
    if (!data.length) return 0;

    const inicio = data[data.length - 2].smartphone;
    const fin = data[data.length - 1].smartphone;

    const diferencia = inicio - fin;
    const porcentaje = (diferencia / inicio) * 100;

    return (-porcentaje).toFixed(1);
}

export function ScanQR() {

    const porcentaje = calcularPorcentaje(QRData);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Usuarios registrados con QR</CardTitle>
                <CardDescription>
                    Enero - Jun 2025
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={QRData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />
                        <Area
                            dataKey="smartphone"
                            type="linear"
                            fill="var(--color-smartphone)"
                            fillOpacity={0.4}
                            stroke="var(--color-smartphone)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col align-baseline gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {Number(porcentaje) > 0 ? (
                        <>Aumento del {porcentaje}% este mes <TrendingUp className="h-4 w-4" /></>
                    ) : (
                        <>Descenso del {porcentaje}% este mes <TrendingDown className="h-4 w-4" /></>
                    )}
                </div>
                <div className="text-muted-foreground leading-none">
                    Usuarios registrados a través de códigos QR
                </div>
            </CardFooter>
        </Card>
    )
}
