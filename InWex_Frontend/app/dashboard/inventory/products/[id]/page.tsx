"use client"

import ProductPage from "@/components/dashboard/inventory/products/ProductPage"
import Navbar from "@/components/dashboard/Navbar"
import { useProduct } from "@/contexts/ProductContext"
import { use } from "react"

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = use(params)

    const { products, categories, isLoading } = useProduct()
    const product = products.find(p => p.id === Number(id))
    const category = categories.find(c => c.id === Number(product?.category))

    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>
    if (!category) return <div>Category not found</div>

    return (
        <>
            <Navbar />
            <ProductPage product={product} category={category} />
        </>
    )
}

export default Page