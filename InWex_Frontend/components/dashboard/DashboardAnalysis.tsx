"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Package, AlertTriangle, TrendingUp, ArrowDown, RefreshCw, Warehouse } from "lucide-react";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import KPICard from "./Analysis/KPICards";

export default function DashboardAnalysis() {
    const { lowStockItems, mostInStockItems, mostReorderedItems, mostSoldItems, isLoading, fetchLowStock, fetchStockReport } = useDashboard()

    useEffect(() => {
        fetchLowStock(true)
        fetchStockReport(true)
    }, [fetchLowStock, fetchStockReport])

    const topSoldProducts = useMemo(() => {
        return mostSoldItems.map((item) => ({
            product_name: item.product__name,
            total_sold: item.total_sold,
        }))
    }, [mostSoldItems])

    const chartConfig: ChartConfig = {
        total_sold: { label: "Total Sold" }
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="Total Sales" value="1,626" subValue="+12% from last week" icon={<TrendingUp className="text-emerald-500" />} />
                <KPICard title="Critical Low Stock" value={`${lowStockItems.length}`} subValue="Requires attention" icon={<AlertTriangle className="text-amber-500" />} />
                <KPICard title="Top Category" value="Office" subValue="35% of total sales" icon={<Package className="text-blue-500" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-zinc-950 border-zinc-800 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg">Most Sold Products</CardTitle>
                        <CardDescription>Performance based on units sold</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-100 w-full">
                            <BarChart data={topSoldProducts} layout="vertical" margin={{ left: 30 }}>
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="product_name"
                                    type="category"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                                    width={120}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="total_sold" radius={5} barSize={32} fill="#e4e4e7" />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Most In Stock List */}
                <Card className="bg-zinc-950 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Warehouse className="w-4 h-4 text-blue-400" /> Most In Stock
                        </CardTitle>
                        <CardDescription>Products with highest inventory levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mostInStockItems.slice(0, 8).map((item, index) => (
                                <div key={item.product__sku} className="flex items-center gap-3">
                                    <span className="text-xs text-zinc-600 w-4 shrink-0">{index + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">{item.product__name}</p>
                                        <p className="text-xs text-zinc-500">{item.product__sku}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-sm font-bold text-emerald-400">{item.quantity.toLocaleString()}</span>
                                        <p className="text-xs text-zinc-500">units</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <p className="text-center text-zinc-500 text-sm py-4">Loading...</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Most Reordered Table */}
            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-zinc-950 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-violet-400" /> Most Reordered Products
                        </CardTitle>
                        <CardDescription>Products that have been restocked the most</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-zinc-800">
                                    <TableHead className="text-zinc-400">Product</TableHead>
                                    <TableHead className="text-zinc-400">SKU</TableHead>
                                    <TableHead className="text-zinc-400">Reorder Count</TableHead>
                                    <TableHead className="text-zinc-400 text-right">Total Received</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-zinc-500 py-8">Loading...</TableCell>
                                    </TableRow>
                                ) : mostReorderedItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-zinc-500 py-8">No data available</TableCell>
                                    </TableRow>
                                ) : (
                                    mostReorderedItems.map((item) => (
                                        <TableRow key={item.product__sku} className="border-zinc-800 hover:bg-zinc-900/50">
                                            <TableCell className="font-medium text-white">{item.product__name}</TableCell>
                                            <TableCell className="text-zinc-400 font-mono text-xs">{item.product__sku}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                                                    {item.reorder_count}x
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-emerald-400">
                                                {item.total_received.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Low Stock Alerts */}
            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-zinc-950 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ArrowDown className="w-4 h-4 text-red-500" /> Low Stock Alerts
                        </CardTitle>
                        <CardDescription>Items below the reorder threshold</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="border-zinc-800">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="text-zinc-400">Product</TableHead>
                                    <TableHead className="text-zinc-400">Current Stock</TableHead>
                                    <TableHead className="text-zinc-400">Reorder Point</TableHead>
                                    <TableHead className="text-zinc-400 text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-zinc-500 py-8">Loading low stock items...</TableCell>
                                    </TableRow>
                                ) : lowStockItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-zinc-500 py-8">No low stock items</TableCell>
                                    </TableRow>
                                ) : (
                                    lowStockItems.map((item) => (
                                        <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-900/50">
                                            <TableCell className="font-medium text-white">{item.product.name}</TableCell>
                                            <TableCell>
                                                <span className={`font-bold ${item.quantity <= item.reorder_point * 0.25 ? "text-red-500" : "text-amber-500"}`}>
                                                    {item.quantity}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-zinc-400">{item.reorder_point}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer">
                                                    Restock
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}