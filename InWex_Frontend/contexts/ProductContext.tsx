"use client"

import { api } from "@/lib/api"
import { Category, Product } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { ProductValues } from "@/lib/schemas/product/addProduct.schema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type UpdateProductPayload = Omit<Partial<Product>, 'image'> & { image?: File }

type ProductContextType = {
    products: Product[]
    categories: Category[]
    count: number | null
    isLoading: boolean
    error: string | null
    addProduct: (product: ProductValues) => Promise<void>
    updateProduct: (productId: number, updatedProduct: UpdateProductPayload) => Promise<void>
    deleteProduct: (productId: number) => Promise<void>
    selectedProduct: Product | null
    setSelectedProduct: (p: Product | null) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [count, setCount] = useState<number | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user, isLoading: authLoading } = useAuth()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const router = useRouter()

    const fetchProducts = async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get('/products/get-products')
            setProducts(res.data.results)
            setCount(res.data.count)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }

    const fetchCategory = async () => {
        try {
            const res = await api.get('/products/get-categories')
            setCategories(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
    }

    useEffect(() => {
        if (authLoading) return
        if (user) {
            fetchProducts(true)
            fetchCategory()

            const interval = setInterval(() => {
                fetchProducts(false)
                fetchCategory()
            }, 50 * 60 * 1000)

            return () => clearInterval(interval)
        }
        else {
            setProducts([])
            setError(null)
        }
    }, [user, authLoading])

    const addProduct: ProductContextType['addProduct'] = async (product) => {
        try {
            const formData = new FormData()
            Object.entries(product).forEach(([key, value]) => {
                if (value !== undefined) formData.append(key, value as string | Blob)
            })

            const res = await api.post("/products/add-products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            toast.success("Product added successfully")
            setProducts(prev => [...prev, res.data])
            setCount(res.data.count)
            router.push("/dashboard/inventory/")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add product")
        }
    }

    const updateProduct: ProductContextType['updateProduct'] = async (productId, updatedProduct) => {
        try {
            const formData = new FormData()
            Object.entries(updatedProduct).forEach(([key, value]) => {
                if (value !== undefined) formData.append(key, value as string | Blob)
            })

            const res = await api.put(`/products/add-products/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, ...updatedProduct, image: p.image } as Product : p
            ))
            setCount(res.data.count)
            toast.success("Product updated successfully")
            router.push("/dashboard/inventory/")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update product")
        }
    }

    const deleteProduct: ProductContextType['deleteProduct'] = async (productId) => {
        try {
            const res = await api.delete(`/products/add-products/${productId}`)
            setProducts(prev => prev.filter(p => p.id !== productId))
            setCount(res.data.count)
            toast.success("Product deleted successfully")
            router.push("/dashboard/inventory/")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete product")
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                count,
                categories,
                isLoading,
                error,
                addProduct,
                updateProduct,
                deleteProduct,
                selectedProduct,
                setSelectedProduct
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