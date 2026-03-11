"use client"

import { Button } from "@/components/ui/button"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { Loader2, Plus, Warehouse, ChevronRight, WarehouseIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

const WarehouseContent = () => {
    const router = useRouter()
    const { warehouses, isLoading, error, count, fetchWarehouses, fetchWarehouseBySearch } = useWarehouse()

    useEffect(() => {
        fetchWarehouses(true)
    }, [fetchWarehouses])

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value.trim()) {
            fetchWarehouses(true)
            return
        }
        fetchWarehouseBySearch(value)
    }, 300)

    return (
        <main className="mt-12 w-full px-4 md:px-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-white">Warehouse List</h1>
                <p className="text-zinc-500 mt-1 flex items-center gap-2">
                    <Warehouse className="h-4 w-4" />
                    {count ?? 0} Total Warehouses
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                <div className="flex-1 w-full">
                    <SearchbarWithFilter
                        filters={[
                            { label: "Warehouse Name", value: "name" },
                        ]}
                        onFilterSelect={(value) => console.log("Warehouse filter:", value)}
                        onSearch={handleSearch}
                    />
                </div>

                <Button
                    onClick={() => router.push("/dashboard/warehouse/new")}
                    className="w-full md:w-auto bg-white hover:bg-zinc-200 text-black font-medium px-12 py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="mr-2 h-5 w-5 stroke-3" />
                    Add New Warehouse
                </Button>
            </div>

            {isLoading && (
                <div className="flex flex-col justify-center items-center py-32 gap-4">
                    <Loader2 className="h-10 w-10 text-zinc-600 animate-spin" />
                    <p className="text-zinc-500 animate-pulse">Syncing warehouse directory...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-6">
                    {warehouses.length > 0 ? (
                        warehouses.map((warehouse) => (
                            <div
                                key={warehouse.id}
                                className="flex items-center gap-4 bg-zinc-900/40 border-none rounded-2xl p-6 hover:bg-zinc-900/80 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-full bg-zinc-800/50 shrink-0 flex items-center justify-center">
                                    <WarehouseIcon className="h-6 w-6 text-zinc-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-zinc-100 text-lg truncate leading-none">
                                            {warehouse.name}
                                        </p>

                                        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-fit">
                                            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                            Operational
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => router.push(`/dashboard/warehouse/${warehouse.id}`)}
                                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 border-none rounded-xl px-5 py-6"
                                >
                                    Details
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-800 rounded-3xl">
                            <Warehouse className="h-12 w-12 text-zinc-700 mb-4" />
                            <p className="text-zinc-400 text-lg font-medium">Your warehouse list is empty</p>
                            <p className="text-zinc-600 text-sm">Click &#34;Add New Warehouse&#34; to register a location.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default WarehouseContent