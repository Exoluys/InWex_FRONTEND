import { ProductCard } from "@/components/dashboard/inventory/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter";
import { useProduct } from "@/contexts/ProductContext";
import { AlertTriangle, ChevronDown, Ellipsis, Loader2, Menu, Package, Plus } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

const InventoryContent = () => {
    const [selected, setSelected] = useState("Product")
    const { products, isLoading, error } = useProduct()
    const router = useRouter()

    const options = [
        "Product",
        "Warehouse",
        "Price: High To Low",
        "Price: Low to High",
    ]

    return (
        <main className="mt-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-semibold">Product List</h1>
                    <p>123 Total Items</p>
                </div>
                <div>
                    <Button
                        onClick={() => router.push("/dashboard/inventory/products/new-product")}
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

                <div className="flex space-x-8 items-center">
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
                    <div className="space-x-2 items-center">
                        <Button variant="secondary" size="icon-lg" className="cursor-pointer">
                            <Ellipsis className="h-5! w-5!" />
                        </Button>
                        <Button variant="secondary" size="icon-lg" className="cursor-pointer">
                            <Menu className="h-4.5! w-4.5!" />
                        </Button>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="flex justify-center items-center py-24">
                    <Card className="bg-transparent w-full max-w-sm border-none">
                        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                            <div className="bg-zinc-800 rounded-full p-3">
                                <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-300 font-semibold text-lg">Loading Products</p>
                                <p className="text-zinc-500 text-sm">Please wait a moment...</p>
                            </div>
                        </CardContent>
                    </Card>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center py-24">
                            <Card className="bg-transparent w-full max-w-sm border-none">
                                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                                    <div className="bg-zinc-800 rounded-full p-3">
                                        <Package className="h-6 w-6 text-zinc-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-zinc-300 font-semibold text-lg">No Products Found</p>
                                        <p className="text-zinc-500 text-sm">Try adjusting your search or filters.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </main >
    )
}

export default InventoryContent