"use client"

import { Bell, CheckCheck } from "lucide-react"
import { useEffect, useState } from "react"
import ws from "@/lib/socket"
import { api } from "@/lib/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"

const NotificationBell = () => {
    const [notifications, setNotifications] = useState<{ id: number, title: string, message: string, created_at: string, is_read: boolean }[]>([])
    const unreadCount = notifications.filter((n) => !n.is_read).length

    useEffect(() => {
        api.get(`/network/notifications`)
            .then((res) => setNotifications(res.data.reverse()))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setNotifications((prev) => [data, ...prev])
            new Audio("/sound/notification_v2.mp3").play().catch(() => { })
        }
    }, [])

    const markAllRead = () => {
        api.get("/network/notifications?is_read=true")
            .then(() => setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true }))))
            .catch((err) => console.log(err))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative p-3 bg-zinc-900/50 hover:bg-zinc-900 border-none rounded-xl transition-all group outline-none h-auto"
                >
                    <Bell className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-100 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
                <div className="p-5 flex items-center justify-between border-b border-zinc-900 bg-zinc-900/40">
                    <p className="text-[12px] font-black uppercase tracking-widest text-white">Notifications</p>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1.5 transition-colors group/btn"
                        >
                            <CheckCheck className="h-3 w-3 text-emerald-500" />
                            Mark all read
                        </button>
                    )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">No active alerts</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`flex items-start gap-3 px-4 py-4 border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors ${!n.is_read ? "bg-zinc-900/10" : "opacity-60"}`}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[11px] leading-relaxed ${!n.is_read ? "font-bold text-zinc-100" : "text-zinc-500"}`}>
                                        {n.message}
                                    </p>
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter mt-1.5">
                                        {new Date(n.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                    </p>
                                </div>
                                {!n.is_read && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-pulse" />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationBell