"use client"

import { AuthProvider } from "@/contexts/AuthContext"
import { ProductProvider } from "@/contexts/ProductContext"
import { WarehouseProvider } from "@/contexts/WarehouseContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProductProvider>
                <WarehouseProvider>
                    {children}
                </WarehouseProvider>
            </ProductProvider>
        </AuthProvider >
    )
}