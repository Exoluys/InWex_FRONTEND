"use client"

import { useAuth } from "@/contexts/AuthContext"
import ManagerDashboard from "./(role)/(manager)/ManagerDashboard"
import StaffDashboard from "./(role)/(staff)/StaffDashboard"
import OrgDashboard from "./(role)/(org)/OrgDashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const DashboardPage = () => {
    const { role, isLoading } = useAuth()

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-800 rounded-full p-3">
                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg">Loading Dashboard</p>
                        <p className="text-zinc-500 text-sm">Please wait a moment...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (!role) return null
    if (role.manager) return <ManagerDashboard />
    if (role.warehouse_staff) return <StaffDashboard />
    if (role.business) return <OrgDashboard />

    return <div>No authorized role found</div>
}

export default DashboardPage