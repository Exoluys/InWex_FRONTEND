import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Warehouse } from "@/lib/types"
import { useRouter } from "next/navigation"

type WarehouseCardProps = {
    warehouse: Warehouse
}

const statusStyles: Record<string, { badge: string; dot: string }> = {
    Operational: {
        badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-400",
    },
    "Under Maintenance": {
        badge: "bg-amber-500/15 text-amber-400 border-amber-500/20",
        dot: "bg-amber-400",
    },
}

const WarehouseCard = ({ warehouse }: WarehouseCardProps) => {
    const router = useRouter()

    return (
        <div className="flex items-center gap-5 rounded-md border-none bg-zinc-900/60 px-8 py-6">
            <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-white">{warehouse.name}</p>
                <div className="mt-3 flex items-center gap-3">
                    <Badge
                        variant="outline"
                        className={`gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyles["Operational"].badge}`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyles["Operational"].dot}`} />
                        Operational
                    </Badge>
                </div>
            </div>
            <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push(`/dashboard/warehouse/${warehouse.id}`)}
            >
                View Details
            </Button>
        </div>
    )
}

export default WarehouseCard