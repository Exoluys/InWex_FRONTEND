import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Users } from "lucide-react"

const WarehouseCard = () => {
    const cardDetails = [
        {
            title: "Main Distribution Center",
            location: "Los Angeles, CA",
            status: "Operational",
            staff_count: 25,
            product_count: "8,250",
        },
        {
            title: "East Coast Hub",
            location: "New York, NY",
            status: "Operational",
            staff_count: 18,
            product_count: "5,120",
        },
        {
            title: "Midwest Storage",
            location: "Chicago, IL",
            status: "Under Maintenance",
            staff_count: 8,
            product_count: "2,980",
        },
    ]

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

    return (
        <>
            {cardDetails.map((card) => (
                <div key={card.title} className="flex items-center gap-5 rounded-md border-none bg-zinc-900/60 px-8 py-6">
                    <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold text-white">{card.title}</p>
                        <div className="mt-3 flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className={`gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[card.status]?.badge}`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[card.status]?.dot}`} />
                                {card.status}
                            </Badge>
                            <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                                <Users className="h-4 w-4 text-zinc-500" />
                                <span className="font-medium text-zinc-300">{card.staff_count}</span> Staff
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                                <Package className="h-4 w-4 text-zinc-500" />
                                <span className="font-medium text-zinc-300">{card.product_count}</span> items
                            </span>
                        </div>
                    </div>
                    <Button variant="secondary" size="lg">
                        View Details
                    </Button>
                </div>
            ))}
        </>
    )
}

export default WarehouseCard