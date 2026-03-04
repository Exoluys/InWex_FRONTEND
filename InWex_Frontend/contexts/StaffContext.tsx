import { api } from "@/lib/api"
import { Staff } from "@/lib/types"
import { createContext, useCallback, useContext, useState } from "react"

export type StaffContextType = {
    staffs: Staff[]
    isLoading: boolean
    error: string | null
    fetchStaff: (showLoading?: boolean) => void
}


export const StaffContext = createContext<StaffContextType | undefined>(undefined)

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
    const [staffs, setStaffs] = useState<Staff[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchStaff = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)

        try {
            const res = await api.get('api/warehouse/get-staff')
            setStaffs(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    return (
        <StaffContext.Provider
            value={{
                staffs,
                isLoading,
                error,
                fetchStaff
            }}
        >
            {children}
        </StaffContext.Provider>
    )
}

export const useStaff = () => {
    const context = useContext(StaffContext)
    if (!context) throw new Error("useStaff must be used within StaffProvider")
    return context
}