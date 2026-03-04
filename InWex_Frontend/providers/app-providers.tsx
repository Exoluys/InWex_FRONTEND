"use client"

import { AuthProvider } from "@/contexts/AuthContext"
import { ProductProvider } from "@/contexts/ProductContext"
import { StaffProvider } from "@/contexts/StaffContext"
import { WarehouseProvider } from "@/contexts/WarehouseContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProductProvider>
                <WarehouseProvider>
                    <StaffProvider>
                        {children}
                    </StaffProvider>
                </WarehouseProvider>
            </ProductProvider>
        </AuthProvider >
    )
}