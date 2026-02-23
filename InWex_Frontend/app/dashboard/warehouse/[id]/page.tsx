"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import WarehousePage from "@/components/dashboard/warehouses/warehouse/WarehousePage"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { use } from "react"

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = use(params)

    const { warehouses, isLoading } = useWarehouse()
    const warehouse = warehouses.find(w => w.id === Number(id))

    if (isLoading) return <div>Loading...</div>
    if (!warehouse) return <div>Warehouse not found</div>

    return (
        <>
            <Navbar />
            <WarehousePage warehouse={warehouse} />
        </>
    )
}

export default Page