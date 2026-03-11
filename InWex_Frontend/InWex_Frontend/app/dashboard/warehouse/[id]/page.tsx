"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import WarehousePage from "@/components/dashboard/warehouses/warehouse/WarehousePage"
import { Card, CardContent } from "@/components/ui/card"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { Loader2, Package } from "lucide-react"
import { use, useEffect } from "react"

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = use(params)

    const { warehouses, isLoading, fetchWarehouses } = useWarehouse()
    const warehouse = warehouses.find(w => w.id === Number(id))

    useEffect(() => {
        if (warehouses.length == 0 && !isLoading) fetchWarehouses(true)
    }, [warehouses, isLoading, fetchWarehouses])

    if (isLoading && warehouses.length === 0) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-800 rounded-full p-3">
                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg">Loading Warehouse</p>
                        <p className="text-zinc-500 text-sm">Please wait a moment...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (!warehouse) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-800 rounded-full p-3">
                        <Package className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg">Warehouse Not Found</p>
                        <p className="text-zinc-500 text-sm">This product may have been deleted or doesn&#39;t exist.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <>
            <Navbar />
            <WarehousePage warehouse={warehouse} />
        </>
    )
}

export default Page