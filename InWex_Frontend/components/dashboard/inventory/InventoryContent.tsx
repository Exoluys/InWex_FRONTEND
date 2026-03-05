import { ProductCard } from "@/components/dashboard/inventory/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter";
import { useProduct } from "@/contexts/ProductContext";
import { AlertTriangle, ChevronDown, Package, Plus } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductCardShimmer } from "./ProductCardShimmer";

const InventoryContent = () => {
    const [selected, setSelected] = useState("Product")
    const { products, count, isLoading, error, fetchProducts, fetchCategory, goToPage, goToNextPage, goToPrevPage, hasNext, hasPrev, total_pages, current_page } = useProduct()
    const router = useRouter()

    const options = [
        "Product",
        "Warehouse",
        "Price: High To Low",
        "Price: Low to High",
    ]

    const pages = Array.from({ length: total_pages }, (_, i) => i + 1)

    useEffect(() => {
        fetchProducts(true)
        fetchCategory()
    }, [fetchProducts, fetchCategory])

    return (
        <main className="mt-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-semibold">Product List</h1>
                    <p>{count} Total Items</p>
                </div>
                <div>
                    <Button
                        onClick={() => router.push("/dashboard/inventory/products/new")}
                        variant="secondary"
                        className="p-5! pr-6! cursor-pointer"
                    >
                        <Plus />
                        Add New Product
                    </Button>
                </div>
            </div>
            <div className="my-10 flex justify-between items-center">
                <SearchbarWithFilter
                    filters={[
                        { label: "Product Code", value: "code" },
                        { label: "Product Name", value: "name" },
                        { label: "Price", value: "price" }
                    ]}
                    onFilterSelect={(value) => console.log("Products filter:", value)}
                />

                <div className="flex space-x-2 items-center">
                    <div className="flex space-x-4 items-center">
                        <p>Grouped By :</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" className="p-5! cursor-pointer">
                                    {selected}
                                    <ChevronDown className="h-4 w-4 opacity-70" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" align="end" sideOffset={8} className="px-4 py-3 rounded-lg bg-zinc-900 text-white border-none">
                                {options.map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setSelected(option)}
                                        className="cursor-pointer focus:bg-zinc-800"
                                    >
                                        {option}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductCardShimmer key={index} />
                    ))}
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center py-24">
                    <Card className="bg-transparent w-full max-w-sm border-none">
                        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                            <div className="bg-red-500/20 rounded-full p-3">
                                <AlertTriangle className="h-6 w-6 text-red-400" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-red-400 font-semibold text-lg">Something went wrong</p>
                                <p className="text-red-400/70 text-sm">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {!isLoading && !error && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col justify-center items-center py-24 gap-3">
                                <div className="bg-zinc-800 rounded-full p-4">
                                    <Package className="h-6 w-6 text-zinc-400" />
                                </div>
                                <p className="text-zinc-300 font-semibold text-lg">No products found</p>
                                <p className="text-zinc-500 text-sm">Try adjusting your filters or add a new product.</p>
                            </div>
                        )}
                    </div>

                    <div className="h-20 flex justify-center items-center">
                        <Pagination>
                            <PaginationContent>

                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={goToPrevPage}
                                        className={!hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {pages.map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            className="cursor-pointer"
                                            onClick={() => goToPage(page)}
                                            isActive={current_page === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={goToNextPage}
                                        className={!hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
        </main>
    )
}

export default InventoryContent