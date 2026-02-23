"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { AlertTriangle, Loader2, Plus, Warehouse } from "lucide-react"
import WarehouseCard from "./WarehouseCard"
import { useRouter } from "next/navigation"

const WarehouseContent = () => {
    const { warehouses, count, isLoading, error } = useWarehouse()
    const router = useRouter()

    return (
        <main className="mt-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-semibold">Warehouse List</h1>
                    <p>{count ?? 0} Total Warehouses</p>
                </div>
            </div>
            <div className="flex justify-between items-center my-10">
                <SearchbarWithFilter
                    filters={[
                        { label: "Warehouse Name", value: "name" },
                    ]}
                    onFilterSelect={(value) => console.log("Warehouse filter:", value)}
                />
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.push("/dashboard/warehouse/new")}
                        variant="secondary"
                        className="p-5! pr-6! cursor-pointer"
                    >
                        <Plus />
                        Add New Warehouse
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-24">
                    <Card className="bg-transparent w-full max-w-sm border-none">
                        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                            <div className="bg-zinc-800 rounded-full p-3">
                                <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-300 font-semibold text-lg">Loading Warehouses</p>
                                <p className="text-zinc-500 text-sm">Please wait a moment...</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center py-24">
                    <Card className="bg-transparent w-full max-w-sm border-none">
                        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                            <div className="bg-red-500/20 rounded-full p-3">
                                <AlertTriangle className="h-6 w-6 text-red-400" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-red-400 font-semibold text-lg">Something went wrong</p>
                                <p className="text-red-400/70 text-sm">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {!isLoading && !error && (
                <div className="flex flex-col mx-auto gap-3">
                    {warehouses.length > 0 ? (
                        warehouses.map((warehouse) => (
                            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
                        ))
                    ) : (
                        <div className="flex justify-center items-center py-24">
                            <Card className="bg-transparent w-full max-w-sm border-none">
                                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                                    <div className="bg-zinc-800 rounded-full p-3">
                                        <Warehouse className="h-6 w-6 text-zinc-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-zinc-300 font-semibold text-lg">No Warehouses Found</p>
                                        <p className="text-zinc-500 text-sm">Add a warehouse to get started.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default WarehouseContent