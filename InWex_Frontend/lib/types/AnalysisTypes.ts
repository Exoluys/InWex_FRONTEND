import { Product, Stock } from "./types"

export type KPICardProps = {
    title: string
    value: string
    subValue: string
    icon: React.ReactNode
}

export type LowStockItem = {
    id: Stock
    quantity: Stock
    reorder_point: number
    reorder_quantity: number
    last_updated: string
    product: Product
}

export type StockReportResponse = {
    most_sold: MostSoldItem[]
    most_in_stock: MostInStockItem[]
    most_reordered: MostReorderedItem[]
}

export type MostInStockItem = {
    id: number
    product__name: string
    product__sku: string
    quantity: number
}

export type MostReorderedItem = {
    id: number
    product__name: string
    product__sku: string
    reorder_count: number
    total_received: number
}

export type MostSoldItem = {
    id: number
    product__name: string
    product__sku: string
    total_sold: number
}