"use client"

import { AuthProvider } from "@/contexts/AuthContext"
import { DashboardProvider } from "@/contexts/DashboardContext"
import { ProductProvider } from "@/contexts/ProductContext"
import { StaffProvider } from "@/contexts/StaffContext"
import { WarehouseProvider } from "@/contexts/WarehouseContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProductProvider>
                <DashboardProvider>
                    <WarehouseProvider>
                        <StaffProvider>
                            {children}
                        </StaffProvider>
                    </WarehouseProvider>
                </DashboardProvider>
            </ProductProvider>
        </AuthProvider >
    )
}