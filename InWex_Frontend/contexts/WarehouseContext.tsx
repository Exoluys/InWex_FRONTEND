"use client"

import { WarehouseValues } from "@/lib/schemas/warehouse/addWarehouse.schema"
import { Section, Warehouse } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"

export type WarehouseContextType = {
    warehouses: Warehouse[]
    sections: Section[]
    count: number | null
    isLoading: boolean
    error: string | null
    addWarehouse: (data: WarehouseValues) => Promise<void>
    updateWarehouse: (id: number, data: Partial<Warehouse>) => Promise<void>
    deleteWarehouse: (id: number) => Promise<void>
    selectedWarehouse: Warehouse | null
    setSelectedWarehouse: (w: Warehouse | null) => void
    fetchSection: (warehouseId: number) => Promise<void>
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined)

export const WarehouseProvider = ({ children }: { children: React.ReactNode }) => {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [sections, setSections] = useState<Section[]>([])
    const [count, setCount] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
    const { user, isLoading: authLoading } = useAuth()
    const router = useRouter()

    const fetchWarehouses = async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get("/warehouse/warehouse")
            setWarehouses(res.data.results)
            setCount(res.data.count)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }

    const fetchSections = async (warehouseId: number) => {
        try {
            const res = await api.get(`/warehouse/sections?warehouse=${warehouseId}`)
            setSections(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
    }

    const addWarehouse: WarehouseContextType['addWarehouse'] = async (warehouse) => {
        try {
            const res = await api.post("/warehouse/warehouse", warehouse)
            setWarehouses((prev) => [...prev, res.data])
            setCount(res.data.count)
            toast.success("Warehouse added successfully")
            router.push("/dashboard/warehouses")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add warehouse")
        }
    }

    const updateWarehouse: WarehouseContextType['updateWarehouse'] = async (warehouseId, updatedWarehouse) => {
        try {
            const res = await api.put(`/warehouse/warehouse/${warehouseId}`, updatedWarehouse)
            setWarehouses((prev) => prev.map(w => w.id === warehouseId ? { ...w, ...updatedWarehouse } : w))
            setCount(res.data.count)
            toast.success("Warehouse updated successfully")
            router.push("/dashboard/warehouses")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update warehouse")
        }
    }

    const deleteWarehouse: WarehouseContextType['deleteWarehouse'] = async (warehouseId) => {
        try {
            const res = await api.delete(`/warehouse/warehouse/${warehouseId}`)
            setWarehouses((prev) => prev.filter(w => w.id !== warehouseId))
            setCount(res.data.count)
            toast.success("Warehouse deleted successfully")
            router.push("/dashboard/warehouses")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete warehouse")
        }
    }

    useEffect(() => {
        if (authLoading) return
        if (user) {
            fetchWarehouses(true)

            const interval = setInterval(() => {
                fetchWarehouses(false)
            }, 50 * 60 * 1000)

            return () => clearInterval(interval)
        }
        else {
            setWarehouses([])
            setSections([])
            setError(null)
        }
    }, [user, authLoading])

    return (
        <WarehouseContext.Provider
            value={{
                warehouses,
                sections,
                count,
                isLoading,
                error,
                addWarehouse,
                updateWarehouse,
                deleteWarehouse,
                selectedWarehouse,
                setSelectedWarehouse,
                fetchSection: fetchSections
            }}
        >
            {children}
        </WarehouseContext.Provider>
    )
}

export const useWarehouse = () => {
    const context = useContext(WarehouseContext)
    if (!context) throw new Error("useWarehouse must be used within WarehouseProvider")
    return context
}
