import { Warehouse } from "@/lib/types/types"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Calendar, Layers, Loader2, Package, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const dummySections = [
    { id: 1, name: "Refrigerated" },
    { id: 2, name: "Dry Goods" },
    { id: 3, name: "Electronics" },
]

const dummyStaff = [
    { id: 1, name: "John Doe", role: "Manager" },
    { id: 2, name: "Jane Smith", role: "Staff" },
    { id: 3, name: "Bob Johnson", role: "Staff" },
]

const WarehousePage = ({ warehouse }: { warehouse: Warehouse }) => {
    const { products, isLoading, error, fetchProducts, deleteWarehouse } = useWarehouse()
    const router = useRouter()

    useEffect(() => {
        fetchProducts(warehouse.id, true);
    }, [fetchProducts, warehouse.id])

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <Card className="bg-transparent border-none">
                <CardContent className="p-6 space-y-6">

                    {/* Top Section */}
                    <div className="space-y-2">
                        <Badge variant="secondary" className="w-fit">Warehouse</Badge>
                        <h1 className="text-3xl font-semibold tracking-tight">{warehouse.name}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                Created: {new Date(warehouse.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Layers size={12} /> {dummySections.length} Sections
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                                <Users size={12} /> {dummyStaff.length} Staff
                            </Badge>
                        </div>
                    </div>

                    <Separator />

                    {isLoading && (
                        <div className="flex justify-center items-center py-24">
                            <Card className="bg-transparent w-full max-w-sm border-none">
                                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                                    <div className="bg-zinc-800 rounded-full p-3">
                                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-zinc-300 font-semibold text-lg">Loading Warehouse Details</p>
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
                        <>
                            {/* Sections */}
                            < div >
                                <h2 className="text-lg font-semibold mb-4">Sections</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dummySections.map((section) => (
                                        <Card key={section.id} className="p-4 bg-zinc-900 border-zinc-800">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Section</p>
                                            <p className="text-lg font-semibold mt-1">{section.name}</p>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Staff */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Staff</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dummyStaff.map((staff) => (
                                        <Card key={staff.id} className="p-4 bg-zinc-900 border-zinc-800">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">{staff.role}</p>
                                            <p className="text-lg font-semibold mt-1">{staff.name}</p>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Products */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">Products</h2>
                                <div className="flex flex-col divide-y divide-zinc-800 rounded-lg border border-zinc-800 overflow-hidden">
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <div key={product.id} className="flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Package size={16} className="text-zinc-500" />
                                                    <span className="text-sm font-medium text-zinc-200">{product.name}</span>
                                                </div>
                                                <span className="text-sm text-zinc-400">
                                                    <span className="font-medium text-zinc-300">{product.stock ?? 1}</span> units
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-4 text-center text-zinc-500 text-sm">
                                            No products assigned to this warehouse.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Actions */}
                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={() => deleteWarehouse(warehouse.id)}
                                    variant="destructive"
                                >
                                    Delete
                                </Button>
                                <Button
                                    onClick={() => router.push(`/dashboard/warehouse/update/${warehouse.id}`)}
                                >
                                    Update
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div >
    )
}

export default WarehousePage