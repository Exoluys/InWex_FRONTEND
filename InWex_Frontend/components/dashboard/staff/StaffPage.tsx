"use client"

import { useState } from "react"
import { Staff } from "@/lib/types/types"
import {
    ArrowLeft,
    ShieldCheck,
    UserRound,
    BadgeCheck,
    MapPin,
    Mail,
    Phone,
    UserPlus,
    Activity,
    Settings2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const RoleBadge = ({ label, active }: { label: string; active: boolean }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${active
        ? "bg-emerald-500/10 text-emerald-500"
        : "bg-zinc-900/30 text-zinc-600"
        }`}>
        <span className="text-sm font-semibold tracking-tight">{label}</span>
        {active ? (
            <BadgeCheck className="h-5 w-5 text-emerald-500" />
        ) : (
            <div className="h-5 w-5 rounded-full border-2 border-zinc-800" />
        )}
    </div>
)

const StaffPage = ({ staff }: { staff: Staff }) => {
    const router = useRouter()

    const [roles, setRoles] = useState({
        is_warehouse_staff: staff.user.is_warehouse_staff,
        is_manager: staff.user.is_manager,
    })

    const handleUpdateRoles = async () => {
        console.log("updating")
    }

    return (
        <div className="mt-8 md:mt-12 w-full px-4 sm:px-6 md:px-10 pb-20 space-y-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Directory
                </Button>

                <div className="flex items-center gap-3">
                    <Badge className={`${staff.is_confirmed ? "bg-blue-500/10 text-blue-400" : "bg-orange-500/10 text-orange-400"} border-none px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider`}>
                        {staff.is_confirmed ? "Verified Member" : "Verification Pending"}
                    </Badge>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="sm" className="bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-bold gap-2">
                                <Settings2 size={16} />
                                Manage Access
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-zinc-950 border-none text-white sm:max-w-md px-2">
                            <SheetHeader className="space-y-4">
                                <SheetTitle className="text-2xl font-bold text-white">Edit Staff Roles</SheetTitle>
                                <SheetDescription className="text-zinc-500">
                                    Modify permissions for {staff.user.fullname}. Changes take effect immediately.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="py-10 px-5 space-y-8">
                                <div className="flex items-center justify-between space-x-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <div className="space-y-1">
                                        <Label className="text-base font-semibold">Warehouse Staff</Label>
                                        <p className="text-xs text-zinc-500">Can view inventory and process orders</p>
                                    </div>
                                    <Switch
                                        checked={roles.is_warehouse_staff}
                                        onCheckedChange={(val) => setRoles(prev => ({ ...prev, is_warehouse_staff: val }))}
                                    />
                                </div>

                                <div className="flex items-center justify-between space-x-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <div className="space-y-1">
                                        <Label className="text-base font-semibold">Inventory Manager</Label>
                                        <p className="text-xs text-zinc-500">Full access to warehouse and staff settings</p>
                                    </div>
                                    <Switch
                                        checked={roles.is_manager}
                                        onCheckedChange={(val) => setRoles(prev => ({ ...prev, is_manager: val }))}
                                    />
                                </div>
                            </div>

                            <SheetFooter>
                                <Button
                                    onClick={handleUpdateRoles}
                                    className="mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-xl"
                                >
                                    Save Changes
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* Profile Card... (Same as before) */}
                <Card className="lg:col-span-1 bg-zinc-950 border-none rounded-[2.5rem] overflow-hidden flex flex-col pb-0 h-full shadow-2xl">
                    <div className="aspect-square bg-zinc-900/20 flex items-center justify-center p-10 shrink-0 relative">
                        <div className="w-32 h-32 rounded-full bg-zinc-900 flex items-center justify-center border-4 border-zinc-950 shadow-xl relative overflow-hidden">
                            <UserRound size={60} className="text-zinc-700" />
                        </div>
                    </div>
                    <CardContent className="p-8 space-y-6 grow flex flex-col">
                        <div className="space-y-2 text-center sm:text-left">
                            <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
                                {staff.user?.fullname || "Unnamed Staff"}
                            </h1>
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-500">
                                <Mail size={16} />
                                <span className="text-sm font-medium">{staff.user?.email || "No email"}</span>
                            </div>
                        </div>
                        <Separator className="bg-zinc-900" />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500 flex items-center gap-3 font-medium"><Phone size={16} /> Contact</span>
                                <span className="text-zinc-200 font-semibold">{staff.user?.contact_number || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500 flex items-center gap-3 font-medium"><UserPlus size={16} /> Staff ID</span>
                                <span className="text-zinc-300 font-mono bg-zinc-900/50 px-2 py-0.5 rounded">#{staff.id}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500 flex items-center gap-3 font-medium"><Activity size={16} /> Status</span>
                                <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest">{staff.user?.user_status || "offline"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                        <Card className="bg-zinc-950 border-none p-8 rounded-3xl flex flex-col justify-center h-44 shadow-lg">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">Primary Location</p>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="p-3 bg-zinc-900 rounded-2xl text-emerald-500">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-white block">Warehouse</span>
                                    <span className="text-zinc-600 text-sm font-medium">Loc #{staff.warehouse || "01"}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-zinc-950 border-none p-8 rounded-3xl flex flex-col justify-center h-44 shadow-lg">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">Area Access</p>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="p-3 bg-zinc-900 rounded-2xl text-blue-500">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-white block">{staff.sections || 0} Areas</span>
                                    <span className="text-zinc-600 text-sm font-medium">Section Access</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card className="bg-zinc-950 border-none rounded-[2.5rem] pb-0 overflow-hidden flex flex-col shadow-2xl">
                        <CardHeader className="p-8 pb-0">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-white tracking-tight">Access Control</CardTitle>
                                <p className="text-zinc-500 text-sm font-medium">Security roles and platform permissions</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <RoleBadge
                                    label="Warehouse Staff"
                                    active={staff.user.is_warehouse_staff}
                                />
                                <RoleBadge
                                    label="Inventory Manager"
                                    active={staff.user.is_manager}
                                />
                            </div>
                        </CardContent>

                        <div className="mt-auto p-8 bg-zinc-900/20 border-t border-zinc-900">
                            <div className="flex items-center justify-between">
                                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Verified Staff Signature</p>
                                <span className="text-zinc-600 font-mono text-[10px]">AUTH_REF_{staff.user?.slug?.toUpperCase() || "NULL"}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default StaffPage