"use client"

import Navbar from "@/components/dashboard/navbar/Navbar"
import StaffPage from "@/components/dashboard/staff/StaffPage"
import { Card, CardContent } from "@/components/ui/card"
import { useStaff } from "@/contexts/StaffContext"
import { Loader2, UserRound } from "lucide-react"
import { use, useEffect } from "react"

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)

    const { staffs, isLoading, fetchStaff } = useStaff()
    const staff = staffs.find(s => s.id === Number(id))

    // const { warehouses } = useWarehouse()
    // const warehouseName = warehouses.find(w => w.id === staff.warehouse)?.name

    useEffect(() => {
        if (staffs.length === 0) fetchStaff(true)
    }, [staffs.length, fetchStaff])

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none shadow-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-900 rounded-full p-4 border border-zinc-800">
                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg tracking-tight">Syncing Profile</p>
                        <p className="text-zinc-500 text-sm">Accessing staff directory...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (!staff) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none shadow-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-900 rounded-full p-4 border border-zinc-800">
                        <UserRound className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg tracking-tight">Staff Not Found</p>
                        <p className="text-zinc-500 text-sm">This profile may have been removed or the ID is incorrect.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <>
            <Navbar />
            <StaffPage staff={staff} />
        </>
    )
}

export default Page