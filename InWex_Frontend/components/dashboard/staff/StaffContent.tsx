"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SearchbarWithFilter from "@/components/ui/SearchbarWithFilter"
import { useStaff } from "@/contexts/StaffContext"
import { AlertTriangle, Loader2, Phone, Plus, UserRound, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const dummyStaff = [
    { id: 1, name: "David Johnson", role: "Warehouse Manager", warehouse: "Main Distribution Center", phone: "+1 213-555-0171", status: "Active" },
    { id: 2, name: "Sarah Miller", role: "Inventory Supervisor", warehouse: "East Coast Hub", phone: "+1 212-555-0215", status: "Active" },
    { id: 3, name: "James Smith", role: "Logistics Coordinator", warehouse: "Midwest Storage", phone: "+1 312-555-0198", status: "On Leave" },
    { id: 4, name: "Michael Lee", role: "Forklift Operator", warehouse: "Main Distribution Center", phone: "+1 213-555-0182", status: "On Leave" },
    { id: 5, name: "Jessica Williams", role: "Shipping Clerk", warehouse: "East Coast Hub", phone: "+1 212-555-0127", status: "Active" },
    { id: 6, name: "Robert Johnson", role: "Warehouse Associate", warehouse: "Midwest Storage", phone: "+1 312-555-0145", status: "Active" },
]

const statusStyles: Record<string, string> = {
    "Active": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "On Leave": "bg-amber-500/15 text-amber-400 border-amber-500/20",
}

const isLoading = false
const error = null

const StaffContent = () => {
    const router = useRouter()
    const { staffs, fetchStaff } = useStaff()

    useEffect(() => {
        fetchStaff(true)
    }, [fetchStaff])


    return (
        <main className="mt-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-semibold">Staff List</h1>
                    <p> Total Staff</p>
                </div>
            </div>
            <div className="flex justify-between items-center my-10">
                <SearchbarWithFilter
                    filters={[
                        { label: "All warehouses", value: "allWarehouses" },
                        { label: "Mumbai", value: "mumbai" },
                    ]}
                    onFilterSelect={(value) => console.log("Warehouse filter:", value)}
                />
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.push("/dashboard/staff/new")}
                        variant="secondary"
                        className="p-5! pr-6! cursor-pointer"
                    >
                        <Plus />
                        Add New Staff
                    </Button>
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
                                <p className="text-zinc-300 font-semibold text-lg">Loading Staff</p>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {dummyStaff.length > 0 ? (
                        dummyStaff.map((staff) => (
                            <div key={staff.id} className="flex items-center gap-4 bg-zinc-900/60 rounded-xl p-4 relative">
                                <div className="w-16 h-16 rounded-full bg-zinc-700 shrink-0 flex items-center justify-center">
                                    <UserRound className="h-8 w-8 text-zinc-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white">{staff.name}</p>
                                    <p className="text-sm text-zinc-400">{staff.role}</p>
                                    <p className="text-sm text-zinc-400">{staff.warehouse}</p>
                                    <div className="flex items-center gap-1 mt-1 text-sm text-zinc-400">
                                        <Phone className="h-3 w-3" />
                                        {staff.phone}
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${statusStyles[staff.status]}`}
                                >
                                    {staff.status}
                                </Badge>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center py-24">
                            <Card className="bg-transparent w-full max-w-sm border-none">
                                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                                    <div className="bg-zinc-800 rounded-full p-3">
                                        <Users className="h-6 w-6 text-zinc-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-zinc-300 font-semibold text-lg">No Staff Found</p>
                                        <p className="text-zinc-500 text-sm">Add staff members to get started.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}

export default StaffContent