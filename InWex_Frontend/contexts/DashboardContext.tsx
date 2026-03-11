import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { api } from "@/lib/api"
import { LowStockItem, MostInStockItem, MostReorderedItem, MostSoldItem, StockReportResponse } from "@/lib/types/AnalysisTypes"

export type DashboardContextType = {
    lowStockItems: LowStockItem[]
    mostInStockItems: MostInStockItem[]
    mostReorderedItems: MostReorderedItem[]
    mostSoldItems: MostSoldItem[]
    isLoading: boolean
    error: string | null
    fetchLowStock: (showLoading?: boolean) => Promise<void>
    fetchStockReport: (showLoading?: boolean) => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([])
    const [mostInStockItems, setMostInStockItems] = useState<MostInStockItem[]>([])
    const [mostReorderedItems, setMostReorderedItems] = useState<MostReorderedItem[]>([])
    const [mostSoldItems, setMostSoldItems] = useState<MostSoldItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    const fetchLowStock = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)

        try {
            const res = await api.get<LowStockItem[]>("/products/stock-data/low")
            setLowStockItems(res.data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchStockReport = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)

        try {
            const res = await api.get<StockReportResponse>("/products/stock-data/report")
            setMostInStockItems(res.data.most_in_stock)
            setMostReorderedItems(res.data.most_reordered)
            setMostSoldItems(res.data.most_sold)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setLowStockItems([])
            setMostInStockItems([])
            setMostReorderedItems([])
            setMostSoldItems([])
            setError(null)
        }
    }, [user])

    return (
        <DashboardContext.Provider
            value={{
                lowStockItems,
                mostInStockItems,
                mostReorderedItems,
                mostSoldItems,
                isLoading,
                error,
                fetchLowStock,
                fetchStockReport
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (!context) throw new Error("useDashboard must be used within DashboardProvider")
    return context
}