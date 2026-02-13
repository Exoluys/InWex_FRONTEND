"use client"

import { api } from "@/lib/api"
import { Product } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

type ProductContextType = {
    products: Product[]
    isLoading: boolean
    error: string | null
    // addProduct: (product: Product) => void
    // updateProduct: (productId: string, updatedProduct: Partial<Product>) => void
    // deleteProduct: (productId: string) => void
    refreshProducts: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user, isLoading: authLoading } = useAuth()

    const fetchProducts = async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error("No authentication token found")

            const res = await api.get('/products/get-products')
            setProducts(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }

    useEffect(() => {
        if (authLoading) return
        if (user) {
            fetchProducts(true)

            const interval = setInterval(() => {
                fetchProducts(false)
            }, 50 * 60 * 1000)

            return () => clearInterval(interval)
        }
        else {
            setProducts([])
            setError(null)
        }
    }, [user, authLoading])

    return (
        <ProductContext.Provider
            value={{
                products,
                isLoading,
                error,
                // addProduct,
                // updateProduct,
                // deleteProduct,
                refreshProducts: fetchProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext)
    if (!context) throw new Error("useProducts must be used within ProductProvider")
    return context
}