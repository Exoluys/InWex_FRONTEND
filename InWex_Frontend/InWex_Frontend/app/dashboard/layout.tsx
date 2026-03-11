"use client"

import AppSidebar from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { role, isLoading } = useAuth()

    if (isLoading) return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-32 rounded-md" />
            </div>
        </div>
    )
    if (!role) return null

    const currentRole = role.business ? 'business' : role.manager ? 'manager' : 'staff'

    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <AppSidebar role={currentRole} />

                <div className="flex flex-col w-full overflow-hidden">
                    <main className="flex-1 px-20 pt-10 pb-4 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout
