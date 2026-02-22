"use client"

import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Plus } from "lucide-react"
import WarehouseCard from "./WarehouseCard"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"

const WarehouseContent = () => {
    return (
        <main className="py-8">
            <div className="flex justify-between items-center">
                <SearchbarWithFilter
                    filters={[
                        { label: "Product Code", value: "code" },
                        { label: "Product Name", value: "name" },
                        { label: "Price", value: "price" }
                    ]}
                    onFilterSelect={(value) => console.log("Products filter:", value)}
                />
                <div className="mb-4 flex justify-end">
                    <Button
                        variant="secondary"
                        className="p-5! pr-6! cursor-pointer"
                    >
                        <Plus />
                        Add New Warehouse
                    </Button>
                </div>
            </div>
            <div className="mb-4 flex gap-3">

                <Select defaultValue="all">
                    <SelectTrigger className="w-44 border-zinc-800 bg-zinc-900 text-zinc-300">
                        <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-900 text-zinc-200">
                        <SelectItem value="all" className="focus:bg-zinc-800 focus:text-white">All locations</SelectItem>
                        <SelectItem value="la" className="focus:bg-zinc-800 focus:text-white">Los Angeles, CA</SelectItem>
                        <SelectItem value="ny" className="focus:bg-zinc-800 focus:text-white">New York, NY</SelectItem>
                        <SelectItem value="chi" className="focus:bg-zinc-800 focus:text-white">Chicago, IL</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col mx-auto gap-3">
                <WarehouseCard />
            </div>
        </main >
    )
}

export default WarehouseContent