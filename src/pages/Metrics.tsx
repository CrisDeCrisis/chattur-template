import { Dispositives } from "@/components/Dispositives"
import { Registers } from "@/components/Registers"
import { Visitors } from "@/components/Visitors"
import { ScanQR } from "@/components/ScanQR"

export default function Metrics() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                <ScanQR />
                <Dispositives />
                <Visitors />
            </div>
            <Registers />
        </div>
    )
}
